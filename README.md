Event Management Dashboard
Introduction
The Event Management Dashboard is a tool for organizing events, tasks, and attendees. This system simplifies the planning and management of events by integrating essential features like task tracking, attendee records, and real-time updates. The application is divided into two primary parts:

Backend: Powered by Node.js, Express.js, and MongoDB.
Frontend: Built with React.js, styled using Tailwind CSS, and enhanced with modern tools like Vite.

Key Features
Organize Events: Create, update, and manage event details.
Task Management: Assign and monitor tasks with clear status tracking.
Attendee Tracking: Maintain a detailed record of attendees.
Secure Authentication: User login and session management using JSON Web Tokens.
Live Updates: Real-time event and task status updates using WebSockets.
User-Friendly Interface: A responsive and clean frontend for a seamless user experience



How to Set Up
Prerequisites
Install Node.js and MongoDB.
Use npm or yarn for package management.
Backend Installation
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Create a .env file with the following:
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
PORT=5001
Start the backend server:
npm run dev
Frontend Installation
Switch to the frontend folder:
cd ../frontend
Install dependencies:
npm install
Run the development server:
npm run dev


Technology Stack
Backend
Node.js and Express.js for server-side logic.
MongoDB with Mongoose for database management.
JWT for secure authentication.
Socket.io for live, real-time data updates.
Frontend
React.js for building dynamic user interfaces.
Vite for fast development builds.
Tailwind CSS for modern, utility-first styling.
Axios for seamless API communication.
React Router for page navigation

Project Structure
Backend
Models: Schemas for database objects (e.g., users, tasks, attendees).
Controllers: Application logic for APIs.
Routes: Define endpoint paths and functionality.
Middleware: Handle authentication and errors.
Socket.io: Enable real-time updates.
Frontend
Components: Reusable UI elements.
Pages: Views for features like event management and task tracking.
Context: Manages global states like user authentication.
API Integration: Handles backend communication.

Running the Application
Start the backend server to enable the API and database connection.
Launch the frontend to interact with the application.
Access the app in your browser at the URL specified by the frontend server.

Contribution Guidelines
We welcome improvements and ideas! To contribute:

Fork the repository.
Create a branch for your changes:
git checkout -b new-feature
Commit and push your updates.
Open a pull request.

License
This project is licensed under the MIT License.

Contact
Abhijeet Saurabh
Feel free to reach out for support or collaboration opportunities.
