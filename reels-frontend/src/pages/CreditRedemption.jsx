import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { HiShoppingBag } from 'react-icons/hi';
import { FiCheck, FiX } from 'react-icons/fi';

const CreditRedemption = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  
  const availableCredits = 800;
  const creditRate = 10; // 10 credits = ₹1 discount
  
  const presetAmounts = [
    { credits: 100, discount: 10 },
    { credits: 200, discount: 20 },
    { credits: 500, discount: 50 },
    { credits: 1000, discount: 100 },
  ];

  const calculateDiscount = (credits) => {
    return Math.floor(credits / creditRate);
  };

  const handleRedeem = () => {
    if (!selectedAmount && !customAmount) {
      alert('Please select or enter an amount');
      return;
    }
     const creditsToUse = selectedAmount || parseInt(customAmount);
    if (creditsToUse > availableCredits) {
      alert('Insufficient credits');
      return;
    }

    if (creditsToUse < 100) {
      alert('Minimum redemption: 100 credits (₹10 discount)');
      return;
    }

    // API call to redeem credits
    console.log('Redeeming:', creditsToUse, 'credits for ₹', calculateDiscount(creditsToUse));
    
    // Navigate to checkout or show success
    alert(`₹${calculateDiscount(creditsToUse)} discount applied! Redirecting to checkout...`);
    navigate('/checkout');
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
           <h1 className="text-xl font-bold text-gray-800">Redeem Credits</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Available Credits */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <HiShoppingBag size={28} />
            <div>
              <p className="text-sm opacity-90">Available Credits</p>
              <p className="text-3xl font-bold">{availableCredits.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm opacity-90 mt-2">
            10 credits = ₹1 discount • Minimum: 100 credits (₹10)
          </p>
        </div>
         {/* Credit Conversion Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Select Amount</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {presetAmounts.map((preset) => {
              const isSelected = selectedAmount === preset.credits;
              const canAfford = preset.credits <= availableCredits;
              
              return (
                <button
                  key={preset.credits}
                  onClick={() => {
                    if (canAfford) {
                      setSelectedAmount(preset.credits);
                      setCustomAmount('');
                    }
                  }}
                  disabled={!canAfford}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-pink-500 bg-pink-50'
                      : canAfford
                      ? 'border-gray-200 hover:border-pink-300 bg-white'
                      : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800 mb-1">
                      ₹{preset.discount}
                    </p>
                     <p className="text-sm text-gray-600">{preset.credits} credits</p>
                    {isSelected && (
                      <FiCheck className="mx-auto mt-2 text-pink-500" size={20} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Amount */}
          <div className="border-t pt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Custom Amount (100 - {availableCredits} credits)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Enter credits"
                min="100"
                max={availableCredits}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
               {customAmount && (
                <div className="px-4 py-2 bg-gray-100 rounded-lg flex items-center">
                  <span className="text-sm font-semibold text-gray-700">
                    = ₹{calculateDiscount(parseInt(customAmount) || 0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Summary */}
        {(selectedAmount || customAmount) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Redemption Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Credits to Redeem:</span>
                <span className="font-semibold text-gray-800">
                  {(selectedAmount || parseInt(customAmount) || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount Amount:</span>
                <span className="font-bold text-pink-500 text-xl">
                  ₹{calculateDiscount(selectedAmount || parseInt(customAmount) || 0)}
                </span>
                 </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Remaining Credits:</span>
                <span className="font-semibold text-gray-800">
                  {(availableCredits - (selectedAmount || parseInt(customAmount) || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Terms */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Credits can be used as discount during checkout. 
            Discount will be applied automatically when you proceed to checkout.
          </p>
        </div>
        {/* Redeem Button */}
        <button
          onClick={handleRedeem}
          disabled={!selectedAmount && !customAmount}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
            (selectedAmount || customAmount)
              ? 'bg-pink-500 text-white hover:bg-pink-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Redeem & Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CreditRedemption;
