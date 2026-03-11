# Deployment Guide

This document provides instructions for deploying the Gamesplay platform to various cloud providers.

## Prerequisites

- Node.js 20 or later
- npm
- Docker (optional, for containerized deployment)

## Building the Project

Before deploying, ensure the project is built:

```bash
npm run build:all
```

---

## 1. Cloudflare (Pages)

The client can be deployed to Cloudflare Pages.

### Manual Deployment
1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Deploy: `wrangler pages deploy client/dist`

### Automated (GitHub Integration)
1. Connect your GitHub repository to Cloudflare Pages.
2. Set the build command to: `npm run build --workspace=client`
3. Set the build output directory to: `client/dist`

---

## 2. AWS (Amplify & App Runner)

### AWS Amplify (Frontend)
1. Connect your repository to AWS Amplify.
2. Amplify will use the `amplify.yml` file in the root directory.
3. The build will automatically deploy the `client/dist` folder.

### AWS App Runner / ECS (Full Stack)
1. Build the Docker image:
   ```bash
   docker build -t gamesplay-app .
   ```
2. Push the image to Amazon ECR.
3. Create an App Runner service or ECS task using the image.
4. Ensure port 3001 is exposed.

---

## 3. Google Cloud (Firebase & App Engine)

### Firebase Hosting (Frontend)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize (optional): `firebase init hosting`
4. Deploy: `firebase deploy --only hosting`

### Google App Engine (Full Stack)
1. Install Google Cloud SDK.
2. Deploy using the provided `app.yaml`:
   ```bash
   gcloud app deploy
   ```

---

## Environment Variables

### Build-time (Frontend)
Vite environment variables (starting with `VITE_`) must be available during the **build phase**, as they are bundled into the static assets.

- `VITE_APP_URL`: The public URL of your deployed frontend.

### Runtime (Backend)
These variables are used by the Node.js server at runtime.

- `NODE_ENV`: Set to `production`.
- `PORT`: The port the server should listen on (default: 3001).
