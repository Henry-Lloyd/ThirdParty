import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Trash2, Star, Edit3, X, Check } from 'lucide-react';

interface Image {
  id: number;
  title: string;
  description?: string;
  filename: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  category: string;
  alt_text?: string;
  is_featured: number;
  sort_order: number;
  status: string;
  created_at: string;
}

interface ImageManagerProps {
  adminToken: string;
}

export function ImageManager({ adminToken }: ImageManagerProps) {
  const [images, setImages] = React.useState<Image[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [editingImage, setEditingImage] = React.useState<Image | null>(null);
  
  // Upload form state
  const [uploadForm, setUploadForm] = React.useState({
    title: '',
    description: '',
    category: 'general',
    altText: '',
    isFeatured: false,
    sortOrder: 0
  });

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/images', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchImages();
  }, [adminToken]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('image-file') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    
    if (!file) {
      alert('Please select an image file');
      return;
    }
    
    if (!uploadForm.title) {
      alert('Please enter a title');
      return;
    }
    
    setUploading(true);
    
    formData.append('image', file);
    formData.append('title', uploadForm.title);
    formData.append('description', uploadForm.description);
    formData.append('category', uploadForm.category);
    formData.append('altText', uploadForm.altText);
    formData.append('isFeatured', uploadForm.isFeatured.toString());
    formData.append('sortOrder', uploadForm.sortOrder.toString());
    
    try {
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        body: formData
      });
      
      if (response.ok) {
        alert('Image uploaded successfully!');
        setUploadForm({
          title: '',
          description: '',
          category: 'general',
          altText: '',
          isFeatured: false,
          sortOrder: 0
        });
        if (fileInput) fileInput.value = '';
        fetchImages();
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const response = await fetch(`/api/admin/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      if (response.ok) {
        alert('Image deleted successfully!');
        fetchImages();
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete image');
    }
  };

  const handleUpdate = async (image: Image) => {
    try {
      const response = await fetch(`/api/admin/images/${image.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: image.title,
          description: image.description,
          category: image.category,
          alt_text: image.alt_text,
          is_featured: image.is_featured,
          sort_order: image.sort_order,
          status: image.status
        })
      });
      
      if (response.ok) {
        alert('Image updated successfully!');
        setEditingImage(null);
        fetchImages();
      } else {
        alert('Failed to update image');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update image');
    }
  };

  if (loading) {
    return <div className="p-6">Loading images...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload New Image</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="image-file">Image File *</Label>
                <Input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter image title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter image description"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={uploadForm.category} onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="logo">Logo</SelectItem>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="altText">Alt Text</Label>
                <Input
                  id="altText"
                  value={uploadForm.altText}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, altText: e.target.value }))}
                  placeholder="Enter alt text for accessibility"
                />
              </div>
              
              <div>
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={uploadForm.sortOrder}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={uploadForm.isFeatured}
                onChange={(e) => setUploadForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
              />
              <Label htmlFor="isFeatured">Featured Image</Label>
            </div>
            
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No images uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={image.file_path}
                      alt={image.alt_text || image.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.svg';
                      }}
                    />
                    {image.is_featured === 1 && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  {editingImage?.id === image.id ? (
                    <div className="p-4 space-y-3">
                      <Input
                        value={editingImage.title}
                        onChange={(e) => setEditingImage(prev => prev ? ({ ...prev, title: e.target.value }) : null)}
                        placeholder="Title"
                      />
                      <Input
                        value={editingImage.description || ''}
                        onChange={(e) => setEditingImage(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                        placeholder="Description"
                      />
                      <Select value={editingImage.category} onValueChange={(value) => setEditingImage(prev => prev ? ({ ...prev, category: value }) : null)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hero">Hero</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="team">Team</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="logo">Logo</SelectItem>
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editingImage.is_featured === 1}
                          onChange={(e) => setEditingImage(prev => prev ? ({ ...prev, is_featured: e.target.checked ? 1 : 0 }) : null)}
                        />
                        <span className="text-sm">Featured</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleUpdate(editingImage)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingImage(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-1">{image.title}</h3>
                      {image.description && (
                        <p className="text-xs text-gray-600 mb-2">{image.description}</p>
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {image.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {image.file_size ? `${Math.round(image.file_size / 1024)}KB` : ''}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingImage(image)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
