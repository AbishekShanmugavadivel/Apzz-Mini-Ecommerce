# Git Setup Instructions for Apzz Ecommerce Project

## 📋 Prerequisites

Before proceeding with Git setup, you need to have Git installed on your Windows system.

## 🔧 Install Git on Windows

### Option 1: Download from Git Official Website
1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the latest Git for Windows installer
3. Run the installer with default settings
4. Restart your command prompt/terminal after installation

### Option 2: Using Chocolatey (if installed)
```bash
choco install git
```

### Option 3: Using Winget (Windows 10/11)
```bash
winget install --id Git.Git -e --source winget
```

## 🚀 Git Configuration Steps

Once Git is installed, follow these commands in your terminal:

### 1. Navigate to Project Directory
```bash
cd c:\Users\acer\Desktop\Ecommerce
```

### 2. Initialize Git Repository
```bash
git init
```

### 3. Configure Git User (first time setup)
```bash
git config --global user.name "Abishek Shanmugavadivel"
git config --global user.email "your-email@example.com"
```

### 4. Add All Files to Git
```bash
git add .
```

### 5. Make Initial Commit
```bash
git commit -m "Initial commit for Apzz Ecommerce MERN project"
```

### 6. Create and Switch to Main Branch
```bash
git branch -M main
```

### 7. Add Remote Repository
```bash
git remote add origin https://github.com/AbishekShanmugavadivel/apzz-ecommerce.git
```

### 8. Push to GitHub
```bash
git push -u origin main
```

## 🔐 GitHub Authentication

If you encounter authentication issues, you have several options:

### Option 1: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` permissions
3. Use token as password when prompted

### Option 2: GitHub CLI
```bash
gh auth login
```

### Option 3: SSH Key Setup
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
# Add SSH key to GitHub account
```

## ✅ Verification Steps

After completing the setup:

1. **Check Git Status**
   ```bash
   git status
   ```

2. **Verify Remote Connection**
   ```bash
   git remote -v
   ```

3. **Check Repository Online**
   - Visit: https://github.com/AbishekShanmugavadivel/apzz-ecommerce
   - Verify all files are present

## 📁 What Will Be Uploaded

The following files will be pushed to GitHub:
- ✅ Backend source code (Node.js + Express)
- ✅ Frontend source code (React)
- ✅ Product data with 12 products
- ✅ Configuration files
- ✅ Professional README.md
- ✅ .gitignore (excludes node_modules, .env, build folders)

## 🚫 What Will Be Excluded

By .gitignore, these files won't be uploaded:
- ❌ node_modules folders
- ❌ .env files (environment variables)
- ❌ build/dist folders
- ❌ log files
- ❌ temporary files

## 🛠️ Troubleshooting

### Common Issues:

1. **"git is not recognized"**
   - Solution: Install Git or restart terminal

2. **"Permission denied"**
   - Solution: Use GitHub Personal Access Token

3. **"remote origin already exists"**
   - Solution: `git remote remove origin` then re-add

4. **"Push rejected"**
   - Solution: `git pull origin main --rebase` then push again

## 📞 Next Steps

After successful Git setup:

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Seed Database**
   ```bash
   npm run seed
   ```

3. **Start Development**
   ```bash
   npm start
   ```

---

**Note**: Run these commands in PowerShell or Command Prompt as Administrator if you encounter permission issues.
