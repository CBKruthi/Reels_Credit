import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosCloudUpload } from 'react-icons/io';
import { FiX } from 'react-icons/fi';

const ReelUpload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    video: null,
    caption: '',
    products: [],
    selectedProduct: ''
  });
  const [preview, setPreview] = useState(null);

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, video: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
const handleSubmit = (e) => {
    e.preventDefault();
    // API call to upload reel
    console.log('Uploading reel:', formData);
    alert('Reel uploaded successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center space-x-3">
          <IoIosArrowBack
            size={26}
            onClick={() => navigate(-1)}
            className="cursor-pointer text-gray-700"
          />
          <h1 className="text-xl font-bold text-gray-800">Upload Reel</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Video
            </label>
             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-400 transition-colors">
              {preview ? (
                <div className="relative">
                  <video
                    src={preview}
                    className="max-h-64 mx-auto rounded-lg"
                    controls
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setFormData({ ...formData, video: null });
                    }}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                ) : (
                <>
                  <IoIosCloudUpload size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">MP4, MOV (Max 100MB)</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoSelect}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="inline-block mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 cursor-pointer"
                  >
                    Choose Video
                  </label>
                </>
              )}
            </div>
          </div>
           {/* Caption */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Caption
            </label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Write a caption for your reel..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Product Links */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Link Products (Optional)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={formData.selectedProduct}
                onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                placeholder="Enter product ID or URL"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => {
                  if (formData.selectedProduct) {
                    setFormData({
                      ...formData,
                      products: [...formData.products, formData.selectedProduct],
                      selectedProduct: ''
                    });
                  }
                }}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold"
              >
                Add
              </button>
            </div>
            {formData.products.length > 0 && (
              <div className="space-y-2">
                {formData.products.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{product}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          products: formData.products.filter((_, i) => i !== idx)
                        });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
           {/* Submit */}
          <button
            type="submit"
            disabled={!formData.video}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
              formData.video
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Upload Reel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReelUpload;