# News Article App

A full-stack CRUD web application for managing news articles, built with React and TypeScript.

![Display Page Design](sample-display-page-design.png)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite |
| UI Library | Material UI (MUI v9) |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Form Handling | React Hook Form |
| Mock Database | JSON Server |

## Features

- **Create** news articles with a validated form
- **Read** all articles displayed as clean, responsive cards
- **Update** any article — the form pre-fills with existing data
- **Delete** any article directly from the article list
- **Search** articles in real-time by title or publisher

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

## Getting Started

**1. Clone the repository**

```bash
git clone <your-fork-url>
cd news-article-assignment
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the app**

```bash
npm run dev
```

This starts both servers simultaneously:

| Server | URL |
|---|---|
| React app | http://localhost:5173 |
| JSON Server (mock API) | http://localhost:3001 |

**4. Open** http://localhost:5173 in your browser.

## Pages

### Page 1 — Create / Update Article
**Routes:** `/create`, `/edit/:id`

A form with four required fields:
- Article Title
- Article Summary
- Article Date
- Publisher

Inline validation prevents submission if any field is empty. On a successful create, the form clears automatically. On a successful update, the app redirects back to the article list.

### Page 2 — Display Articles
**Route:** `/articles`

Displays all articles as cards, each showing the publisher, date, title, and summary. Edit and delete actions are available directly on each card.

## Project Structure

```
src/
├── api/
│   └── articles.ts           # Axios CRUD functions
├── components/
│   └── ArticleCard.tsx        # Article card component
├── pages/
│   ├── CreateUpdatePage.tsx   # Create / update form
│   └── DisplayPage.tsx        # Article list
├── types/
│   └── Article.ts             # Article TypeScript interface
├── App.tsx                    # Route definitions
└── main.tsx                   # Entry point + MUI theme
db.json                        # JSON Server database
```

## API Reference

Base URL: `http://localhost:3001`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/articles` | Get all articles |
| GET | `/articles/:id` | Get a single article |
| POST | `/articles` | Create a new article |
| PUT | `/articles/:id` | Update an existing article |
| DELETE | `/articles/:id` | Delete an article |
