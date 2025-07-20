import Database from 'better-sqlite3';
import { Kysely, SqliteDialect, sql } from 'kysely';
import path from 'path';
import fs from 'fs';

interface ServiceProvider {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_category: string;
  location: string;
  description?: string;
  experience_years?: number;
  verified: number; // SQLite stores boolean as integer
  created_at: string;
}

interface ServiceRequest {
  id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_type: string;
  location: string;
  description: string;
  urgent: number; // SQLite stores boolean as integer
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
}

interface JobPosting {
  id: number;
  title: string;
  description: string;
  location: string;
  job_type: string;
  positions_available: number;
  deadline?: string;
  requirements?: string;
  payment_type: string; // 'upfront' or 'share'
  upfront_fee?: number;
  share_percentage?: number;
  contact_info?: string;
  status: string; // 'active', 'filled', 'expired'
  created_at: string;
  updated_at: string;
}

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  employment_type: string; // 'full-time', 'part-time', 'contract', 'internship'
  description: string;
  requirements: string;
  responsibilities: string;
  salary_range?: string;
  application_deadline?: string;
  status: string; // 'active', 'closed', 'draft'
  created_at: string;
  updated_at: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: string;
  category: string;
  featured_image?: string;
  status: string; // 'draft', 'published', 'archived'
  published_at?: string;
  created_at: string;
  updated_at: string;
}

interface Image {
  id: number;
  title: string;
  description?: string;
  filename: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  category: string; // 'hero', 'service', 'team', 'blog', 'general', 'logo', 'banner'
  alt_text?: string;
  is_featured: number; // SQLite stores boolean as integer
  sort_order: number;
  status: string; // 'active', 'inactive'
  created_at: string;
  updated_at: string;
}

interface DatabaseSchema {
  service_providers: ServiceProvider;
  service_requests: ServiceRequest;
  contact_messages: ContactMessage;
  job_postings: JobPosting;
  careers: Career;
  blogs: Blog;
  images: Image;
}

const dataDirectory = process.env.DATA_DIRECTORY || './data';

// Ensure data directory exists
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
  console.log('Created data directory:', dataDirectory);
}

// Ensure uploads directory exists
const uploadsDirectory = path.join(dataDirectory, 'uploads');
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory, { recursive: true });
  console.log('Created uploads directory:', uploadsDirectory);
}

const dbPath = path.join(dataDirectory, 'database.sqlite');
console.log('Database path:', dbPath);

const sqliteDb = new Database(dbPath);

// Enable foreign key constraints
sqliteDb.pragma('foreign_keys = ON');

// Enable WAL mode for better concurrency
sqliteDb.pragma('journal_mode = WAL');

// Test database connection
try {
  const result = sqliteDb.prepare('SELECT 1 as test').get();
  console.log('Database connection test successful:', result);
} catch (error) {
  console.error('Database connection test failed:', error);
}

export const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({
    database: sqliteDb,
  }),
  log: ['query', 'error']
});

// Test Kysely connection
async function testKyselyConnection() {
  try {
    const result = await sql`SELECT type, name FROM sqlite_master WHERE type = 'table'`.execute(db);
    console.log('Kysely connection test successful. Tables found:', result.rows);
  } catch (error) {
    console.error('Kysely connection test failed:', error);
  }
}

testKyselyConnection();

export { uploadsDirectory };
export type { ServiceProvider, ServiceRequest, ContactMessage, JobPosting, Career, Blog, Image, DatabaseSchema };
