
import { Box, Card, CardContent, Typography } from '@mui/material';
import useTodoStore from '../store/store';


const formatTimeAgo = (timestamp: number) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `Today, ${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `Just now`;
  }
};

const DeletedTaskPage = () => {
  const deletedTodos = useTodoStore((state) => state.deletedTodos);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Deleted Tasks
      </Typography>

      {deletedTodos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No deleted tasks available.
        </Typography>
      ) : (
        deletedTodos.map((task) => (
          <Card key={task.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{task.name}</Typography>
              <Typography variant="body2">Assigned to: {task.assignee}</Typography>
              <Typography variant="body2">Priority: {task.priority}</Typography>
              <Typography variant="body2">Story Points: {task.storyPoints}</Typography>
              <Typography variant="body2">Status: {task.status}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                Deleted: {formatTimeAgo(task.deletedAt)}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default DeletedTaskPage;
