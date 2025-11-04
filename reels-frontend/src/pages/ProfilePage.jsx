
import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiUsers, FiVideo, FiHeart, FiMessageCircle, FiSettings } from "react-icons/fi";
import { HiShoppingBag } from "react-icons/hi";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock data - replace with API call
  const profileData = {
    username: username || "Servingupwithsania",
    handle: "@servingupwithsania",
    followers: 12500,
    following: 245,
    credits: 800,
    awards: ["Silver Creator"],
    bio: "Fashion & Lifestyle Creator | Sharing the latest trends",
    reels: [
      { id: 1, thumbnail: "/reel.mp4", views: 15200, likes: 890 },
      { id: 2, thumbnail: "/reel-video-1.mp4", views: 12400, likes: 720 },
      { id: 3, thumbnail: "/reel.mp4", views: 9800, likes: 650 },
    ]
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // API call to follow/unfollow
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-sm bg-white shadow-xl">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-20">
          <div className="p-4 flex items-center space-x-3">
            <IoIosArrowBack
              size={26}
              onClick={() => navigate(-1)}
              className="cursor-pointer text-gray-700"
            />
            <h2 className="text-lg font-bold text-gray-800">{profileData.username}</h2>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white border-b">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {profileData.username.charAt(0)}
                </span>
              </div>
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                  isFollowing
                    ? "border-2 border-gray-400 text-gray-700 hover:bg-gray-50"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <h1 className="text-lg font-bold text-gray-800 mb-1">{profileData.username}</h1>
            <p className="text-gray-600 text-xs mb-3">{profileData.handle}</p>
            <p className="text-gray-700 text-sm mb-4">{profileData.bio}</p>

            {/* Stats */}
            <div className="flex gap-4 mb-4">
              <div>
                <span className="font-bold text-gray-800">{profileData.followers.toLocaleString()}</span>
                <span className="text-gray-600 ml-1 text-sm">followers</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">{profileData.following}</span>
                <span className="text-gray-600 ml-1 text-sm">following</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">{profileData.reels.length}</span>
                <span className="text-gray-600 ml-1 text-sm">reels</span>
              </div>
            </div>

            {/* Credits & Awards */}
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1 px-3 py-1 bg-pink-50 rounded-full">
                <HiShoppingBag size={14} className="text-pink-500" />
                <span className="text-xs font-semibold text-pink-700">
                  {profileData.credits} Credits
                </span>
              </div>
              {profileData.awards.map((award, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 bg-yellow-50 rounded-full flex items-center gap-1"
                >
                  <span className="text-yellow-600 text-xs">🏆</span>
                  <span className="text-xs font-semibold text-yellow-700">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reels Grid */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-sm">Reels</h3>
            <Link
              to="/dashboard"
              className="text-xs text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-1"
            >
              Dashboard
              <FiSettings size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {profileData.reels.map((reel) => (
              <div
                key={reel.id}
                className="aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden relative cursor-pointer hover:opacity-90"
                onClick={() => navigate("/studio")}
              >
                <video
                  src={reel.thumbnail}
                  className="w-full h-full object-cover"
                  muted
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <div className="flex items-center gap-2 text-white text-xs">
                    <FiHeart size={12} />
                    <span>{reel.likes}</span>
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

export default ProfilePage;