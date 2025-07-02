# DayForge Frontend

DayForge is a task management system used to organise student work and record results. This repository contains the React based frontend built with [Vite](https://vitejs.dev/).

## Features

- Authentication with separate interfaces for students and administrators
- View and manage tasks with drag and drop ordering
- Timer interface for students to track work time
- Record results and grades for each task
- Administration pages for rule management and task configuration

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `example.env` to `.env` and update `VITE_API_URL` to point to your backend API.

### Scripts

- `npm start` – run the development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally

## Project Structure

- `src/` – React components, pages and context providers
- `public/` – static assets served as-is
- `vite.config.js` – Vite configuration

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to help improve DayForge. Alternatively, you can email [shandilya.nookala@gmail.com](mailto:shandilya.nookala@gmail.com) for access.
