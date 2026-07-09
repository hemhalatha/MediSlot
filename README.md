# MediSlot

MediSlot is a full-stack doctor appointment platform for patients, doctors, and administrators. The application supports patient registration, doctor discovery, appointment booking, profile management, admin-managed doctor onboarding, doctor dashboards, and Razorpay payment flow integration.

The repository is organized as three independent apps:

- `frontend` - patient-facing React application
- `admin` - admin and doctor portal React application
- `backend` - Express API with MongoDB, JWT authentication, Cloudinary uploads, and Razorpay payments

## Features

- Patient account registration and login
- Doctor listing with specialty-based browsing
- Appointment booking and cancellation
- Patient profile updates with image upload
- Admin login and doctor management
- Admin dashboard for doctors, patients, and appointments
- Doctor login, dashboard, appointment completion, and availability management
- Razorpay order creation and payment verification flow

## Tech Stack

- React, Vite, Tailwind CSS
- Node.js, Express
- MongoDB, Mongoose
- JWT authentication
- Cloudinary image storage
- Razorpay payments

## Folder Structure

```text
MediSlot/
├── frontend/   # Patient-facing web app
├── admin/      # Admin and doctor portal
├── backend/    # API server
├── README.md
└── .gitignore
```

## Local Setup

Install dependencies separately for each app.

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

## Environment Variables

Create environment files from the examples in each app directory.

### Backend

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-url>
JWT_SECRET=<strong-jwt-secret>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
CLOUDINARY_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_SECRET_KEY=<cloudinary-secret-key>
RAZORPAY_KEY_ID=<razorpay-key-id>
RAZORPAY_KEY_SECRET=<razorpay-key-secret>
CURRENCY=INR
```

### Frontend

Create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=<razorpay-key-id>
```

### Admin Portal

Create `admin/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Run Locally

Start the API server:

```bash
cd backend
npm run server
```

Start the patient app:

```bash
cd frontend
npm run dev
```

Start the admin/doctor portal:

```bash
cd admin
npm run dev
```

## Production Build

Build the frontend apps before deployment.

```bash
cd frontend
npm run build

cd ../admin
npm run build
```

Run the backend with:

```bash
cd backend
npm start
```

## Deployment Notes

- Deploy the backend as a Node.js web service.
- Configure production environment variables in the hosting provider dashboard.
- Deploy `frontend` and `admin` as separate static Vite apps.
- Set `VITE_BACKEND_URL` in both frontend deployments to the production API URL.
- Configure backend CORS to allow only the deployed frontend and admin origins.
- Keep real `.env` files out of version control.

## Repository Hygiene

Generated dependencies and build outputs are intentionally ignored. Commit source files, lock files, configuration, and static assets only.
