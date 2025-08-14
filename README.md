# StreamFlix - Netflix-Inspired Streaming Platform

A modern, responsive streaming platform built with React, TypeScript, and Tailwind CSS that replicates the Netflix user experience with smooth animations, content discovery, and an elegant dark theme interface.

![StreamFlix Preview](https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600)

## 🚀 Live Demo

**Deployed Application**: [https://zesty-gingersnap-34d6f1.netlify.app](https://zesty-gingersnap-34d6f1.netlify.app)

## ✨ Features

### Core Functionality
- **Hero Banner**: Auto-rotating featured content with cinematic backgrounds
- **Content Discovery**: Categorized rows (Trending, Popular, Genre-based)
- **Smart Search**: Real-time content filtering with instant results
- **Interactive Cards**: Detailed hover previews with ratings and descriptions
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing

### User Experience
- **Smooth Animations**: Netflix-style hover effects and transitions
- **Horizontal Scrolling**: Intuitive content row navigation with arrow controls
- **Loading States**: Skeleton screens and progressive image loading
- **Mobile Navigation**: Collapsible menu for smaller screens
- **Search Interface**: Expandable search bar with clear functionality

### Design System
- **Netflix-Inspired Theme**: Authentic dark UI with signature red accents
- **Typography Hierarchy**: Clean, readable font system
- **Color Palette**: Rich blacks (#141414) and Netflix red (#E50914)
- **Micro-interactions**: Subtle hover states and scaling effects
- **Visual Depth**: Gradient overlays and backdrop blur effects

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Lightning-fast build tool and development server

### Icons & Assets
- **Lucide React** - Beautiful, customizable SVG icons
- **Pexels Images** - High-quality stock photos for content thumbnails

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS processing with Tailwind integration
- **TypeScript Compiler** - Static type checking

## 📁 Project Structure

```
streamflix/
├── public/
│   └── vite.svg                 # Vite logo
├── src/
│   ├── components/              # React components
│   │   ├── Header.tsx          # Navigation header with search
│   │   ├── HeroBanner.tsx      # Featured content carousel
│   │   ├── ContentRow.tsx      # Horizontal scrolling content rows
│   │   ├── ContentCard.tsx     # Individual movie/show cards
│   │   └── SearchResults.tsx   # Search results display
│   ├── data/
│   │   └── mockData.ts         # Sample movies, shows, and featured content
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles and Tailwind imports
│   └── vite-env.d.ts          # Vite type definitions
├── index.html                  # HTML template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vamshik2506/project.git
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Component Architecture

### Header Component
- Responsive navigation with mobile menu
- Expandable search functionality
- User profile section with notifications
- Smooth scroll-based background transitions

### HeroBanner Component
- Auto-rotating featured content (6-second intervals)
- Cinematic background images with gradient overlays
- Call-to-action buttons (Play, More Info)
- Content indicators for manual navigation

### ContentRow Component
- Horizontal scrolling with smooth animations
- Arrow navigation controls (appear on hover)
- Responsive card sizing
- Category-based content organization

### ContentCard Component
- Interactive hover states with detailed previews
- Progressive image loading
- Rating and genre information
- Action buttons (Play, Add to List, Like)

### SearchResults Component
- Grid-based results layout
- Empty state handling
- Result count display
- Responsive card arrangement

## 📊 Data Structure

### Movie/Show Object
```typescript
interface ContentItem {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  rating: number;
  year: number;
  description?: string;
}
```

### Featured Content Object
```typescript
interface FeaturedContent {
  id: number;
  title: string;
  description: string;
  backdrop: string;
  genre: string;
  rating: number;
}
```

## 🎯 Key Features Explained

### Search Functionality
- **Real-time filtering**: Results update as you type
- **Multi-field search**: Searches both title and genre
- **Case-insensitive**: Works regardless of capitalization
- **Empty state handling**: Friendly message when no results found

### Content Organization
- **Trending Now**: Popular movies across all genres
- **Popular on StreamFlix**: Top-rated TV shows
- **Genre Categories**: Action movies, Comedy shows, Drama series
- **Dynamic filtering**: Content automatically categorized by genre

### Responsive Design
- **Mobile-first approach**: Optimized for small screens
- **Breakpoint system**: Tailored layouts for different screen sizes
- **Touch-friendly**: Large tap targets and swipe gestures
- **Performance optimized**: Lazy loading and efficient rendering

## ☁️ AWS Deployment Guide

### Option 1: AWS Amplify (Recommended for React Apps)

#### Step 1: Prepare Your Code
```bash
# Build the project
npm run build

# The build files will be in the 'dist' directory
```

#### Step 2: Deploy to AWS Amplify

1. **Login to AWS Console**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "Get Started" under "Deploy"

2. **Connect Repository**
   - Choose "GitHub" as your repository service
   - Authorize AWS Amplify to access your GitHub account
   - Select your repository: `vamshik2506/project`
   - Choose the branch (usually `main` or `master`)

3. **Configure Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Deploy**
   - Review settings and click "Save and Deploy"
   - AWS Amplify will automatically build and deploy your app
   - You'll get a live URL like: `https://main.d1234567890.amplifyapp.com`

#### Step 3: Custom Domain (Optional)
- In Amplify Console, go to "Domain Management"
- Add your custom domain
- AWS will provide SSL certificate automatically

### Option 2: AWS S3 + CloudFront

#### Step 1: Build the Project
```bash
npm run build
```

#### Step 2: Create S3 Bucket
```bash
# Install AWS CLI
npm install -g aws-cli

# Configure AWS credentials
aws configure

# Create S3 bucket (replace 'your-bucket-name' with unique name)
aws s3 mb s3://streamflix-app-bucket

# Enable static website hosting
aws s3 website s3://streamflix-app-bucket --index-document index.html --error-document index.html
```

#### Step 3: Upload Files
```bash
# Upload build files to S3
aws s3 sync dist/ s3://streamflix-app-bucket --delete

# Make files publicly readable
aws s3api put-bucket-policy --bucket streamflix-app-bucket --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::streamflix-app-bucket/*"
    }
  ]
}'
```

#### Step 4: Create CloudFront Distribution
1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click "Create Distribution"
3. Configure:
   - **Origin Domain**: Your S3 bucket website endpoint
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP Methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - **Cache Policy**: Managed-CachingOptimized
   - **Custom Error Pages**: 
     - Error Code: 403, Response Page Path: `/index.html`, Response Code: 200
     - Error Code: 404, Response Page Path: `/index.html`, Response Code: 200

#### Step 5: Update and Deploy Script
Create a deployment script `deploy.sh`:
```bash
#!/bin/bash
echo "Building project..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://streamflix-app-bucket --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
```

### Option 3: AWS EC2 with Nginx

#### Step 1: Launch EC2 Instance
1. Go to [EC2 Console](https://console.aws.amazon.com/ec2/)
2. Launch new instance:
   - **AMI**: Amazon Linux 2
   - **Instance Type**: t2.micro (free tier)
   - **Security Group**: Allow HTTP (80) and HTTPS (443)

#### Step 2: Connect and Setup
```bash
# Connect to your instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Update system
sudo yum update -y

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Install Nginx
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2 for process management
npm install -g pm2
```

#### Step 3: Deploy Application
```bash
# Clone your repository
git clone https://github.com/vamshik2506/project.git
cd project

# Install dependencies and build
npm install
npm run build

# Copy build files to Nginx directory
sudo cp -r dist/* /var/www/html/

# Configure Nginx for SPA
sudo nano /etc/nginx/nginx.conf
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Restart Nginx
sudo systemctl restart nginx
```

### Option 4: AWS ECS with Docker

#### Step 1: Create Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Step 2: Create nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

#### Step 3: Deploy to ECS
```bash
# Build and push to ECR
aws ecr create-repository --repository-name streamflix-app
docker build -t streamflix-app .
docker tag streamflix-app:latest YOUR_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/streamflix-app:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/streamflix-app:latest

# Create ECS cluster and service through AWS Console
```

## 🔧 Environment Variables

For production deployment, you may want to add environment variables:

```bash
# .env.production
VITE_API_BASE_URL=https://api.streamflix.com
VITE_CDN_URL=https://cdn.streamflix.com
VITE_ANALYTICS_ID=your-analytics-id
```

## 📈 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Images and CSS minification
- **Gzip Compression**: Enabled in production builds

### Runtime Performance
- **Lazy Loading**: Images load progressively
- **Virtual Scrolling**: Efficient rendering of large lists
- **Memoization**: React.memo for expensive components
- **Debounced Search**: Prevents excessive API calls

## 🔒 Security Considerations

### Content Security Policy
Add to your HTML head:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' https://images.pexels.com; style-src 'self' 'unsafe-inline';">
```

### HTTPS Enforcement
Always deploy with HTTPS enabled for production.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Netflix** - Design inspiration and user experience patterns
- **Pexels** - High-quality stock images for content thumbnails
- **Lucide** - Beautiful icon library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation frontend tooling

## 📞 Support

For support and questions:
- **GitHub Issues**: [Create an issue](https://github.com/vamshik2506/project/issues)
- **Email**: your-email@example.com

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
