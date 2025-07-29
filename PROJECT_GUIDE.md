# Your First Next.js App - Project Guide

## 🏗️ Project Structure

```
jonathon-first-app/
├── app/                    # Your application pages & routes
│   ├── page.tsx           # Home page (http://localhost:3000)
│   ├── layout.tsx         # Main layout wrapper
│   └── globals.css        # Global styles
├── public/                # Static files (images, fonts)
├── components/            # Reusable UI components (create this)
├── lib/                   # Utility functions (create this)
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Key Concepts

### 1. **Pages (app/page.tsx)**
- Each file in `app/` becomes a route
- `page.tsx` = the actual page content
- `layout.tsx` = wrapper around pages

### 2. **Components**
- Reusable pieces of UI
- Like LEGO blocks for your website
- Example: Button, Card, Header

### 3. **Styling with Tailwind**
- Use utility classes: `className="text-blue-500 p-4"`
- No need to write CSS files
- Responsive by default

### 4. **TypeScript**
- Adds types to JavaScript
- Helps catch errors early
- Better autocomplete in VS Code

## 🚀 Common Commands

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm lint       # Check code quality
```

## 📝 Next Steps

1. Edit `app/page.tsx` to change the home page
2. Create a `components` folder
3. Add your first component
4. Connect to AI services