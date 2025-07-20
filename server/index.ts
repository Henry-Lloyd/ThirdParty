import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { setupStaticServing } from './static-serve.js';
import { db, uploadsDirectory } from './database.js';
import { sql } from 'kysely';

dotenv.config();

const app = express();

// Security headers for production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
}

// Body parsing middleware with increased limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads
app.use('/uploads', express.static(uploadsDirectory));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,image/webp').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed!'));
    }
  }
});

// Helper function to convert BigInt to number for JSON serialization
const convertBigIntToNumber = (value: any): any => {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  if (Array.isArray(value)) {
    return value.map(convertBigIntToNumber);
  }
  if (value && typeof value === 'object') {
    const converted: any = {};
    for (const [key, val] of Object.entries(value)) {
      converted[key] = convertBigIntToNumber(val);
    }
    return converted;
  }
  return value;
};

// CORS middleware for development and production
app.use((req, res, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Request logging middleware (production-safe)
app.use((req, res, next) => {
  if (process.env.LOG_LEVEL !== 'silent') {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    if (process.env.NODE_ENV === 'development' && req.body && Object.keys(req.body).length > 0) {
      console.log('Request body:', JSON.stringify(req.body, null, 2));
    }
  }
  next();
});

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Admin auth failed: No token provided');
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.substring(7);
  if (token !== 'admin-authenticated') {
    console.log('Admin auth failed: Invalid token');
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  next();
};

// Database health check function
async function checkDatabaseHealth() {
  try {
    const tables = await sql`SELECT type, name FROM sqlite_master WHERE type = 'table'`.execute(db);
    
    const tableNames = tables.rows.map((t: any) => t.name);
    const requiredTables = ['service_requests', 'service_providers', 'contact_messages', 'job_postings', 'careers', 'blogs', 'images'];
    
    const missingTables = requiredTables.filter(table => !tableNames.includes(table));
    
    if (missingTables.length > 0) {
      throw new Error(`Missing required tables: ${missingTables.join(', ')}`);
    }
    
    // Test each table accessibility
    for (const table of requiredTables) {
      await (db.selectFrom as any)(table).select('id').limit(1).execute();
    }
    
    return { healthy: true, tables: tableNames };
  } catch (error) {
    return { healthy: false, error: error.message };
  }
}

// Enhanced health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const startTime = Date.now();
    console.log('=== HEALTH CHECK START ===');
    
    const dbHealth = await checkDatabaseHealth();
    
    if (!dbHealth.healthy) {
      console.error('Database health check failed:', dbHealth.error);
      res.status(500).json({ 
        status: 'unhealthy', 
        error: 'Database not healthy',
        details: dbHealth.error,
        timestamp: new Date().toISOString()
      });
      return;
    }
    
    // Count records in each table using sql template
    const requestsCount = await sql`SELECT COUNT(id) as count FROM service_requests`.execute(db);
    const providersCount = await sql`SELECT COUNT(id) as count FROM service_providers`.execute(db);
    const messagesCount = await sql`SELECT COUNT(id) as count FROM contact_messages`.execute(db);
    const jobsCount = await sql`SELECT COUNT(id) as count FROM job_postings`.execute(db);
    const careersCount = await sql`SELECT COUNT(id) as count FROM careers`.execute(db);
    const blogsCount = await sql`SELECT COUNT(id) as count FROM blogs`.execute(db);
    const imagesCount = await sql`SELECT COUNT(id) as count FROM images`.execute(db);
    
    const responseTime = Date.now() - startTime;
    console.log(`Health check successful (${responseTime}ms)`);
    
    const response = {
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      responseTime: `${responseTime}ms`,
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      tables: dbHealth.tables,
      serviceRequestsCount: convertBigIntToNumber(requestsCount.rows[0]?.count) || 0,
      serviceProvidersCount: convertBigIntToNumber(providersCount.rows[0]?.count) || 0,
      contactMessagesCount: convertBigIntToNumber(messagesCount.rows[0]?.count) || 0,
      jobPostingsCount: convertBigIntToNumber(jobsCount.rows[0]?.count) || 0,
      careersCount: convertBigIntToNumber(careersCount.rows[0]?.count) || 0,
      blogsCount: convertBigIntToNumber(blogsCount.rows[0]?.count) || 0,
      imagesCount: convertBigIntToNumber(imagesCount.rows[0]?.count) || 0
    };
    
    res.json(response);
  } catch (error) {
    console.error('=== HEALTH CHECK FAILED ===');
    console.error('Health check error:', error);
    res.status(500).json({ 
      status: 'unhealthy', 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Image endpoints
app.get('/api/images', async (req, res) => {
  try {
    console.log('=== FETCHING IMAGES ===');
    const { category, featured } = req.query;
    
    let query = db.selectFrom('images').selectAll().where('status', '=', 'active');
    
    if (category) {
      query = query.where('category', '=', category as string);
    }
    
    if (featured === 'true') {
      query = query.where('is_featured', '=', 1);
    }
    
    const images = await query.orderBy('sort_order', 'asc').orderBy('created_at', 'desc').execute();
    
    console.log(`Found ${images.length} images`);
    res.json(convertBigIntToNumber(images));
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ 
      error: 'Failed to fetch images',
      details: error.message 
    });
  }
});

// Admin image upload endpoint
app.post('/api/admin/images', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    console.log('=== ADMIN IMAGE UPLOAD ===');
    
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }
    
    const { title, description, category = 'general', altText, isFeatured = false, sortOrder = 0 } = req.body;
    
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    
    const filePath = `/uploads/${req.file.filename}`;
    
    const result = await db
      .insertInto('images')
      .values({
        title: title.trim(),
        description: description ? description.trim() : null,
        filename: req.file.filename,
        file_path: filePath,
        file_size: req.file.size,
        mime_type: req.file.mimetype,
        category: category,
        alt_text: altText ? altText.trim() : null,
        is_featured: isFeatured === 'true' || isFeatured === true ? 1 : 0,
        sort_order: parseInt(sortOrder) || 0,
        status: 'active'
      })
      .execute();
    
    console.log('Image uploaded successfully:', result);
    res.status(201).json({ 
      message: 'Image uploaded successfully',
      id: convertBigIntToNumber(result[0].insertId),
      filePath: filePath
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message 
    });
  }
});

// Admin get all images
app.get('/api/admin/images', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN FETCHING ALL IMAGES ===');
    
    const images = await db
      .selectFrom('images')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();
    
    console.log(`Admin: Found ${images.length} total images`);
    res.json(convertBigIntToNumber(images));
  } catch (error) {
    console.error('Error fetching admin images:', error);
    res.status(500).json({ 
      error: 'Failed to fetch images',
      details: error.message 
    });
  }
});

// Admin update image
app.put('/api/admin/images/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN UPDATING IMAGE ===');
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Image ID:', id);
    console.log('Update data:', updateData);
    
    // Convert boolean fields
    if (updateData.is_featured !== undefined) {
      updateData.is_featured = updateData.is_featured === 'true' || updateData.is_featured === true ? 1 : 0;
    }
    
    if (updateData.sort_order !== undefined) {
      updateData.sort_order = parseInt(updateData.sort_order) || 0;
    }
    
    const result = await db
      .updateTable('images')
      .set({
        ...updateData,
        updated_at: sql`CURRENT_TIMESTAMP`
      })
      .where('id', '=', parseInt(id))
      .execute();
    
    if (convertBigIntToNumber(result[0].numUpdatedRows) === 0) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }
    
    console.log('Image updated successfully');
    res.json({ message: 'Image updated successfully' });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ 
      error: 'Failed to update image',
      details: error.message 
    });
  }
});

// Admin delete image
app.delete('/api/admin/images/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN DELETING IMAGE ===');
    const { id } = req.params;
    
    // Get image info first to delete file
    const image = await db
      .selectFrom('images')
      .selectAll()
      .where('id', '=', parseInt(id))
      .execute();
    
    if (image.length === 0) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }
    
    // Delete from database
    const result = await db
      .deleteFrom('images')
      .where('id', '=', parseInt(id))
      .execute();
    
    // Delete file from disk
    const filePath = path.join(uploadsDirectory, image[0].filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('Deleted file:', filePath);
    }
    
    console.log('Image deleted successfully');
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ 
      error: 'Failed to delete image',
      details: error.message 
    });
  }
});

// Careers endpoints
app.get('/api/careers', async (req, res) => {
  try {
    console.log('=== FETCHING ACTIVE CAREERS ===');
    
    const careers = await db
      .selectFrom('careers')
      .selectAll()
      .where('status', '=', 'active')
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Found ${careers.length} active careers`);
    res.json(convertBigIntToNumber(careers));
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ 
      error: 'Failed to fetch careers',
      details: error.message 
    });
  }
});

// Blogs endpoints
app.get('/api/blogs', async (req, res) => {
  try {
    console.log('=== FETCHING PUBLISHED BLOGS ===');
    
    const blogs = await db
      .selectFrom('blogs')
      .selectAll()
      .where('status', '=', 'published')
      .orderBy('published_at', 'desc')
      .execute();

    console.log(`Found ${blogs.length} published blogs`);
    res.json(convertBigIntToNumber(blogs));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blogs',
      details: error.message 
    });
  }
});

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    console.log('=== FETCHING BLOG BY SLUG ===');
    const { slug } = req.params;
    
    const blog = await db
      .selectFrom('blogs')
      .selectAll()
      .where('slug', '=', slug)
      .where('status', '=', 'published')
      .execute();

    if (blog.length === 0) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    console.log(`Found blog: ${blog[0].title}`);
    res.json(convertBigIntToNumber(blog[0]));
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blog',
      details: error.message 
    });
  }
});

// Job postings endpoints
app.get('/api/jobs', async (req, res) => {
  try {
    console.log('=== FETCHING ACTIVE JOBS ===');
    
    const jobs = await db
      .selectFrom('job_postings')
      .selectAll()
      .where('status', '=', 'active')
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Found ${jobs.length} active jobs`);
    res.json(convertBigIntToNumber(jobs));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch jobs',
      details: error.message 
    });
  }
});

// Admin careers management endpoints
app.get('/api/admin/careers', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN FETCHING ALL CAREERS ===');
    
    const careers = await db
      .selectFrom('careers')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Admin: Found ${careers.length} total careers`);
    res.json(convertBigIntToNumber(careers));
  } catch (error) {
    console.error('Error fetching admin careers:', error);
    res.status(500).json({ 
      error: 'Failed to fetch careers',
      details: error.message 
    });
  }
});

app.post('/api/admin/careers', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN CREATING NEW CAREER ===');
    console.log('Career data:', req.body);

    const { 
      title, 
      department, 
      location, 
      employmentType, 
      description, 
      requirements, 
      responsibilities, 
      salaryRange, 
      applicationDeadline 
    } = req.body;

    if (!title || !department || !location || !employmentType || !description || !requirements || !responsibilities) {
      res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'department', 'location', 'employmentType', 'description', 'requirements', 'responsibilities']
      });
      return;
    }

    const result = await db
      .insertInto('careers')
      .values({
        title: title.trim(),
        department: department.trim(),
        location: location.trim(),
        employment_type: employmentType,
        description: description.trim(),
        requirements: requirements.trim(),
        responsibilities: responsibilities.trim(),
        salary_range: salaryRange ? salaryRange.trim() : null,
        application_deadline: applicationDeadline ? applicationDeadline.trim() : null,
        status: 'active'
      })
      .execute();

    console.log('Career created successfully:', result);
    res.status(201).json({ 
      message: 'Career created successfully', 
      id: convertBigIntToNumber(result[0].insertId)
    });
  } catch (error) {
    console.error('Error creating career:', error);
    res.status(500).json({ 
      error: 'Failed to create career',
      details: error.message 
    });
  }
});

app.put('/api/admin/careers/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN UPDATING CAREER ===');
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Career ID:', id);
    console.log('Update data:', updateData);

    const result = await db
      .updateTable('careers')
      .set({
        ...updateData,
        updated_at: sql`CURRENT_TIMESTAMP`
      })
      .where('id', '=', parseInt(id))
      .execute();

    if (convertBigIntToNumber(result[0].numUpdatedRows) === 0) {
      res.status(404).json({ error: 'Career not found' });
      return;
    }

    console.log('Career updated successfully');
    res.json({ message: 'Career updated successfully' });
  } catch (error) {
    console.error('Error updating career:', error);
    res.status(500).json({ 
      error: 'Failed to update career',
      details: error.message 
    });
  }
});

app.delete('/api/admin/careers/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN DELETING CAREER ===');
    const { id } = req.params;
    
    console.log('Career ID to delete:', id);

    const result = await db
      .deleteFrom('careers')
      .where('id', '=', parseInt(id))
      .execute();

    if (convertBigIntToNumber(result[0].numDeletedRows) === 0) {
      res.status(404).json({ error: 'Career not found' });
      return;
    }

    console.log('Career deleted successfully');
    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    console.error('Error deleting career:', error);
    res.status(500).json({ 
      error: 'Failed to delete career',
      details: error.message 
    });
  }
});

// Admin blogs management endpoints
app.get('/api/admin/blogs', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN FETCHING ALL BLOGS ===');
    
    const blogs = await db
      .selectFrom('blogs')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Admin: Found ${blogs.length} total blogs`);
    res.json(convertBigIntToNumber(blogs));
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blogs',
      details: error.message 
    });
  }
});

app.post('/api/admin/blogs', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN CREATING NEW BLOG ===');
    console.log('Blog data:', req.body);

    const { 
      title, 
      slug, 
      excerpt, 
      content, 
      author, 
      category, 
      featuredImage, 
      status 
    } = req.body;

    if (!title || !slug || !content || !author || !category) {
      res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'slug', 'content', 'author', 'category']
      });
      return;
    }

    const result = await db
      .insertInto('blogs')
      .values({
        title: title.trim(),
        slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        excerpt: excerpt ? excerpt.trim() : null,
        content: content.trim(),
        author: author.trim(),
        category: category.trim(),
        featured_image: featuredImage ? featuredImage.trim() : null,
        status: status || 'draft',
        published_at: status === 'published' ? sql`CURRENT_TIMESTAMP` : null
      })
      .execute();

    console.log('Blog created successfully:', result);
    res.status(201).json({ 
      message: 'Blog created successfully', 
      id: convertBigIntToNumber(result[0].insertId)
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ 
      error: 'Failed to create blog',
      details: error.message 
    });
  }
});

app.put('/api/admin/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN UPDATING BLOG ===');
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Blog ID:', id);
    console.log('Update data:', updateData);

    // If status is being changed to published, set published_at
    if (updateData.status === 'published') {
      updateData.published_at = sql`CURRENT_TIMESTAMP`;
    }

    const result = await db
      .updateTable('blogs')
      .set({
        ...updateData,
        updated_at: sql`CURRENT_TIMESTAMP`
      })
      .where('id', '=', parseInt(id))
      .execute();

    if (convertBigIntToNumber(result[0].numUpdatedRows) === 0) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    console.log('Blog updated successfully');
    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ 
      error: 'Failed to update blog',
      details: error.message 
    });
  }
});

app.delete('/api/admin/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN DELETING BLOG ===');
    const { id } = req.params;
    
    console.log('Blog ID to delete:', id);

    const result = await db
      .deleteFrom('blogs')
      .where('id', '=', parseInt(id))
      .execute();

    if (convertBigIntToNumber(result[0].numDeletedRows) === 0) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    console.log('Blog deleted successfully');
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ 
      error: 'Failed to delete blog',
      details: error.message 
    });
  }
});

// Admin job management endpoints
app.get('/api/admin/jobs', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN FETCHING ALL JOBS ===');
    
    const jobs = await db
      .selectFrom('job_postings')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Admin: Found ${jobs.length} total jobs`);
    res.json(convertBigIntToNumber(jobs));
  } catch (error) {
    console.error('Error fetching admin jobs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch jobs',
      details: error.message 
    });
  }
});

app.post('/api/admin/jobs', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN CREATING NEW JOB ===');
    console.log('Job data:', req.body);

    const { 
      title, 
      description, 
      location, 
      jobType, 
      positionsAvailable, 
      deadline, 
      requirements, 
      paymentType, 
      upfrontFee, 
      sharePercentage, 
      contactInfo 
    } = req.body;

    if (!title || !description || !location || !jobType || !paymentType) {
      res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'description', 'location', 'jobType', 'paymentType']
      });
      return;
    }

    const result = await db
      .insertInto('job_postings')
      .values({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        job_type: jobType,
        positions_available: parseInt(positionsAvailable) || 1,
        deadline: deadline || null,
        requirements: requirements ? requirements.trim() : null,
        payment_type: paymentType,
        upfront_fee: paymentType === 'upfront' ? parseFloat(upfrontFee) || 0 : null,
        share_percentage: paymentType === 'share' ? parseFloat(sharePercentage) || 0 : null,
        contact_info: contactInfo ? contactInfo.trim() : null,
        status: 'active'
      })
      .execute();

    console.log('Job created successfully:', result);
    res.status(201).json({ 
      message: 'Job created successfully', 
      id: convertBigIntToNumber(result[0].insertId)
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ 
      error: 'Failed to create job',
      details: error.message 
    });
  }
});

app.put('/api/admin/jobs/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN UPDATING JOB ===');
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Job ID:', id);
    console.log('Update data:', updateData);

    const result = await db
      .updateTable('job_postings')
      .set({
        ...updateData,
        updated_at: sql`CURRENT_TIMESTAMP`
      })
      .where('id', '=', parseInt(id))
      .execute();

    if (convertBigIntToNumber(result[0].numUpdatedRows) === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    console.log('Job updated successfully');
    res.json({ message: 'Job updated successfully' });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ 
      error: 'Failed to update job',
      details: error.message 
    });
  }
});

app.delete('/api/admin/jobs/:id', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN DELETING JOB ===');
    const { id } = req.params;
    
    console.log('Job ID to delete:', id);

    const result = await db
      .deleteFrom('job_postings')
      .where('id', '=', parseInt(id))
      .execute();

    if (convertBigIntToNumber(result[0].numDeletedRows) === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    console.log('Job deleted successfully');
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ 
      error: 'Failed to delete job',
      details: error.message 
    });
  }
});

// Search endpoint with improved functionality
app.get('/api/search', async (req, res) => {
  try {
    console.log('=== SEARCH REQUEST START ===');
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      console.log('Search failed: No query provided');
      res.status(400).json({ error: 'Search query is required' });
      return;
    }

    const searchTerm = q.trim().toLowerCase();
    console.log('Search term:', searchTerm);

    // Get total provider count first
    const totalProviders = await sql`SELECT COUNT(id) as count FROM service_providers`.execute(db);
    
    console.log('Total providers in database:', totalProviders.rows[0]?.count || 0);

    // Search service providers using SQL template for case-insensitive search
    const searchPattern = `%${searchTerm}%`;
    
    const providers = await sql`
      SELECT * FROM service_providers 
      WHERE (
        lower(name) LIKE ${searchPattern} OR
        lower(service_category) LIKE ${searchPattern} OR
        lower(location) LIKE ${searchPattern} OR
        lower(description) LIKE ${searchPattern}
      )
      AND verified = 1
      ORDER BY created_at DESC
    `.execute(db);

    console.log(`Found ${providers.rows.length} providers for search term: ${searchTerm}`);
    
    if (providers.rows.length > 0) {
      console.log('Sample results:', providers.rows.slice(0, 2).map((p: any) => ({ name: p.name, category: p.service_category, location: p.location })));
    }
    
    console.log('=== SEARCH REQUEST COMPLETE ===');

    res.json({
      query: q,
      providers: convertBigIntToNumber(providers.rows),
      count: providers.rows.length,
      totalProviders: convertBigIntToNumber(totalProviders.rows[0]?.count) || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('=== SEARCH REQUEST ERROR ===');
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Failed to perform search',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    console.log('=== ADMIN LOGIN ATTEMPT ===');
    console.log('Admin login attempt:', { email: req.body.email });

    const { email, password } = req.body;

    // Check credentials (use environment variables in production)
    const adminEmail = process.env.ADMIN_EMAIL || 'henrylloyd190@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Ae123456@1';

    if (email === adminEmail && password === adminPassword) {
      const token = 'admin-authenticated';
      console.log('Admin login successful for:', email);
      res.json({ token, message: 'Login successful' });
    } else {
      console.log('Admin login failed: Invalid credentials for:', email);
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Service Provider Registration with enhanced error handling
app.post('/api/register-provider', async (req, res) => {
  try {
    console.log('=== PROVIDER REGISTRATION START ===');
    console.log('Received provider registration:', req.body);

    const { name, email, phone, serviceCategory, location, description, experienceYears } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !serviceCategory || !location) {
      console.log('Missing required fields:', { name: !!name, email: !!email, phone: !!phone, serviceCategory: !!serviceCategory, location: !!location });
      res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, phone, service category, and location are required'
      });
      return;
    }

    // Check if email already exists
    const existingProvider = await db
      .selectFrom('service_providers')
      .select('id')
      .where('email', '=', email)
      .execute();

    if (existingProvider.length > 0) {
      console.log('Email already registered:', email);
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    const result = await db
      .insertInto('service_providers')
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        service_category: serviceCategory,
        location: location,
        description: description ? description.trim() : null,
        experience_years: experienceYears ? parseInt(experienceYears) : null,
        verified: 0  // Use integer for SQLite boolean
      })
      .execute();

    console.log('Provider registered successfully:', result);
    
    // Verify the registration by fetching the created record
    const createdProvider = await db
      .selectFrom('service_providers')
      .selectAll()
      .where('id', '=', Number(result[0].insertId))
      .execute();
    
    console.log('Created provider verification:', createdProvider[0]);
    console.log('=== PROVIDER REGISTRATION SUCCESS ===');
    
    res.status(201).json({ 
      message: 'Registration successful', 
      id: convertBigIntToNumber(result[0].insertId),
      provider: convertBigIntToNumber(createdProvider[0])
    });
  } catch (error) {
    console.error('=== PROVIDER REGISTRATION ERROR ===');
    console.error('Error registering provider:', error);
    console.error('Error stack:', error.stack);
    
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }
    res.status(500).json({ 
      error: 'Failed to register provider',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// FIXED Service Request Submission endpoint - now returns proper success response
app.post('/api/service-request', async (req, res) => {
  console.log('=== SERVICE REQUEST SUBMISSION START ===');
  console.log('Raw request body:', req.body);

  try {
    // Extract form data
    const { clientName, clientEmail, clientPhone, serviceType, location, description, urgent } = req.body;

    console.log('Extracted form data:', {
      clientName, clientEmail, clientPhone, serviceType, location, description, urgent
    });

    // Basic validation
    if (!clientName || !clientEmail || !clientPhone || !serviceType || !location || !description) {
      const missingFields = [];
      if (!clientName) missingFields.push('clientName');
      if (!clientEmail) missingFields.push('clientEmail');
      if (!clientPhone) missingFields.push('clientPhone');
      if (!serviceType) missingFields.push('serviceType');
      if (!location) missingFields.push('location');
      if (!description) missingFields.push('description');
      
      console.log('Validation failed - missing fields:', missingFields);
      res.status(400).json({ 
        error: 'Missing required fields',
        missingFields: missingFields
      });
      return;
    }

    // Prepare data for database insertion
    const insertData = {
      client_name: String(clientName).trim(),
      client_email: String(clientEmail).trim().toLowerCase(),
      client_phone: String(clientPhone).trim(),
      service_type: String(serviceType).trim(),
      location: String(location).trim(),
      description: String(description).trim(),
      urgent: urgent === true || urgent === 'true' || urgent === 1 ? 1 : 0,
      status: 'pending'
    };

    console.log('Prepared insert data:', insertData);

    // Insert into database
    const result = await db
      .insertInto('service_requests')
      .values(insertData)
      .execute();

    console.log('Database insert result:', result);
    
    const insertId = convertBigIntToNumber(result[0]?.insertId);
    if (!insertId) {
      console.error('No insert ID returned');
      res.status(500).json({ 
        error: 'Database insert failed - no ID returned'
      });
      return;
    }

    console.log('✅ SERVICE REQUEST SUBMITTED SUCCESSFULLY - ID:', insertId);
    console.log('=== SERVICE REQUEST SUBMISSION SUCCESS ===');

    // Return success response
    res.status(201).json({ 
      success: true,
      message: 'Service request submitted successfully', 
      id: insertId,
      status: 'pending',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('=== SERVICE REQUEST SUBMISSION ERROR ===');
    console.error('Error details:', error);
    
    res.status(500).json({ 
      error: 'Failed to submit service request',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    console.log('=== CONTACT FORM SUBMISSION START ===');
    console.log('Received contact message:', req.body);

    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      console.log('Contact form validation failed - missing required fields:', {
        name: !!name,
        email: !!email,
        message: !!message
      });
      res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
      return;
    }

    const result = await db
      .insertInto('contact_messages')
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject ? subject.trim() : null,
        message: message.trim()
      })
      .execute();

    console.log('Contact message saved successfully:', result);
    console.log('=== CONTACT FORM SUBMISSION SUCCESS ===');
    
    res.status(201).json({ 
      success: true,
      message: 'Message sent successfully', 
      id: convertBigIntToNumber(result[0].insertId)
    });
  } catch (error) {
    console.error('=== CONTACT FORM SUBMISSION ERROR ===');
    console.error('Error saving contact message:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      details: error.message 
    });
  }
});

// Get Service Providers by Category
app.get('/api/providers/:category', async (req, res) => {
  try {
    const { category } = req.params;
    console.log('Fetching providers for category:', category);

    const providers = await db
      .selectFrom('service_providers')
      .selectAll()
      .where('service_category', '=', category)
      .where('verified', '=', 1)
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Found ${providers.length} providers for category ${category}`);
    res.json(convertBigIntToNumber(providers));
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Failed to fetch providers: ' + error.message });
  }
});

// Get All Service Providers
app.get('/api/providers', async (req, res) => {
  try {
    console.log('Fetching all providers');

    const providers = await db
      .selectFrom('service_providers')
      .selectAll()
      .where('verified', '=', 1)
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Found ${providers.length} total providers`);
    res.json(convertBigIntToNumber(providers));
  } catch (error) {
    console.error('Error fetching all providers:', error);
    res.status(500).json({ error: 'Failed to fetch providers: ' + error.message });
  }
});

// Protected Admin API endpoints
app.get('/api/admin/providers', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN FETCHING PROVIDERS ===');

    const providers = await db
      .selectFrom('service_providers')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Admin: Found ${providers.length} total providers`);
    res.json(convertBigIntToNumber(providers));
  } catch (error) {
    console.error('Error fetching admin providers:', error);
    res.status(500).json({ error: 'Failed to fetch providers: ' + error.message });
  }
});

app.get('/api/admin/requests', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN FETCHING SERVICE REQUESTS ===');

    const requests = await db
      .selectFrom('service_requests')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Admin: Found ${requests.length} total service requests`);
    res.json(convertBigIntToNumber(requests));
  } catch (error) {
    console.error('Error fetching admin requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests: ' + error.message });
  }
});

// MISSING ENDPOINT: Admin messages
app.get('/api/admin/messages', authenticateAdmin, async (req, res) => {
  try {
    console.log('=== ADMIN FETCHING CONTACT MESSAGES ===');

    const messages = await db
      .selectFrom('contact_messages')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Admin: Found ${messages.length} total contact messages`);
    res.json(convertBigIntToNumber(messages));
  } catch (error) {
    console.error('Error fetching admin messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages: ' + error.message });
  }
});

// Setup static file serving - this must be LAST
if (process.env.NODE_ENV === 'production') {
  setupStaticServing(app);
}

const port = process.env.PORT || 3001;

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Data directory: ${process.env.DATA_DIRECTORY || './data'}`);
  console.log(`📁 Uploads directory: ${uploadsDirectory}`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Application available at http://localhost:${port}`);
    console.log(`🏥 Health check: http://localhost:${port}/api/health`);
  } else {
    console.log(`🌐 API server running at http://localhost:${port}`);
    console.log(`🔥 Frontend dev server should be running on http://localhost:3000`);
  }
});
