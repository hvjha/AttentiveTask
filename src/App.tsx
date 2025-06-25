import { useState, useMemo } from 'react';
import { Container, Button, Box, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './component/Navbar';
import CreateTaskModal from './component/CreateTaskModal';
import TaskBoard from './component/TaskBoard';
import DeletedTaskPage from './component/DeletedTaskPage';
import Filter from './component/Filter';

import useTodoStore from './store/store';
import { lightTheme, darkTheme } from './theme/theme';
import ThemeToggle from './component/ThemeToggle';

const AppContent = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Container>
        {location.pathname === '/' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 3 }}>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Create Task
            </Button>

            
            <Filter />
          </Box>
        )}

        <CreateTaskModal open={open} onClose={() => setOpen(false)} />

        <Box sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<TaskBoard />} />
            <Route path="/deleted" element={<DeletedTaskPage />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
};

const App = () => {
  const darkMode = useTodoStore((state) => state.darkMode);

  // Memoize theme for performance
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
        <ThemeToggle />
      </Router>
    </ThemeProvider>
  );
};
export default App;
