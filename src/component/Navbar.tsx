import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      {/* Title with Task Board, links to home */}
      <Typography 
        variant="h6"  
        component={Link} 
        to="/" 
        sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
      >
        Task Board
      </Typography>
      
      {/* Only one button for Deleted Tasks */}
      <Button color="inherit" component={Link} to="/deleted">
        Deleted Tasks
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
