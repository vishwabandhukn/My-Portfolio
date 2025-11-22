# Vishwabandhu K N - Developer Portfolio

A modern, responsive, and accessible developer portfolio built with React, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🛠 Customization

### 1. Personal Information
Edit the `PERSONAL_INFO` constant in `src/App.jsx` to update your name, tagline, contact details, and about section.

### 2. Projects
Update the `projectsData` array in `src/App.jsx` to add or modify your featured projects.

### 3. Skills
Modify the `SKILLS` object in `src/App.jsx` to update your technical skills.

### 4. Resume
Place your PDF resume in the `public` folder and name it `resume.pdf`. The download button in the Hero section links to this file.

## 📦 Deployment

### Vercel
1.  Push your code to GitHub.
2.  Import the repository in Vercel.
3.  Vercel will automatically detect Vite and configure the build settings.
4.  Deploy!

### Netlify
1.  Push your code to GitHub.
2.  Import the repository in Netlify.
3.  Build command: `npm run build`
4.  Publish directory: `dist`

## 🎨 Features
-   **Dark Mode**: Persisted in local storage.
-   **Animations**: Smooth entrance and scroll animations using Framer Motion.
-   **Responsive**: Fully responsive design for mobile, tablet, and desktop.
-   **Accessibility**: Semantic HTML and ARIA attributes.

## 📄 License
MIT
