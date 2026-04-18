/**
 * DESIGN PATTERN: Singleton
 * OOP PRINCIPLE: Encapsulation
 * WHY: Ensures only ONE database connection instance exists across the entire application.
 *      Subsequent calls to connect() return the cached connection.
 */
import mongoose from 'mongoose';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected: boolean = false;

  // Private constructor prevents external instantiation
  private constructor() {}

  // Static method provides global access point to the single instance
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('DB: Using existing connection (Singleton)');
      return;
    }
    const uri = process.env.MONGO_URI as string;
    if (!uri) throw new Error('MONGO_URI not defined in environment');
    
    await mongoose.connect(uri, {
      dbName: 'shopsphere_v2'
    });
    this.isConnected = true;
    console.log('DB: New connection established');
    mongoose.connection.on('error', (err) => console.error('DB Error:', err));
    mongoose.connection.on('disconnected', () => { this.isConnected = false; });
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.isConnected = false;
  }
}

export default DatabaseConnection.getInstance();
