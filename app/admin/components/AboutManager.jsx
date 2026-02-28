'use client';

import { useState } from 'react';

export default function AboutManager({ aboutData, onSave, reloadData }) {
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const initializeFormData = (sectionKey = null, data = null) => {
    if (sectionKey === 'hero') {
      setFormData({
        title: data?.title || '',
        subtitle: data?.subtitle || '',
        backgroundImage: data?.backgroundImage || ''
      });
    } else if (sectionKey === 'story') {
      setFormData({
        title: data?.title || '',
        content: data?.content || '',
        image: data?.image || ''
      });
    } else if (sectionKey === 'stats') {
      setFormData({
        items: data?.items || [
          { label: 'Happy Customers', value: '10,000+' },
          { label: 'Unique Gifts', value: '500+' },
          { label: 'Years of Service', value: '5+' },
          { label: 'Custom Designs', value: '1000+' }
        ]
      });
    } else if (sectionKey === 'team') {
      setFormData({
        title: data?.title || '',
        members: data?.members || []
      });
    } else if (sectionKey === 'values') {
      setFormData({
        title: data?.title || '',
        items: data?.items || []
      });
    } else if (sectionKey === 'cta') {
      setFormData({
        title: data?.title || '',
        subtitle: data?.subtitle || '',
        buttonText: data?.buttonText || '',
        buttonLink: data?.buttonLink || ''
      });
    }
  };

  const handleEdit = (sectionKey) => {
    setEditingSection(sectionKey);
    initializeFormData(sectionKey, aboutData[sectionKey]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedAboutData = {
      ...aboutData,
      [editingSection]: formData
    };

    if (await onSave(updatedAboutData)) {
      setMessage(`${editingSection.charAt(0).toUpperCase() + editingSection.slice(1)} section updated successfully!`);
      setEditingSection(null);
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

  const handleNestedChange = (parentKey, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parentKey]: prev[parentKey].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addNestedItem = (parentKey) => {
    const newItem = parentKey === 'stats' 
      ? { label: '', value: '' }
      : parentKey === 'team'
      ? { name: '', role: '', image: '', bio: '' }
      : parentKey === 'values'
      ? { title: '', description: '', icon: '' }
      : {};

    setFormData(prev => ({
      ...prev,
      [parentKey]: [...(prev[parentKey] || []), newItem]
    }));
  };

  const removeNestedItem = (parentKey, index) => {
    setFormData(prev => ({
      ...prev,
      [parentKey]: prev[parentKey].filter((_, i) => i !== index)
    }));
  };

  const renderForm = () => {
    switch (editingSection) {
      case 'hero':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
              <input
                type="text"
                name="backgroundImage"
                value={formData.backgroundImage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );

      case 'story':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );

      case 'stats':
        return (
          <div>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => addNestedItem('items')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Add Stat Item
              </button>
            </div>
            {formData.items?.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Stat Item {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeNestedItem('items', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleNestedChange('items', index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleNestedChange('items', index, 'value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'cta':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
              <input
                type="text"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );

      default:
        return <div>Section not implemented yet</div>;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">About Page Management</h2>
        <p className="text-gray-600 mt-1">Manage content sections for the About page</p>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          {message}
        </div>
      )}

      {/* Edit Form */}
      {editingSection && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">
            Edit {editingSection.charAt(0).toUpperCase() + editingSection.slice(1)} Section
          </h3>
          <form onSubmit={handleSubmit}>
            {renderForm()}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Update Section
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingSection(null);
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

      {/* Sections List */}
      <div className="space-y-6">
        {Object.entries(aboutData).map(([key, section]) => (
          <div key={key} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <button
                onClick={() => handleEdit(key)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            </div>
            
            {/* Preview */}
            <div className="text-sm text-gray-600">
              {key === 'hero' && (
                <div>
                  <p><strong>Title:</strong> {section.title}</p>
                  <p><strong>Subtitle:</strong> {section.subtitle?.substring(0, 100)}...</p>
                </div>
              )}
              {key === 'story' && (
                <div>
                  <p><strong>Title:</strong> {section.title}</p>
                  <p><strong>Content:</strong> {section.content?.substring(0, 100)}...</p>
                </div>
              )}
              {key === 'stats' && (
                <div>
                  <p><strong>Items:</strong> {section.items?.length || 0} stat items</p>
                </div>
              )}
              {key === 'cta' && (
                <div>
                  <p><strong>Title:</strong> {section.title}</p>
                  <p><strong>Button:</strong> {section.buttonText}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
