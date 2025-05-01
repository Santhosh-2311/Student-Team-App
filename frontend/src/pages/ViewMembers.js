import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Person as PersonIcon,
  School as SchoolIcon
} from '@mui/icons-material';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('Failed to load team members');
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          component={Link}
          to="/add"
          variant="contained"
          color="primary"
        >
          Add New Member
        </Button>
      </Box>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: 4
        }}
      >
        Team Members
      </Typography>

      <Grid container spacing={3}>
        {members.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="240"
                image={
                  member.imageUrl.startsWith('http')
                    ? member.imageUrl
                    : `http://localhost:5000${member.imageUrl}`
                }
                alt={member.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                }}
              />

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<PersonIcon />}
                    label={member.role}
                    size="small"
                    color="primary"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    icon={<SchoolIcon />}
                    label={`${member.year} Year`}
                    size="small"
                    color="secondary"
                    sx={{ mb: 1 }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {member.aboutYourself}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {member.github && (
                      <Button
                        size="small"
                        startIcon={<GitHubIcon />}
                        href={member.github.startsWith('http') ? member.github : `https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </Button>
                    )}
                    {member.linkedin && (
                      <Button
                        size="small"
                        startIcon={<LinkedInIcon />}
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </Button>
                    )}
                  </Box>

                  <Button
                    component={Link}
                    to={`/members/${member._id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewMembers; 