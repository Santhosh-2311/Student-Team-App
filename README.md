# Student Team Members Management Application

A modern web application for managing student team members, built with React.js and Node.js. This application allows you to add, view, and manage student team members with their details including profile pictures, roles, and social media links.

## Features

- View all team members in a responsive grid layout
- Add new team members with detailed information
- View individual member details
- Upload and manage profile pictures
- Social media integration (GitHub and LinkedIn)
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Material-UI
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Multer (for file uploads)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/[your-team-name].git
cd [your-team-name]
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

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Members

#### GET /api/members
- Description: Get all team members
- Response: Array of member objects

#### GET /api/members/:id
- Description: Get a specific team member by ID
- Response: Member object

#### POST /api/members
- Description: Add a new team member
- Request Body:
  ```json
  {
    "name": "string",
    "role": "string",
    "year": "string",
    "github": "string",
    "linkedin": "string",
    "aboutYourself": "string"
  }
  ```
- Files: Profile picture (multipart/form-data)

#### PUT /api/members/:id
- Description: Update a team member
- Request Body: Same as POST

#### DELETE /api/members/:id
- Description: Delete a team member

## Project Structure

```
student-team-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 