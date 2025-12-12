# ResQ Internal

ResQ Internal is a comprehensive internal management application built for the ResQ team to efficiently handle reports, incidents, and technical operations. Built with Next.js 16, React 19, and TypeScript.

## Core Functionality

- 📊 **Reports Management** - Track and manage operational reports
- 🚨 **Incident Handling** - Monitor and resolve incidents efficiently
- 🔧 **Technical Operations** - Manage technical tasks and maintenance
- 👥 **Team Collaboration** - Internal tools for the ResQ team
- 📈 **Analytics Dashboard** - Insights and metrics for operations

## Features

- ⚡ **Next.js 16** - Latest Next.js with App Router
- ⚛️ **React 19** - Latest React version
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📊 **TanStack Query** - Powerful data synchronization
- 🎭 **Radix UI** - Accessible component primitives
- 📝 **TypeScript** - Type safety
- 🎯 **Zod** - Schema validation
- 🐻 **Zustand** - Lightweight state management
- 🎨 **Prettier** - Code formatting
- 🔍 **ESLint** - Code linting
- 🐕 **Husky** - Git hooks

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn 1.22.22+


### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ResQ-Internal
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update the `.env.local` file with your actual configuration:
   - `NEXTAUTH_SECRET`: Generate a random secret (you can use `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your application URL

4. **Run the development server**
   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting

## Project Structure

```
ResQ-Internal/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   └── ui/          # UI components (Radix UI, etc.)
│   └── lib/             # Utility functions
│       └── utils.ts     # Helper utilities
├── public/              # Static assets
├── .husky/              # Git hooks
└── config files...      # Configuration files
```

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Validation**: Zod

### Developer Tools
- **Language**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Husky
- **Logger**: Pino

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `yarn format` and `yarn lint`
4. Commit your changes (Husky will run pre-commit hooks)
5. Push and create a pull request

## License

Private - All rights reserved
