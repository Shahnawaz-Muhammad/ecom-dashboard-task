## A full-stack inventory dashboard in Vue 3(frontend) and Express.js(backend).

inventory-management/
├── backend/     
         # Express + MongoDB API
└── frontend/     
         # Vue

## Backend Setup:

Navigate to the backend folder:

cd backend

npm install

Create a .env file:
<!-- .env file -->
PORT=8000

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/inventory-db?
<!-- .Start the server -->
npm start

## Frontend Setup:

Navigate to the frontend folder:

cd frontend

npm install

Create a .env file:

touch .env
<!-- .env file -->
VITE_API_URL=http://localhost:8000
<!-- .Start the server -->
npm run dev

Live Demo: https://inventory-management-task.netlify.app  
API: https://ecom-dashboard-task.onrender.com