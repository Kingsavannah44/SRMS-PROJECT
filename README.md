#
NAME : BRIAN KIPKEMOI
REG NO: 9972.95
INSTITUTION:KENYA INSTITUTE OF SOFTWARE ENGINEERING AND PROFESSIONAL STUDIES

PROJECT TITLE: Student Record Management System (SRMS)


Project Description

The Student Record Management System (SRMS) is a comprehensive web application designed to efficiently manage student data in educational institutions. This full-stack application provides a user-friendly interface for administrators to add, view, search, and analyze student records with real-time analytics and reporting capabilities.

Problem Statement

Educational institutions often struggle with managing student records efficiently due to:
- Manual record-keeping leading to errors and data loss
- Difficulty in searching and retrieving specific student information
- Lack of real-time analytics and insights about student demographics
- Time-consuming processes for adding and updating student data
- No centralized system for managing student information across departments

SRMS addresses these challenges by providing a digital solution that streamlines student data management with secure authentication, intuitive user interface and comprehensive analytics.

Technologies Used

Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing for single-page application
- **Axios** - HTTP client for API communication
- **CSS3** - Styling and responsive design

Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library
- **JWT (JSON Web Tokens)** - Secure authentication
- **bcryptjs** - Password hashing and encryption
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

Development Tools
- **Nodemon** - Development server with auto-restart
- **React Scripts** - Build tools and development server

Features

Authentication & Security
- Secure user login with JWT token-based authentication
- Password encryption using bcryptjs
- Protected routes and API endpoints

Student Management
- Add new students with comprehensive information (Name, Email, Age, Course)
- View all students in an organized grid layout
- Real-time search functionality by name, email, or course
- Automatic enrollment date tracking

Analytics Dashboard
- Total student count statistics
- Average age calculation
- Course distribution analysis
- Visual representation of student demographics

User Interface
- Clean and intuitive dashboard design
- Responsive layout for different screen sizes
- Real-time data updates
- Loading states and error handling

Search & Filter
- Advanced search functionality across multiple fields
- Real-time filtering of student records
- Case-insensitive search capabilities

Installation and Setup

Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SRMS/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/srms
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```

4. **Create Admin User**
   ```bash
   node adduser.js
   ```

5. **Start the backend server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

Login Credentials for Testing

Default Admin Account
- **Username:** `admin`
- **Password:** `password`

> **Note:** These are default credentials created by the `adduser.js` script. For production use, please change these credentials and use strong passwords.

Creating Additional Users
To create additional users, you can modify the `adduser.js` file with different credentials and run it again, or implement a user registration feature in the application.

API Endpoints

Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

Project Structure

```
SRMS/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Student.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── students.js
│   ├── .env
│   ├── adduser.js
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── pages/
    │   │   ├── Analytics.js
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Students.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── README.md
```

Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

