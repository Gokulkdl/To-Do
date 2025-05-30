To-Do App

A full-stack task management(to do list app) application designed to help users stay organized and productive. This app features secure authentication, a responsive UI, and essential task management functionalities.

---

Tech Stack

Frontend:
- React.js– Component-based frontend
- Tailwind CSS – Utility-first styling
- Axios – API requests handling
- JWT (localStorage) – Token-based authentication

Backend:
- Node.js + Express.js – RESTful API backend
- MongoDB Atlas – Cloud-based database
- Mongoose – MongoDB
- bcryptjs – Password hashing
- jsonwebtoken(JWT) – User authentication
- dotenv – Environment configuration
- cors – CORS(Cross-Origin Resource Sharing)restrict web pages from making requests to a different domain
- nodemon – Auto server restarts during development

---

Authentication Features

- User Registration – Sign up using email and password
- User Login – Authenticate and receive a JWT token
- Secure Passwords – All passwords are hashed before storing
- Protected Routes – Only logged-in users can manage tasks

---

Task Management Features

- **Create Task – Add a new task with name, priority, time, and final date
- Edit Task – Update task details
- Delete Task – Remove tasks from your list
- Toggle Complete – Mark tasks as complete or incomplete
- Filter Tasks – View All, Completed, or inprogress tasks
- Search Tasks – Instantly search by task title
- Task Progress – View completion percentage of tasks

---

User Interface

Fully responsive and mobile-friendly
Clean and minimal layout
Task progress indicators


---

Setup Instructions

Backend:

cd Server
npm install
npm run dev

Frontend:

cd Client
npm install
npm run dev


Challenges Faced

---


During development, I encountered frequent power outages and internet disruptions due to heavy rainfall in my area. Since I was working on a system without a power back up, these issues in battery backup. The lack of stable network connectivity further impacted my ability to test and sync code effectively.

As a result, the total time to complete the project extended slightly. However, the actual time spent on coding and implementation was around 8-10 hours. The additional time was due to power and network issues, not development complexity.