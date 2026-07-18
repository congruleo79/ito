# GitHub Pages Deployment

This app is prepared for deployment to GitHub Pages with GitHub Actions!

## What is already configured

- Vite uses a relative `base` path, so the built assets work on GitHub Pages without hardcoding a repository name.
- A workflow is included at `.github/workflows/deploy.yml`.
- Every push to `main` will build the site and deploy it to GitHub Pages.

## What you still need to do

1. Initialize git in this folder if you have not already:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   ```

2. Create a GitHub repository and connect it as the remote:

   ```bash
   git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
   git branch -M main
   git push -u origin main
   ```

3. In GitHub, open `Settings > Pages`.

4. Under `Build and deployment`, set `Source` to `GitHub Actions`.

5. Push changes to `main` whenever you want to deploy updates.

After the first successful workflow run, your site will be available at:

`https://YOUR-USER.github.io/YOUR-REPO/`

## Local commands

```bash
npm install
npm run dev
npm run build
```
