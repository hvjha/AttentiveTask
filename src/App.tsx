import { useState } from 'react';
import { Container, Button, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './component/Navbar';
import CreateTaskModal from './component/CreateTaskModal';
import TaskBoard from './component/TaskBoard';
import DeletedTaskPage from './component/DeletedTaskPage';
import Filter from './component/Filter';

const AppContent = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Container>
        {location.pathname === '/' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Create Task
            </Button>

            {/* Add spacing below the button before Filter */}
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
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

