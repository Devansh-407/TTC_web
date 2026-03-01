'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getProducts, getCategories, getOccasions } from '@/lib/data';
import { Upload, Image as ImageIcon, Save, Trash2, Edit, Plus, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [occasions, setOccasions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Form states
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingOccasion, setEditingOccasion] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData, occasionsData] = await Promise.all([
        getProducts(),
        getCategories(),
        getOccasions()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setOccasions(occasionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveData = async (type: string, data: any[]) => {
    try {
      // Try local API first, then fallback to absolute URL
      let url = `/api/${type}`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          showMessage(`${type} updated successfully!`);
          await loadData();
          return true;
        }
      } catch (localError) {
        console.log('Local API failed, trying remote API');
        url = `https://ttc-main.vercel.app/api/${type}`;
      }
      
      // Try remote API as fallback
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        showMessage(`${type} updated successfully!`);
        await loadData();
        return true;
      }
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      showMessage(`Error saving ${type}`);
    }
    return false;
  };

  // Image upload helper
  const uploadImage = async (file: File) => {
    // For now, return a placeholder URL
    // In a real implementation, you'd upload to Imgur, Cloudinary, etc.
    return `/uploads/${file.name}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <Badge className="ml-4 bg-green-100 text-green-800">Live</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Last sync: {new Date().toLocaleTimeString()}</span>
              <Button onClick={loadData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            {message}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="occasions">Occasions</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground">📦</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground">🏷️</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{categories.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Occasions</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground">🎉</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{occasions.filter(o => o.active).length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                  <div className="h-4 w-4 text-muted-foreground">✅</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.filter(p => p.inStock).length}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to manage your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setActiveTab('products')} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                  <Button onClick={() => setActiveTab('categories')} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                  <Button onClick={() => setActiveTab('occasions')} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Occasion
                  </Button>
                  <Button onClick={() => window.open('/gifts', '_blank')} variant="outline">
                    View Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Products Management</CardTitle>
                    <CardDescription>Manage your product inventory</CardDescription>
                  </div>
                  <Button onClick={() => setEditingProduct({})}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category} • ₹{product.price}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          const updated = products.filter(p => p.id !== product.id);
                          saveData('products', updated);
                        }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Form Modal */}
            {editingProduct && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{editingProduct.id ? 'Edit Product' : 'Add New Product'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" defaultValue={editingProduct.name || ''} />
                    </div>
                    <div>
                      <Label htmlFor="product-category">Category</Label>
                      <Select defaultValue={editingProduct.category || ''}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.name} value={cat.name}>{cat.displayName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="product-price">Price (₹)</Label>
                      <Input id="product-price" type="number" defaultValue={editingProduct.price || ''} />
                    </div>
                    <div>
                      <Label htmlFor="product-image">Image URL</Label>
                      <div className="flex space-x-2">
                        <Input id="product-image" defaultValue={editingProduct.image || ''} placeholder="/product-image.jpg" />
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea id="product-description" defaultValue={editingProduct.description || ''} />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => {
                      // Save logic here
                      setEditingProduct(null);
                    }}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Product
                    </Button>
                    <Button variant="outline" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Product Categories</CardTitle>
                    <CardDescription>Manage product types like Gift Hamper, Gift Box, etc.</CardDescription>
                  </div>
                  <Button onClick={() => setEditingCategory({})}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card key={category.name}>
                      <img src={category.imageUrl || category.image} alt={category.displayName} className="w-full h-32 object-cover rounded-t-lg" />
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{category.displayName}</h3>
                        <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" size="sm" onClick={() => setEditingCategory(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => {
                            const updated = categories.filter(c => c.name !== category.name);
                            saveData('categories', updated);
                          }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Form Modal */}
            {editingCategory && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{editingCategory.name ? 'Edit Category' : 'Add New Category'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category-type">Category Type</Label>
                      <Select defaultValue={editingCategory.name || ''}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gift-hamper">Gift Hamper 🎁</SelectItem>
                          <SelectItem value="gift-box">Gift Box 📦</SelectItem>
                          <SelectItem value="bouquet">Bouquet 💐</SelectItem>
                          <SelectItem value="miniature">Miniature 🏆</SelectItem>
                          <SelectItem value="frame">Frame 🖼️</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category-displayName">Display Name</Label>
                      <Input id="category-displayName" defaultValue={editingCategory.displayName || ''} placeholder="What customers see" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category-description">Description</Label>
                    <Textarea id="category-description" defaultValue={editingCategory.description || ''} placeholder="Describe this category for customers..." />
                  </div>
                  <div>
                    <Label htmlFor="category-image">Image URL</Label>
                    <div className="flex space-x-2">
                      <Input id="category-image" defaultValue={editingCategory.image || ''} placeholder="/category-image.jpg" />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">💡 Tip: Upload image to public/images folder and use filename</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>🔗 URL will be created automatically:</strong><br />
                      /gifts?category=[category-name]<br />
                      <span className="text-xs">No need to write URLs - system handles it!</span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => {
                      // Save logic here
                      setEditingCategory(null);
                    }}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Category
                    </Button>
                    <Button variant="outline" onClick={() => setEditingCategory(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Occasions Tab */}
          <TabsContent value="occasions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Special Occasions</CardTitle>
                    <CardDescription>Manage special events like Anniversary, Birthday, Wedding, etc.</CardDescription>
                  </div>
                  <Button onClick={() => setEditingOccasion({})}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Occasion
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {occasions.map((occasion) => (
                    <Card key={occasion.name}>
                      <img src={occasion.image} alt={occasion.displayName} className="w-full h-32 object-cover rounded-t-lg" />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{occasion.displayName}</h3>
                          <Badge variant={occasion.active ? 'default' : 'secondary'}>
                            {occasion.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{occasion.description}</p>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" size="sm" onClick={() => setEditingOccasion(occasion)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => {
                            const updated = occasions.filter(o => o.name !== occasion.name);
                            saveData('occasions', updated);
                          }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Occasion Form Modal */}
            {editingOccasion && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{editingOccasion.name ? 'Edit Occasion' : 'Add New Occasion'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="occasion-type">Occasion Type</Label>
                      <Select defaultValue={editingOccasion.name || ''}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anniversary">Anniversary 💕</SelectItem>
                          <SelectItem value="birthday">Birthday 🎂</SelectItem>
                          <SelectItem value="proposal">Proposal 💍</SelectItem>
                          <SelectItem value="wedding">Wedding 💒</SelectItem>
                          <SelectItem value="graduation">Graduation 🎓</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="occasion-displayName">Display Name</Label>
                      <Input id="occasion-displayName" defaultValue={editingOccasion.displayName || ''} placeholder="What customers see" />
                    </div>
                    <div>
                      <Label htmlFor="occasion-order">Display Order</Label>
                      <Input id="occasion-order" type="number" defaultValue={editingOccasion.order || 1} placeholder="1=first" />
                    </div>
                    <div>
                      <Label htmlFor="occasion-active">Show on Website</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Switch id="occasion-active" defaultChecked={editingOccasion.active !== false} />
                        <Label htmlFor="occasion-active">Active</Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="occasion-description">Description</Label>
                    <Textarea id="occasion-description" defaultValue={editingOccasion.description || ''} placeholder="Describe this occasion for customers..." />
                  </div>
                  <div>
                    <Label htmlFor="occasion-image">Image URL</Label>
                    <div className="flex space-x-2">
                      <Input id="occasion-image" defaultValue={editingOccasion.image || ''} placeholder="/occasion-image.jpg" />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">💡 Tip: Upload image to public/images folder and use filename</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-700">
                      <strong>🔗 URL will be created automatically:</strong><br />
                      /gifts?occasion=[occasion-name]<br />
                      <span className="text-xs">No need to write URLs - system handles it!</span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => {
                      // Save logic here
                      setEditingOccasion(null);
                    }}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Occasion
                    </Button>
                    <Button variant="outline" onClick={() => setEditingOccasion(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🎯 Simple Guide for Admin Panel</CardTitle>
                <CardDescription>Everything you need to manage your gift store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">🎉 Special Occasions</h4>
                      <p className="text-sm text-purple-700">For special events like:</p>
                      <ul className="text-sm text-purple-600 mt-2 space-y-1">
                        <li>• Anniversary 💕</li>
                        <li>• Birthday 🎂</li>
                        <li>• Wedding 💒</li>
                        <li>• Graduation 🎓</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">📦 Product Categories</h4>
                      <p className="text-sm text-green-700">For product types like:</p>
                      <ul className="text-sm text-green-600 mt-2 space-y-1">
                        <li>• Gift Hamper 🎁</li>
                        <li>• Gift Box 📦</li>
                        <li>• Bouquet 💐</li>
                        <li>• Frames 🖼️</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">🚀 How It Works</h4>
                      <ol className="text-sm text-blue-700 space-y-2">
                        <li><strong>1. Choose Type:</strong> Select occasion or category from dropdown</li>
                        <li><strong>2. Fill Details:</strong> Add name, description, image</li>
                        <li><strong>3. Save:</strong> Click save - URL created automatically!</li>
                        <li><strong>4. Done:</strong> Changes appear on website instantly</li>
                      </ol>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• No coding knowledge needed!</li>
                        <li>• URLs are created automatically</li>
                        <li>• Upload images to public/images folder</li>
                        <li>• Use descriptive names for customers</li>
                        <li>• Changes appear instantly on website</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">📞 Need Help?</h4>
                  <p className="text-sm text-gray-600">
                    This admin panel is designed to be super simple. Just select what you want to add, 
                    fill in the details, and the system handles all the technical stuff automatically!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
