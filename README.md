# 🔍 DocsIR - Document Information Retrieval System

![Nuxt](https://img.shields.io/badge/Nuxt-4.1.2-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-3.5.21-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

A modern, AI-powered document search engine built with **Nuxt 4**, **Vue 3**, and **TF-IDF algorithm**. Features a stunning glassmorphism UI with CRT terminal effects and advanced document retrieval capabilities.

## ✨ Features

### 🎯 Core Functionality
- **Smart Document Upload** - Support for PDF and TXT files with automatic text extraction
- **Advanced Search Engine** - TF-IDF + Cosine Similarity algorithm for accurate results
- **Real-time Search** - Instant search results with debounced queries
- **Document Management** - Upload, view, delete, and organize documents
- **Debug Mode** - TF-IDF visualization and scoring details

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Beautiful glass-like components with blur effects
- **CRT Terminal Background** - Retro terminal aesthetics with customizable effects
- **Responsive Layout** - Mobile-first design that works on all devices
- **Modal System** - Clean modals for document upload and viewing
- **Glass Alerts** - Elegant notification system

### 🚀 Technical Features
- **Server-Side Rendering** - Built with Nuxt 4 for optimal performance
- **Type Safety** - Full TypeScript implementation
- **Database Integration** - PostgreSQL with Prisma ORM
- **Text Processing** - Natural language processing with stemming and stopword removal
- **File Processing** - PDF parsing and text extraction
- **Optimized Search** - Efficient TF-IDF indexing and retrieval

## 🛠️ Tech Stack

### Frontend
- **Nuxt 4.1.2** - Vue.js framework with SSR
- **Vue 3.5.21** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **@nuxt/icon** - Icon management
- **@nuxt/image** - Image optimization

### Backend
- **PostgreSQL** - Primary database
- **Prisma 6.16.2** - Type-safe database client
- **Natural.js** - Natural language processing
- **PDF-Parse** - PDF text extraction
- **Formidable** - File upload handling

### Development Environment
- **DDEV** - PostgreSQL database container
- **Vite** - Fast build tool and dev server
- **Local Development** - Application runs on localhost due to CORS issues

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **DDEV** (for PostgreSQL database only)
- **Git**

> **Note**: DDEV is used only for the PostgreSQL database. The application runs locally due to CORS policy limitations.

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd simple-search-engine
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Database Setup with DDEV

DDEV is used **only for PostgreSQL database**, not for running the application due to CORS policy issues with Vite.

#### Start DDEV Environment
```bash
# Initialize DDEV for PostgreSQL only
ddev config --project-type=php --php-version=8.2

# Start DDEV containers (PostgreSQL database)
ddev start
```

#### Configure Database
```bash
# Create .env file
cp .env.example .env
```

Add your database URL to `.env`:
```env
# DDEV PostgreSQL connection
DATABASE_URL="postgresql://db:db@localhost:5432/db"
```

#### Setup Prisma Database
```bash
# Generate Prisma client (run locally, not in DDEV)
npx prisma generate

# Push database schema (run locally, not in DDEV)
npx prisma db push

# (Optional) View database in Prisma Studio
npx prisma studio
```

### 4. Start Development Server

⚠️ **Important**: Due to CORS policy issues, run the application **locally**, not inside DDEV.

```bash
# Run application locally (NOT in DDEV)
npm run dev
```

The application will be available at:
- **Local Development**: `http://localhost:3000`
- **DDEV Database**: Available at `localhost:5432`

> **Note**: The DDEV site (`https://simple-search-engine.ddev.site`) returns 403 Forbidden due to Vite configuration. Always use `localhost:3000` for development.

## 📁 Project Structure

```
simple-search-engine/
├── 📁 app/                          # Main application
│   ├── app.vue                      # Root component
│   └── 📁 assets/css/               # Stylesheets
├── 📁 components/                   # Vue components
│   ├── FaultyTerminal.vue          # CRT background effect
│   ├── GlassSurface.vue            # Glassmorphism component
│   ├── SearchHeader.vue            # Main header
│   ├── SearchInput.vue             # Search interface
│   ├── SearchResults.vue           # Results display
│   └── UploadModal.vue             # File upload modal
├── 📁 composables/                  # Vue composables
│   ├── useAlert.ts                 # Alert system
│   └── useSearch.ts                # Search functionality
├── 📁 prisma/                       # Database schema
│   ├── schema.prisma               # Prisma schema
│   └── 📁 migrations/              # Database migrations
├── 📁 server/                       # API endpoints
│   ├── 📁 api/                     # API routes
│   │   ├── delete.post.ts          # Document deletion
│   │   ├── documents.get.ts        # Document listing
│   │   ├── search.post.ts          # Search engine
│   │   └── upload.post.ts          # File upload
│   └── 📁 utils/                   # Server utilities
└── 📁 public/                       # Static assets
```

## 🎯 Usage

### Upload Documents
1. Click the **"Upload Documents"** button
2. Select PDF or TXT files (multiple selection supported)
3. Click **"Upload Selected Files"**
4. Wait for processing completion

### Search Documents
1. Enter your search query in the search box
2. View real-time results with relevance scores
3. Click on any result to view the full document
4. Use **Debug Mode** to see TF-IDF scoring details

### Manage Documents
1. Click **"Document Library"** to view all documents
2. Use **Select Mode** for bulk operations
3. Delete individual or multiple documents
4. View document details and metadata

## ⚙️ Configuration

### Environment Variables
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database"

# Optional: Custom configurations can be added here
```

### Nuxt Configuration
Key configurations in `nuxt.config.ts`:
- **Server Settings**: Host and port configuration
- **DDEV Integration**: Allowed hosts for development
- **Module Setup**: Image, icons, fonts, and Tailwind CSS

### Database Schema
The application uses a simple document model:
```prisma
model Document {
  id          Int      @id @default(autoincrement())
  filename    String
  content_raw String   // Original text
  content     String   // Preprocessed text for search
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔧 Development

### 🚨 Common Issues & Solutions

#### CORS Policy Issues
If you encounter CORS errors when running inside DDEV:
```bash
# ❌ Don't run inside DDEV
ddev exec "npm run dev"

# ✅ Run locally instead
npm run dev
```

#### 403 Forbidden on DDEV Site
The DDEV site (`https://simple-search-engine.ddev.site`) returns 403 because:
- Vite dev server has specific host configurations
- DDEV proxy conflicts with Vite's CORS settings
- **Solution**: Always use `http://localhost:3000`

#### Database Connection Issues
If Prisma can't connect to database:
```bash
# Check if DDEV is running
ddev status

# Restart DDEV if needed
ddev restart

# Verify database URL in .env
DATABASE_URL="postgresql://db:db@localhost:5432/db"
```

### Available Scripts
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate

# Setup dependencies
npm run postinstall
```

### Database Operations
```bash
# Generate Prisma client (run locally)
npx prisma generate

# Push schema changes (run locally)
npx prisma db push

# Create and apply migration (run locally)
npx prisma migrate dev

# View database (run locally)
npx prisma studio

# Reset database (run locally)
npx prisma migrate reset
```

### DDEV Commands (Database Only)
```bash
# Start PostgreSQL database
ddev start

# Stop database environment
ddev stop

# View database logs
ddev logs

# Direct database access
ddev exec "psql -U db -d db"

# Get database connection info
ddev describe
```

### ⚠️ Development Notes
- **DDEV**: Used only for PostgreSQL database (port 5432)
- **Application**: Run with `npm run dev` on `localhost:3000`
- **CORS Issues**: Vite dev server conflicts with DDEV proxy
- **API Access**: DDEV site returns 403 Forbidden, use localhost instead

## 🚀 Production Deployment

### Build Application
```bash
npm run build
```

### Environment Setup
1. Set up PostgreSQL database
2. Configure `DATABASE_URL` environment variable
3. Run database migrations
4. Deploy built application

### Recommended Platforms
- **Vercel** - Seamless Nuxt deployment
- **Netlify** - JAMstack hosting
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Coding Standards
- Use **TypeScript** for type safety
- Follow **Vue 3 Composition API** patterns
- Maintain **responsive design** principles
- Write **clear comments** and documentation
- Test all **search functionality** thoroughly

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nuxt Team** - For the amazing framework
- **Prisma Team** - For the excellent ORM
- **Natural.js** - For NLP capabilities
- **Vue.js Community** - For continuous innovation
- **TailwindCSS** - For utility-first styling

## 📞 Support

If you encounter any issues or have questions:

1. Check the **Issues** section
2. Review the **documentation**
3. Create a **new issue** with detailed information
4. Join our **community discussions**

---

<p align="center">
  <strong>Made with ❤️ using Nuxt 4, Vue 3, and modern web technologies</strong>
</p>

<p align="center">
  <sub>Built for efficient document search and retrieval with beautiful UI/UX</sub>
</p>
