import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Chip,
  Divider,
  Container,
  Card,
  CardContent,
  CardHeader,
  Avatar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import FruitIcon from "@mui/icons-material/Spa";
import NoResultsIcon from "@mui/icons-material/SearchOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#5e35b1", // deep purple
    },
    secondary: {
      main: "#ec407a", // pink
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        },
      },
    },
  },
});

// Emoji mapping for fruits
const fruitEmojis = {
  Apple: "🍎",
  Banana: "🍌",
  Cherry: "🍒",
  Grapes: "🍇",
  Mango: "🥭",
  Orange: "🍊",
  Pineapple: "🍍",
  Strawberry: "🍓",
};

const SearchFilter = () => {
  // Sample list of items with additional properties
  const items = [
    { name: "Apple", category: "Everyday Fruits", color: "#E40000" },
    { name: "Banana", category: "Tropical Fruits", color: "#FFD700" },
    { name: "Cherry", category: "Stone Fruits", color: "#C70039" },
    { name: "Grapes", category: "Berry Fruits", color: "#6A0DAD" },
    { name: "Mango", category: "Tropical Fruits", color: "#FF8C00" },
    { name: "Orange", category: "Citrus Fruits", color: "#FFA500" },
    { name: "Pineapple", category: "Tropical Fruits", color: "#FFDB58" },
    { name: "Strawberry", category: "Berry Fruits", color: "#FF2E2E" },
  ];

  // State to manage search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter items based on the search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle search clear
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          py: 4,
          px: 2,
          background: "linear-gradient(145deg, #f5f7fa 0%, #e4e9f2 100%)",
        }}
      >
        <Container maxWidth="sm">
          <Card elevation={3}>
            <CardHeader
              title="Fruit Finder"
              titleTypographyProps={{ align: "center", variant: "h5" }}
              sx={{ pb: 0 }}
            />
            
            <CardContent>
              {/* Search Input */}
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search fruits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear search"
                        onClick={handleClearSearch}
                        edge="end"
                        size="small"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Results Counter */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"} found
                </Typography>
                <Chip
                  label={searchQuery ? "Filtered" : "All fruits"}
                  size="small"
                  color={searchQuery ? "primary" : "default"}
                  variant={searchQuery ? "filled" : "outlined"}
                />
              </Box>

              {/* Display Filtered List */}
              <Paper
                variant="outlined"
                sx={{
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                {filteredItems.length > 0 ? (
                  <List sx={{ p: 0 }}>
                    {filteredItems.map((item, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <Divider />}
                        <ListItem
                          button
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(94, 53, 177, 0.04)",
                            },
                            py: 1.5,
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 44 }}>
                            <Avatar
                              sx={{
                                bgcolor: item.color,
                                width: 36,
                                height: 36,
                                fontSize: "1.2rem",
                              }}
                            >
                              {fruitEmojis[item.name]}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={item.name}
                            secondary={
                              <Chip
                                label={item.category}
                                size="small"
                                variant="outlined"
                                sx={{ height: 20, fontSize: "0.7rem" }}
                              />
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Box
                    sx={{
                      p: 4,
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    <NoResultsIcon
                      sx={{ fontSize: 60, color: "text.disabled", mb: 1 }}
                    />
                    <Typography variant="h6">No matching fruits</Typography>
                    <Typography variant="body2">
                      Try a different search term
                    </Typography>
                  </Box>
                )}
              </Paper>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SearchFilter;