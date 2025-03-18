import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Divider, 
  Box, 
  CircularProgress,
  Chip
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import BusinessIcon from "@mui/icons-material/Business";

const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data);  // Store data in state
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // Runs only once when component mounts

  // Function to generate avatar background color based on user id
  const getAvatarColor = (id) => {
    const colors = [
      "#3f51b5", "#f44336", "#009688", "#ff9800", "#9c27b0",
      "#2196f3", "#4caf50", "#ff5722", "#673ab7", "#795548"
    ];
    return colors[id % colors.length];
  };

  // Function to get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold" color="primary">
        User Directory
      </Typography>
      
      <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {users.map(user => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: getAvatarColor(user.id),
                          width: 56,
                          height: 56,
                          mr: 2
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h2">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{user.username}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <EmailIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <PhoneIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">{user.phone}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <LanguageIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">
                        <a 
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#3f51b5', textDecoration: 'none' }}
                        >
                          {user.website}
                        </a>
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                      <BusinessIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
                      <Typography variant="body2" component="div">
                        {user.company.name}
                        <Chip 
                          label={user.company.bs} 
                          size="small" 
                          sx={{ mt: 1, fontSize: '0.7rem' }}
                        />
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default FetchData;