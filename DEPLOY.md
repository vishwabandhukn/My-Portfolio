# How to Deploy to Vercel

This project is ready to be deployed to Vercel. Follow these steps:

1.  **Push to GitHub:**
    -   Ensure your latest changes are committed and pushed to your GitHub repository.

2.  **Login to Vercel:**
    -   Go to [vercel.com](https://vercel.com) and log in (or sign up) using your GitHub account.

3.  **Import Project:**
    -   Click on **"Add New..."** -> **"Project"**.
    -   Select your `vishwabandhu-portfolio` repository from the list.
    -   Click **"Import"**.

4.  **Configure Project:**
    -   **Framework Preset:** Vercel should automatically detect **Vite**. If not, select it manually.
    -   **Root Directory:** Leave as `./` (default).
    -   **Build Command:** `npm run build` (or `vite build`).
    -   **Output Directory:** `dist`.
    -   **Environment Variables:** (None required for this static site).

5.  **Deploy:**
    -   Click **"Deploy"**.
    -   Wait for the build to complete. Vercel will provide you with a live URL (e.g., `https://vishwabandhu-portfolio.vercel.app`).

## Troubleshooting
-   If you see a 404 error on refresh, ensure the `vercel.json` file (included in this project) is present in the root directory. It handles the routing for Single Page Applications (SPA).
