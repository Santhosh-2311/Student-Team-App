import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  useTheme,
  Card,
  CardMedia
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  WorkspacePremium as CertificateIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

function MemberDetails() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching member details:', error);
        setError('Failed to load member details');
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

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

  if (error || !member) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Member not found'}
        </Alert>
        <Button
          component={Link}
          to="/members"
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          Back to Members
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/members"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4 }}
      >
        Back to Members
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={
                member.imageUrl.startsWith('http')
                  ? member.imageUrl
                  : `http://localhost:5000${member.imageUrl}`
              }
              alt={member.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400?text=No+Image';
              }}
              sx={{ objectFit: 'cover' }}
            />
          </Card>

          <Paper sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Contact & Social
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {member.github && (
                  <Button
                    fullWidth
                    variant="outlined"
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
                    fullWidth
                    variant="outlined"
                    startIcon={<LinkedInIcon />}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              {member.name}
            </Typography>
            
            <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<PersonIcon />}
                label={member.role}
                color="primary"
              />
              <Chip
                icon={<SchoolIcon />}
                label={member.degree}
              />
              <Chip
                label={`${member.year} Year`}
              />
              <Chip
                label={`Roll: ${member.rollNumber}`}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} /> About
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {member.aboutYourself}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AssignmentIcon sx={{ mr: 1 }} /> About Project
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {member.aboutProject}
              </Typography>
            </Box>

            {member.certificate && (
              <>
                <Divider sx={{ my: 3 }} />
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <CertificateIcon sx={{ mr: 1 }} /> Certificates
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                    {member.certificate}
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MemberDetails; 