
import React, { useRef, useState, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiSearch, FiSettings, FiHeart, FiMessageCircle, FiShare2, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { HiShoppingBag } from 'react-icons/hi';

const ProductCard = ({ product, onAddToCart, onView }) => (
  <div className="flex-shrink-0 w-32 border border-gray-100 rounded-md overflow-hidden mr-2 p-1 text-center bg-white hover:shadow-md transition-shadow">
    <div className="h-20 w-full flex items-center justify-center bg-gray-50 rounded-md mb-1 overflow-hidden">
      <img 
        src={product.image || `https://via.placeholder.com/80x80?text=${product.brand}`} 
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-xs font-semibold text-gray-800 truncate px-1">{product.brand}</p>
    <p className="text-[10px] text-gray-500 line-through px-1">₹{product.originalPrice}</p>
    <div className="flex justify-center items-center px-1">
      <p className="text-sm font-bold text-gray-900 mr-1">₹{product.price.toLocaleString('en-IN')}</p>
      {product.discount && (
        <span className="text-[10px] text-pink-500 font-semibold">{product.discount}</span>
      )}
    </div>
     {product.rating && (
      <div className="flex justify-center items-center text-[10px] text-gray-500 mt-0.5 px-1">
        <span className="text-yellow-500 mr-1">★</span>
        {product.rating} ({product.reviews})
      </div>
    )}
    <div className="flex gap-1 mt-1 px-1">
      <button
        onClick={() => onView(product)}
        className="flex-1 text-[10px] px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-semibold"
      >
        View
      </button>
      <button
        onClick={() => onAddToCart(product)}
        className="flex-1 text-[10px] px-2 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 font-semibold flex items-center justify-center"
      >
        <HiShoppingBag size={12} className="mr-1" />
        Add
      </button>
    </div>
  </div>
);
const ReelItem = ({ reel, isActive }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowing, setIsFollowing] = useState(reel.isFollowing);
  const [likes, setLikes] = useState(reel.likes || 0);

   useEffect(() => {
    if (isActive && videoRef.current) {
     
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

   const toggleMute = () => {
    if (!videoRef.current) return;
    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

const handleFollow = async () => {
    // API call to follow/unfollow
    try {
      // await fetch(`/api/user/follow/${reel.creatorId}`, { method: 'POST' });
      setIsFollowing(!isFollowing);
      // Trigger credit calculation on backend
    } catch (error) {
      console.error('Follow error:', error);
    }
  };

  const handleLike = () => {
    setLikes(prev => prev + 1);
    // API call to like reel
  };

  const handleAddToCart = (product) => {
    // Add to cart logic
    console.log('Add to cart:', product);
    // Navigate to cart or show notification
  };

  const handleViewProduct = (product) => {
    // Navigate to product page
    navigate(`/product/${product.id}`);
  };
 const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: reel.caption,
        text: reel.caption,
        url: window.location.href,
      });
    }
  };

  return (
     <div className="relative w-full h-full max-w-sm mx-auto flex flex-col bg-white">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center z-30 bg-white shadow-sm border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Studio</h2>
        <div className="flex space-x-3 text-gray-700">
         
          <Link to="/dashboard">
            <FiSettings size={20} className="cursor-pointer" />
          </Link>
          
        </div>
      </div>
       {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto mt-[52px]">
        {/* Creator Info */}
        <div className="flex items-center p-3">
          <Link to={`/profile/${reel.creatorName}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${reel.isPodcastStyle ? 'bg-pink-500' : 'bg-pink-500'} cursor-pointer hover:opacity-80`}>
              <span className="text-white font-bold text-sm">
                {reel.creatorName.charAt(0)}
              </span>
            </div>
          </Link>
          <div className="ml-3 flex-grow">
            <Link to={`/profile/${reel.creatorName}`}>
              <p className="text-sm font-semibold text-gray-800 cursor-pointer hover:underline">
                {reel.creatorName}
              </p>
            </Link>
            <p className="text-xs text-gray-500">{reel.date}</p>
          </div>
          <button
            onClick={handleFollow}
            className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
              isFollowing
                ? 'border border-gray-400 text-gray-700 hover:bg-gray-50'
                : 'bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          {/* <BsThreeDotsVertical className="ml-3 text-gray-500 cursor-pointer" /> */}
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-[9/16] bg-gray-200 flex items-center justify-center">
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.imageUrl}
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
            onClick={togglePlay}
          >
            <source src={reel.videoUrl} type="video/mp4" />
          </video>

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 z-10"
            >
              <IoIosPlay size={60} className="text-white" />
            </button>
          )}

           {/* Volume Control Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="absolute left-2 bottom-20 z-20 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <FiVolumeX size={20} />
            ) : (
              <FiVolume2 size={20} />
            )}
          </button>

           {/* Video Actions (Right Side) */}
          <div className="absolute right-2 bottom-20 flex flex-col gap-4 z-20">
            <button
              onClick={handleLike}
              className="flex flex-col items-center text-white"
            >
              <FiHeart size={24} className="mb-1" />
              <span className="text-xs font-semibold">{likes}</span>
            </button>
            <button className="flex flex-col items-center text-white">
              <FiMessageCircle size={24} className="mb-1" />
              <span className="text-xs font-semibold">{reel.comments || 0}</span>
            </button>
            <button onClick={handleShare} className="flex flex-col items-center text-white">
              <FiShare2 size={24} />
            </button>
          </div>

          {/* Podcast Style Overlay */}
          {reel.isPodcastStyle && (
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white text-center mb-10">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-8 h-8 bg-white text-pink-600 font-bold text-sm rounded-full flex items-center justify-center mr-1">
                    M
                  </div>
                  <span className="text-xs font-light tracking-widest">PODCASTS</span>
                </div>
                 <p className="text-4xl font-extrabold tracking-widest">LONG RALLY</p>
                <div className="flex justify-center -space-x-4 mt-8">
                  <div className="w-16 h-16 bg-white border-4 border-white rounded-full"></div>
                  <div className="w-16 h-16 bg-white border-4 border-white rounded-full translate-x-1"></div>
                </div>
                {!isPlaying && (
                  <IoIosPlay size={50} className="mx-auto mt-6 cursor-pointer" onClick={togglePlay} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Products & Info Section */}
        <div className="p-3 border-t border-gray-100 bg-white">
          <p className="text-sm text-gray-600 mb-2">{reel.caption}</p>

          <div className="flex items-center justify-between text-xs font-semibold text-pink-500 mb-2">
            <span className="cursor-pointer hover:underline">SHOP ALL</span>
            <span className="cursor-pointer hover:underline">
              UNDER ₹
              {reel.products.length > 0
                ? reel.products.reduce((max, p) => Math.max(max, p.price), 0).toLocaleString('en-IN')
                : '...'}
            </span>
          </div>
           {/* Product Integration - Horizontal Scroll */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            {reel.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onView={handleViewProduct}
              />
            ))}
          </div>

          {/* Views Count */}
          <div className="mt-2 text-xs text-gray-500">
            {reel.views || 0} views
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelItem;
