# E-Commerce

A full-stack e-commerce web application built with user and admin frontends using Node.js, Express, MongoDB, and React.

Please have look at live application
[https://ecommerce-mern-vercel-self.vercel.app](https://ecommerce-mern-vercel-self.vercel.app/auth/signIn)
Please sign up to use application(for now just use dummy data).

![image alt]()
![image alt]()
![image alt]()
![image alt]()
![image alt]()

## Features ✨
- **Workflow Management**: Create, organize, and track workflows
- **User Authentication**: Secure sign-in/sign-up with JWT
- **RESTful API**: Node.js backend with Express
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel deployment

## Tech Stack
### Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router
- Axios for API calls
- React flow

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- CORS enabled for cross-origin requests

## Prerequisites 
- Node.js (v16+ recommended)
- npm
- MongoDB Atlas account or local MongoDB instance
- Vercel account (for deployment)

## Installation 
### 1. Clone the repository
git clone https://github.com/Asitha92/NodePilot.git
cd NodePilot
cd frontend - for frontend
cd backend - for backend

### 2. Install dependencies and run in local device
frontend > npm install
frontend > npm run dev

backend > npm install
backend > npm run dev

## Set up environment variables
### for backend
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your openrouter api key(this is free and unlimited)
CLIENT_BASE_URL=client url
PORT=port you are using

### frontend
VITE_CLIENT_BASE_URL=backend api url

## Vercel deployment
### Frontend
1. Push your code to GitHub
2. Go to https://vercel.com (Create an account and choose continue with github option)
3. Add your project to vercel (Add New button -> Project)
4. Select name, framework(Vite) and press Edit and choose frontend
5. Add environment variables(important: in frontend you must add backend vercel domain url)
6. Deploy

### Backend
1. Add your project to vercel (Add New button -> Project)
2. Select name, framework(Node) and press Edit and choose backend
3. Add environment variables(important: in backend you must add frontend vercel domain url)
4. Deploy

## Project Structure

![iamge alt](https://github.com/Asitha92/NodePilot/blob/fe69d5b2b52676cbfe36b1e176c5fd465349f224/6.png)

## API endpoints

### Authentication
POST /auth/signIn - User login
POST /auth/signUp - User registration
POST /auth/signOut - User logout

### Workflows
GET /workflow - Get all workflows
POST /workflow - Create new workflow
GET /workflow/:id - Get selected workflow
DELETE /workflow/delete/:id - Delete workflow
POST /workflow/generate - Create AI response

## Contributing

Contributions are welcome! Please follow these steps:
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
