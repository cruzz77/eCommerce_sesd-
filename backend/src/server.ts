import dotenv from 'dotenv';
import path from 'path';

// Load ENV variables
dotenv.config();

import app from './app';
import db from './config/db';

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    // 1. Connect to Database (Singleton Pattern)
    await db.connect();

    // 2. Start Listening
    app.listen(PORT, () => {
      console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 SHOPSPHERE BACKEND IS LIVE
📡 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🕒 Startup: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
