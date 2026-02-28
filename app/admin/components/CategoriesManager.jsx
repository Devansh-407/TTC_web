'use client';

import { useState } from 'react';

export default function CategoriesManager({ categories, onSave, reloadData }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const initializeFormData = (category = null) => {
    setFormData({
      name: category?.name || '',
      description: category?.description || '',
      image: category?.image || '',
      href: category?.href || ''
    });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsAdding(false);
    initializeFormData(category);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setIsAdding(true);
    initializeFormData();
  };

  const handleDelete = async (categoryName) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = categories.filter(c => c.name !== categoryName);
      if (await onSave(updatedCategories)) {
        setMessage('Category deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
        await reloadData();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let updatedCategories;
    if (isAdding) {
      updatedCategories = [...categories, formData];
    } else {
      updatedCategories = categories.map(c => 
        c.name === editingCategory.name ? formData : c
      );
    }

    if (await onSave(updatedCategories)) {
      setMessage(isAdding ? 'Category added successfully!' : 'Category updated successfully!');
      setEditingCategory(null);
      setIsAdding(false);
      setFormData({});
      setTimeout(() => setMessage(''), 3000);
      await reloadData();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Categories Management</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Category
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          {message}
        </div>
      )}

      {/* Form */}
      {(isAdding || editingCategory) && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">
            {isAdding ? 'Add New Category' : 'Edit Category'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Href URL
              </label>
              <input
                type="text"
                name="href"
                value={formData.href}
                onChange={handleInputChange}
                placeholder="/gifts?category=anniversary"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/category-image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {isAdding ? 'Add Category' : 'Update Category'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingCategory(null);
                  setIsAdding(false);
                  setFormData({});
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {category.description}
              </p>
              <div className="text-xs text-gray-500 mb-3">
                {category.href}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.name)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
