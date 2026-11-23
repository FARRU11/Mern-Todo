# MERN ToDo App

**🔗 Live demo:** [https://farru11.github.io/Mern-Todo/](https://farru11.github.io/Mern-Todo/)

A simple full-stack ToDo app built with **MongoDB, Express, React (Vite) and Node.js**.
Add, edit and delete tasks, stored in MongoDB.

## Structure

```
backend/   Express + Mongoose REST API
frontend/  React + Vite single-page app
```

## Run locally

**1. Backend**
```bash
cd backend
cp .env.example .env      # add your MongoDB connection string
npm install
npm run dev               # http://localhost:5000
```

**2. Frontend**
```bash
cd frontend
cp .env.example .env      # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev               # http://localhost:5173
```

## API

| Method | Route             | Description    |
| ------ | ----------------- | -------------- |
| GET    | `/api/get`        | List all ToDos |
| POST   | `/api/save`       | Create a ToDo  |
| PUT    | `/api/update/:id` | Update a ToDo  |
| DELETE | `/api/delete/:id` | Delete a ToDo  |

## Deploy

GitHub Pages can only host the **frontend**. The backend needs a Node host
(Render, Railway, Fly.io, ...).

1. Deploy `backend/` to your host. Set `MONGO_URI` and `CORS_ORIGIN=https://<your-username>.github.io`.
2. In this repo: **Settings > Secrets and variables > Actions > Variables**, add `VITE_API_URL` = `https://<your-backend>/api`.
3. **Settings > Pages > Source: GitHub Actions**.
4. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.
