# ⚡ Quick Start Guide

## You're Almost There! Just 3 Steps:

### ✅ DONE
- [x] Project structure created
- [x] Dependencies installed
- [x] Frontend and Backend code ready

### 🔥 NEXT: Set Up MongoDB (5 minutes)

#### Step 1: Create Free MongoDB Database

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up (it's FREE!)
3. Create a cluster (choose FREE tier - M0)
4. Create a database user:
   - Username: `admin`
   - Password: Click "Autogenerate" and **COPY IT**
5. Get your connection string:
   - Click "Connect" → "Drivers"
   - Copy the string (looks like: `mongodb+srv://admin:PASSWORD@cluster...`)
   - Replace `<password>` with your actual password
6. Network Access:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere"

#### Step 2: Create Your .env File

Create a file at `/Users/g/Documents/Github/my-favorites-hub/backend/.env`

Put this inside (replace with YOUR values):
```
PORT=5000
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/favorites?retryWrites=true&w=majority
ADMIN_PASSWORD=MySecurePassword123
```

**IMPORTANT:**
- Replace `YOUR_PASSWORD` with your MongoDB password
- Replace `ADMIN_PASSWORD` with any password you want to use for adding favorites
- Keep this file SECRET - never share it!

#### Step 3: Run Your App!

**Terminal 1 - Start Backend:**
```bash
cd /Users/g/Documents/Github/my-favorites-hub/backend
npm run dev
```

You should see:
- ✅ Connected to MongoDB
- 🚀 Server running on port 5000

**Terminal 2 - Start Frontend:** (Open a NEW terminal)
```bash
cd /Users/g/Documents/Github/my-favorites-hub/frontend
npm start
```

Your browser will open at http://localhost:3000

### 🎉 Test It!

1. Click "⚙️ Admin Panel" button
2. Fill out the form:
   - **Title**: "My First Favorite Video"
   - **Category**: Videos
   - **Description**: "This is a test!"
   - **YouTube URL**: Any YouTube video (like: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
   - **Admin Password**: The password you set in your .env file
3. Click "Add Favorite"
4. Watch it appear in your gallery! 🌟

---

## What to Do Next?

1. ✅ Get MongoDB set up
2. ✅ Test locally
3. Add a few more favorites
4. Follow `DEPLOYMENT_GUIDE.md` to deploy online
5. Record your demo video
6. Submit and WIN! 🏆

---

## Need Help?

**MongoDB Issues:**
- Make sure your password is correct in the connection string
- Check that Network Access allows all IPs

**Can't start the app:**
- Make sure you're in the right directory
- Check that Node.js is installed: `node --version`
- Make sure MongoDB connection string is correct

**Still stuck?** Check the main README.md for more details!

---

Good luck! You're so close! 💪

