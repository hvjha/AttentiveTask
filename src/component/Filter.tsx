import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import useTodoStore from '../store/store';

const Filter = () => {
  const filterTaskName = useTodoStore((state) => state.filterTaskName);
  const filterAssignee = useTodoStore((state) => state.filterAssignee);
  const setFilterTaskName = useTodoStore((state) => state.setFilterTaskName);
  const setFilterAssignee = useTodoStore((state) => state.setFilterAssignee);

  // Local state to control inputs for better UX (optional)
  const [taskName, setTaskName] = useState(filterTaskName);
  const [assignee, setAssignee] = useState(filterAssignee);

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaskName(value);
    setFilterTaskName(value);
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAssignee(value);
    setFilterAssignee(value);
  };

  const handleClearFilters = () => {
    setTaskName('');
    setAssignee('');
    setFilterTaskName('');
    setFilterAssignee('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <TextField
        label="Filter by Task Name"
        variant="outlined"
        value={taskName}
        onChange={handleTaskNameChange}
        sx={{ flex: 1, minWidth: 200 }}
      />

      <TextField
        label="Filter by Assignee"
        variant="outlined"
        value={assignee}
        onChange={handleAssigneeChange}
        sx={{ flex: 1, minWidth: 200 }}
      />

      <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </Box>
  );
};

export default Filter;
