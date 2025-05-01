# Student Team Management Application

A web application for managing student team members, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure

```
student-team-app/
├── frontend/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main App component
│   └── package.json
├── backend/                # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/           # API routes
│   ├── uploads/          # File uploads directory
│   └── server.js         # Express server
└── README.md
```

## Features

- Add new team members with detailed information
- Upload and manage profile images
- View all team members in a responsive grid layout
- View detailed information for each member
- Social media links integration (GitHub, LinkedIn)
- Form validation and error handling
- Responsive design for all screen sizes

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/your-team-name.git
cd your-team-name
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```
The server will run on http://localhost:5000

2. Start the frontend development server:
```bash
cd frontend
npm start
```
The application will open in your browser at http://localhost:3000

## API Endpoints

### Members

- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get a specific member
- `POST /api/members` - Add a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member

### File Upload

- `POST /api/upload` - Upload profile image

## Request Body Format (POST /api/members)

```json
{
  "name": "String (required)",
  "rollNumber": "String (required)",
  "year": "String (required)",
  "degree": "String (required)",
  "role": "String (required)",
  "aboutProject": "String (required)",
  "aboutYourself": "String (required)",
  "certificate": "String",
  "github": "String",
  "linkedin": "String",
  "imageUrl": "String"
}
```

## Technologies Used

- Frontend:
  - React.js
  - React Router
  - Axios
  - CSS3

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Multer (file uploads)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 