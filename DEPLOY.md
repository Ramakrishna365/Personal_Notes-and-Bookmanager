# 🚀 Deployment Guide - Get Live URLs

## Step 1: Setup MongoDB Atlas (Database)

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Create free account** and sign in
3. **Create a cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select region closest to you
   - Click "Create"
4. **Setup database access:**
   - Go to "Database Access" (left menu)
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Generate secure password (save it!)
   - User Privileges: "Atlas admin"
   - Click "Add User"
5. **Setup network access:**
   - Go to "Network Access" (left menu)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. **Get connection string:**
   - Go to "Database" (left menu)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password

**Save this connection string - you'll need it!**

---

## Step 2: Deploy Backend to Railway

1. **Go to:** https://railway.app
2. **Sign in with GitHub**
3. **Create new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `Personal_Notes-and-Bookmanager`
4. **Configure deployment:**
   - Railway will detect your project
   - Click on the deployed service
   - Go to "Settings" tab
   - Root Directory: `backend`
   - Start Command: `npm start`
5. **Add environment variables:**
   - Go to "Variables" tab
   - Click "Add Variable"
   - Add these:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     PORT=5000
     JWT_SECRET=your-super-secret-key-here-change-this
     NODE_ENV=production
     ```
6. **Generate domain:**
   - Go to "Settings" tab
   - Click "Generate Domain" under "Public Networking"
   - Copy the URL (e.g., `https://your-app.railway.app`)

**Your Backend URL:** `https://your-app.railway.app`

---

## Step 3: Deploy Frontend to Vercel

1. **Go to:** https://vercel.com/signup
2. **Sign up with GitHub**
3. **Import project:**
   - Click "Add New..." → "Project"
   - Import `Personal_Notes-and-Bookmanager`
4. **Configure project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
5. **Add environment variable:**
   - Click "Environment Variables"
   - Add:
     ```
     Name: NEXT_PUBLIC_API_URL
     Value: https://your-backend-url.railway.app/api
     ```
   - Replace with your actual Railway backend URL from Step 2
6. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes

**Your Frontend URL:** `https://your-app.vercel.app`

---

## Alternative: Deploy Backend to Render

If Railway doesn't work, use Render:

1. **Go to:** https://render.com/register
2. **Sign in with GitHub**
3. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select `Personal_Notes-and-Bookmanager`
4. **Configure:**
   - Name: `notes-bookmark-backend`
   - Root Directory: `backend`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free
5. **Add environment variables:**
   - Scroll to "Environment Variables"
   - Add:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     JWT_SECRET=your-secret-key
     NODE_ENV=production
     ```
6. **Create Web Service**
7. **Copy the URL:** `https://notes-bookmark-backend.onrender.com`

---

## Quick Commands (If Using CLI)

### Deploy Frontend to Vercel (Alternative Method)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **notes-bookmark-manager**
- Directory? `./` (current directory)

---

## Update Frontend Environment Variable

After deploying backend, you need to update the frontend to use the live backend URL:

**Option 1: Vercel Dashboard**
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app/api`
4. Redeploy (Deployments → ... → Redeploy)

**Option 2: Update code and push**
1. Create `frontend/.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   ```
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add production environment variables"
   git push
   ```
3. Vercel will auto-redeploy

---

## Verify Deployment

### Test Backend
```bash
curl https://your-backend-url.railway.app/api/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

### Test Frontend
Open: `https://your-app.vercel.app`

You should see:
- ✅ Home page loads
- ✅ Can navigate to Notes and Bookmarks
- ✅ Can create notes/bookmarks
- ✅ Data persists in MongoDB Atlas

---

## Expected Live URLs

After deployment, you'll have:

1. **Frontend (Users access this):**
   - Vercel: `https://your-app.vercel.app`
   - Or custom domain if you add one

2. **Backend API:**
   - Railway: `https://your-app.railway.app`
   - Or Render: `https://your-app.onrender.com`

3. **Database:**
   - MongoDB Atlas (no public URL needed)

---

## Troubleshooting

### Backend not starting?
- Check Railway/Render logs
- Verify MONGODB_URI is correct
- Ensure all environment variables are set

### Frontend can't connect to backend?
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify backend URL is accessible
- Check browser console for errors

### MongoDB connection error?
- Verify IP whitelist includes 0.0.0.0/0
- Check username/password in connection string
- Ensure database user has proper permissions

---

## Cost

All services have free tiers:
- ✅ **MongoDB Atlas:** Free (512MB storage)
- ✅ **Railway:** Free ($5 credit, ~500 hours/month)
- ✅ **Vercel:** Free (unlimited for personal projects)
- ✅ **Render:** Free (750 hours/month)

**Total Cost: $0/month**

---

## Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Share your live URL
3. ✅ Add custom domain (optional)
4. ✅ Setup monitoring
5. ✅ Configure backups for MongoDB

Your app is now live! 🎉
