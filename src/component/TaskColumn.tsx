import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import useTodoStore, { type TaskStatus } from '../store/store';

const TaskColumn = ({ status }: { status: TaskStatus }) => {
  const todos = useTodoStore((state) => state.todos);
  const updateTask = useTodoStore((state) => state.updateTask);
  const filterTaskName = useTodoStore((state) => state.filterTaskName);
  const filterAssignee = useTodoStore((state) => state.filterAssignee);

  const filteredTasks = todos.filter((task) => {
    const matchesName = filterTaskName
      ? task.name.toLowerCase().includes(filterTaskName.toLowerCase())
      : true;

    const matchesAssignee = filterAssignee
      ? task.assignee.toLowerCase().includes(filterAssignee.toLowerCase())
      : true;

    const matchesStatus = task.status === status;

    return matchesName && matchesAssignee && matchesStatus;
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData('text/plain');
    const task = todos.find((t) => t.id === taskId);
    if (task && task.status !== status) {
      updateTask({
        ...task,
        status,
      });
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        width: '100%',
        maxWidth: 300,
        p: 2,
        bgcolor: '#f9f9f9',
        borderRadius: 2,
        overflowY: 'auto',
        maxHeight: '20vh',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        {status}
      </Typography>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <Typography variant="body2" color="text.secondary">
          No tasks found
        </Typography>
      )}
    </Box>
  );
};

export default TaskColumn;
