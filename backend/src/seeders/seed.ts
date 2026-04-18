import dotenv from 'dotenv';
import mongoose from 'mongoose';
import db from '../config/db';
import { User, AdminUser, CustomerUser } from '../modules/user/user.model';
import { Category } from '../modules/category/category.model';
import { Product } from '../modules/product/product.model';
import { Order } from '../modules/order/order.model';
import { Payment } from '../modules/payment/payment.model';
import { Cart } from '../modules/cart/cart.model';
import { UserRole } from '../types';

dotenv.config();

const categoriesData = [
  { name: 'Apparel', description: 'Luxury clothing and editorial pieces', slug: 'apparel' },
  { name: 'Footwear', description: 'Architectural footwear for the modern explorer', slug: 'footwear' },
  { name: 'Accessories', description: 'Fine artisan leather goods and tech', slug: 'accessories' },
  { name: 'Timepieces', description: 'Precision engineered horological art', slug: 'timepieces' },
  { name: 'Home', description: 'Brutalist decor and ambient lighting', slug: 'home' }
];

const seedProducts = async (categories: any[]) => {
  const products = [];
  const apparelId = categories.find(c => c.slug === 'apparel')._id;
  const footwearId = categories.find(c => c.slug === 'footwear')._id;
  const accessoriesId = categories.find(c => c.slug === 'accessories')._id;
  const timepiecesId = categories.find(c => c.slug === 'timepieces')._id;

  // 50 products logic
  for (let i = 1; i <= 50; i++) {
    let catId = apparelId;
    let name = `Item ${i}`;
    let price = Math.floor(Math.random() * 5000) + 1000;
    
    if (i <= 10) {
      catId = apparelId;
      name = `Bottega Overcoat Vol. ${i}`;
    } else if (i <= 20) {
      catId = footwearId;
      name = `Cybernetic Runner v${i-10}`;
    } else if (i <= 30) {
      catId = accessoriesId;
      name = `Brutalist Leather Wallet ${i-20}`;
    } else if (i <= 40) {
      catId = timepiecesId;
      name = `Quartz Horizon ${i-30}`;
    } else {
      catId = categories[4]._id; // Home
      name = `Obsidian Desk Lamp ${i-40}`;
    }

    products.push({
      name,
      description: `Premium high-quality ${name} designed for the ShopSphere luxury collection. Featuring premium materials and state-of-the-art craftsmanship.`,
      price,
      discountPercent: i % 5 === 0 ? 15 : 0,
      stock: Math.floor(Math.random() * 100) + 5,
      categoryId: catId,
      images: [`https://picsum.photos/seed/shop${i}/800/600`]
    });
  }
  return Product.insertMany(products);
};

async function seed() {
  try {
    console.log('🌱 Seeding database...');
    await db.connect();

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Payment.deleteMany({}),
      Cart.deleteMany({})
    ]);

    console.log('🧹 Database cleared');

    // Create Categories
    const categories = await Category.insertMany(categoriesData);
    console.log('📂 Categories created');

    // Create Admin
    const admin = new AdminUser({
      name: 'System Admin',
      email: 'admin@shopsphere.com',
      passwordHash: 'Admin@123', // Will be hashed by proxy save
      role: UserRole.ADMIN
    });
    await admin.save();
    console.log('🔑 Admin created');

    // Create Customers
    const c1 = new CustomerUser({
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: 'User@123',
      role: UserRole.USER
    });
    const c2 = new CustomerUser({
      name: 'Jane Smith',
      email: 'jane@example.com',
      passwordHash: 'User@123',
      role: UserRole.USER
    });
    await Promise.all([c1.save(), c2.save()]);
    console.log('👥 Customers created');

    // Create Products
    await seedProducts(categories);
    console.log('📦 50 Products created');

    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
