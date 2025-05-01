import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Typography, Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';
import './App.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function AppTitle() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 3,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 500,
        }}
      >
        Student Team Members Management Application
      </Typography>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <AppTitle />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddMember />} />
              <Route path="/members" element={<ViewMembers />} />
              <Route path="/members/:id" element={<MemberDetails />} />
              <Route path="/" element={<Navigate to="/members" replace />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 