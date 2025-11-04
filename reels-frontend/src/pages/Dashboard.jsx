import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiUsers, FiAward, FiTrendingUp, FiVideo, 
  FiEye, FiHeart, FiMessageCircle, FiArrowRight,
  FiPlus
} from 'react-icons/fi';
import { HiShoppingBag } from 'react-icons/hi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    followers: 12500,
    following: 245,
    credits: {
      earned: 1250,
      used: 450,
      available: 800
    },
    awards: [
      { type: 'Silver Creator', achieved: true, date: '2024-01-15' },
      { type: 'Gold Creator', achieved: false, required: 100000 }
    ],
    analytics: {
      totalReels: 45,
      totalViews: 125000,
      totalLikes: 8500,
      totalComments: 1200,
      avgEngagement: 7.8
    },
     recentReels: [
      { id: 1, views: 15200, likes: 890, comments: 45, thumbnail: '/reel.mp4' },
      { id: 2, views: 12400, likes: 720, comments: 32, thumbnail: '/reel-video-1.mp4' },
    ]
  });

  // Calculate progress to next milestone
  const nextMilestone = userData.awards.find(a => !a.achieved);
  const progressToGold = nextMilestone 
    ? (userData.followers / nextMilestone.required) * 100 
    : 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Creator Dashboard</h1>
          <Link
            to="/upload"
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            <FiPlus size={18} />
            <span>Upload Reel</span>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FiUsers size={20} />
              <span className="text-sm">Followers</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {userData.followers.toLocaleString()}
            </p>
            <p className="text-xs text-green-600 mt-1">+{Math.floor(userData.followers * 0.05)} this week</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <HiShoppingBag size={20} className="text-pink-500" />
              <span className="text-sm">Credits</span>
            </div>
             <p className="text-2xl font-bold text-gray-800">
              {userData.credits.available.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {userData.credits.earned.toLocaleString()} earned
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FiVideo size={20} />
              <span className="text-sm">Reels</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{userData.analytics.totalReels}</p>
            <p className="text-xs text-gray-500 mt-1">Total uploaded</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FiEye size={20} />
              <span className="text-sm">Views</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {(userData.analytics.totalViews / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-gray-500 mt-1">Total views</p>
          </div>
        </div>
         {/* Credits Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Credits</h2>
            <Link
              to="/redeem"
              className="text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-1"
            >
              Redeem Credits
              <FiArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Earned</span>
              <span className="font-bold text-gray-800">{userData.credits.earned}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Used</span>
              <span className="font-bold text-gray-800">{userData.credits.used}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-gray-800 font-semibold">Available</span>
              <span className="font-bold text-pink-500 text-xl">{userData.credits.available}</span>
            </div>
            <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
              <p className="font-semibold mb-1">How to Earn:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>+10 credits for every 100 followers</li>
                <li>+50 credits for every 1,000 reel views</li>
              </ul>
            </div>
          </div>
        </div>

         {/* Awards Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Awards & Milestones</h2>
          <div className="space-y-4">
            {userData.awards.map((award, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  award.achieved
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiAward
                      size={32}
                      className={award.achieved ? 'text-yellow-500' : 'text-gray-400'}
                    />
                     <div>
                      <h3 className="font-bold text-gray-800">{award.type}</h3>
                      {award.achieved ? (
                        <p className="text-xs text-gray-600">Achieved on {award.date}</p>
                      ) : (
                        <p className="text-xs text-gray-600">
                          Need {award.required.toLocaleString()} followers
                        </p>
                      )}
                    </div>
                  </div>
                  {award.achieved && (
                    <span className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-semibold">
                      Earned
                    </span>
                  )}
                </div>
                {!award.achieved && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{Math.min(progressToGold, 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(progressToGold, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                </div>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FiEye size={24} className="mx-auto text-gray-600 mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {(userData.analytics.totalViews / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-gray-600">Total Views</p>
            </div>
             <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FiHeart size={24} className="mx-auto text-pink-500 mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {userData.analytics.totalLikes.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Total Likes</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FiMessageCircle size={24} className="mx-auto text-gray-600 mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {userData.analytics.totalComments.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Total Comments</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FiTrendingUp size={24} className="mx-auto text-green-500 mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {userData.analytics.avgEngagement}%
              </p>
              <p className="text-xs text-gray-600">Engagement Rate</p>
            </div>
          </div>
        </div>
        {/* Recent Reels */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Reels</h2>
            <Link
              to="/studio"
              className="text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-1"
            >
              View All
              <FiArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {userData.recentReels.map((reel) => (
              <div
                key={reel.id}
                className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/studio')}
              >
                <div className="aspect-[9/16] bg-gray-200 relative">
                  <video
                   src={reel.thumbnail}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-xs bg-black/50 p-2 rounded">
                    <div className="flex justify-between">
                      <span>{reel.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FiHeart size={14} />
                    <span>{reel.likes}</span>
                    <FiMessageCircle size={14} className="ml-2" />
                    <span>{reel.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
