require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Reel = require('../models/Reel');
const Credit = require('../models/Credit');

const seed = async () => {
  await connectDB();

  await User.deleteMany({});
  await Product.deleteMany({});
  await Reel.deleteMany({});
  await Credit.deleteMany({});

  const alice = await User.create({ name: 'Alice', email: 'alice@example.com' });
  const bob = await User.create({ name: 'Bob', email: 'bob@example.com' });

  // create credit records
  await Credit.create({ userId: alice._id });
  await Credit.create({ userId: bob._id });

  const p1 = await Product.create({
    title: 'Casual Shirt',
    brand: 'StudioWear',
    price: 799,
    originalPrice: 1499,
    image: 'https://via.placeholder.com/300x400.png?text=Shirt',
    discount: '47% off',
    rating: 4.3,
    reviews: 128
  });

  const p2 = await Product.create({
    title: 'Sneakers',
    brand: 'RunFree',
    price: 1299,
    originalPrice: 2499,
    image: 'https://via.placeholder.com/300x400.png?text=Sneakers',
    discount: '48% off',
    rating: 4.6,
    reviews: 560
  });

  await Reel.create({
    creatorId: alice._id,
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    imageUrl: 'https://via.placeholder.com/450x800.png?text=Poster',
    caption: 'Latest looks from Studio — tap to shop.',
    linkedProductIds: [p1._id, p2._id],
    views: 0
  });

  await Reel.create({
    creatorId: bob._id,
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    imageUrl: 'https://via.placeholder.com/450x800.png?text=Poster2',
    caption: 'Long Rally podcast episode — check guests & merch.',
    linkedProductIds: [p2._id],
    views: 0
  });

  console.log('Seed complete!');
  process.exit(0);
};

seed().catch(err => {
  console.error('Seed error', err);
  process.exit(1);
});
