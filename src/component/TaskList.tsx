import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import useTodoStore from '../store/store';

const TaskList = () => {
  const todos = useTodoStore((state) => {
    const { todos, filterTaskName, filterAssignee } = state;
    return todos.filter((task) => {
      const matchesName = filterTaskName
        ? task.name.toLowerCase().includes(filterTaskName.toLowerCase())
        : true;
      const matchesAssignee = filterAssignee
        ? task.assignee.toLowerCase().includes(filterAssignee.toLowerCase())
        : true;
      return matchesName && matchesAssignee;
    });
  });

  if (todos.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
        No tasks match the filters.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {todos.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskList;

