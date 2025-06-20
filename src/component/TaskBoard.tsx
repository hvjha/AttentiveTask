

import { Box } from '@mui/material';
import TaskColumn from './TaskColumn';
import type { TaskStatus } from '../store/store';


const statuses: TaskStatus[] = ['Todo', 'In-Progress', 'Test', 'Completed'];

const TaskBoard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        mt: 4,
        flexWrap: 'wrap',
      }}
    >
      {statuses.map((status) => (
        <TaskColumn key={status} status={status} />
      ))}
    </Box>
  );
};

export default TaskBoard;




