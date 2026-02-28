'use client';

import { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import ProductsManager from './components/ProductsManager';
import CategoriesManager from './components/CategoriesManager';
import AboutManager from './components/AboutManager';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [aboutData, setAboutData] = useState({});
  const [loading, setLoading] = useState(true);

  // Load data from mock APIs
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes, aboutRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'), 
        fetch('/api/about')
      ]);
      
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const aboutDataRes = await aboutRes.json();
      
      setProducts(productsData);
      setCategories(categoriesData);
      setAboutData(aboutDataRes);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProducts = async (updatedProducts) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProducts)
      });
      
      if (response.ok) {
        setProducts(updatedProducts);
        return true;
      }
    } catch (error) {
      console.error('Error saving products:', error);
    }
    return false;
  };

  const saveCategories = async (updatedCategories) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategories)
      });
      
      if (response.ok) {
        setCategories(updatedCategories);
        return true;
      }
    } catch (error) {
      console.error('Error saving categories:', error);
    }
    return false;
  };

  const saveAboutData = async (updatedAboutData) => {
    try {
      const response = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAboutData)
      });
      
      if (response.ok) {
        setAboutData(updatedAboutData);
        return true;
      }
    } catch (error) {
      console.error('Error saving about data:', error);
    }
    return false;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading Admin Panel...</div>
      </div>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'products' && (
        <ProductsManager 
          products={products} 
          categories={categories}
          onSave={saveProducts}
          reloadData={loadData}
        />
      )}
      {activeTab === 'categories' && (
        <CategoriesManager 
          categories={categories}
          onSave={saveCategories}
          reloadData={loadData}
        />
      )}
      {activeTab === 'about' && (
        <AboutManager 
          aboutData={aboutData}
          onSave={saveAboutData}
          reloadData={loadData}
        />
      )}
    </AdminLayout>
  );
}
