import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useTodoStore from '../store/store';
import type { Todo } from '../store/store';
import { useState } from 'react';
import CreateTaskModal from './CreateTaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const TaskCard = ({ task }: { task: Todo }) => {
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const addDeletedTask = useTodoStore((state) => state.addDeletedTask);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleDelete = () => {
    addDeletedTask(task);
    deleteTask(task.id);
    setOpenDeleteConfirm(false);
  };

 const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  e.dataTransfer.setData('text/plain', task.id);
};

  return (
    <>
      <Card
        sx={{ mb: 2, position: 'relative', cursor: 'grab' }}
        draggable
        onDragStart={handleDragStart}
      >
        <CardContent>
          <Typography variant="h6">{task.name}</Typography>
          <Typography variant="body2">Assigned to: {task.assignee}</Typography>
          <Typography variant="body2">Priority: {task.priority}</Typography>
          <Typography variant="body2">Story Points: {task.storyPoints}</Typography>
          <Typography variant="body2">Status: {task.status}</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
            <IconButton onClick={() => setOpenEdit(true)} aria-label="edit">
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => setOpenDeleteConfirm(true)} aria-label="delete">
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <CreateTaskModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        isEdit
        initialData={task}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default TaskCard;
