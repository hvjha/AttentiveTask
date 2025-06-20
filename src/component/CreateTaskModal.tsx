import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { TaskStatus, Todo } from "../store/store";
import useTodoStore from "../store/store";

type Props = {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  initialData?: Todo;
};

const CreateTaskModal = ({ open, onClose, isEdit = false, initialData }: Props) => {
  const addTask = useTodoStore((state) => state.addTask);
  const updateTask = useTodoStore((state) => state.updateTask);

  const [name, setName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState<'P0' | 'P1' | 'P2'>('P0');
  const [storyPoints, setStoryPoints] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Todo');

  // Pre-fill in edit mode
  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name);
      setAssignee(initialData.assignee);
      setPriority(initialData.priority);
      setStoryPoints(initialData.storyPoints.toString());
      setStatus(initialData.status);
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && initialData) {
      // Only update status in edit mode
      const updated = { ...initialData, status };
      updateTask(updated);
    } else {
      if (!name.trim() || !assignee.trim()) return;
      const task: Todo = {
        id: Date.now().toString(),
        name,
        assignee,
        priority,
        storyPoints: Number(storyPoints),
        status,
      };
      addTask(task);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Update Task Status" : "Create Task"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {/* Task Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ width: "130px" }}>Task name :</Typography>
            <TextField
              placeholder="Name"
              name="name"
              value={name}
              disabled={isEdit}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Box>

          {/* Priority */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ width: "130px" }}>Set Priority :</Typography>
            <TextField
              select
              fullWidth
              name="priority"
              value={priority}
              disabled={isEdit}
              onChange={(e) => setPriority(e.target.value as "P0" | "P1" | "P2")}
            >
              {["P0", "P1", "P2"].map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Assignee */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ width: "130px" }}>Assignee :</Typography>
            <TextField
              placeholder="Assignee"
              name="assignee"
              value={assignee}
              disabled={isEdit}
              onChange={(e) => setAssignee(e.target.value)}
              fullWidth
            />
          </Box>

          {/* Story Points */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ width: "130px" }}>Story Points :</Typography>
            <TextField
              placeholder="Story Points"
              type="number"
              name="storyPoints"
              value={storyPoints}
              disabled={isEdit}
              onChange={(e) => setStoryPoints(e.target.value)}
              fullWidth
            />
          </Box>

          {/* Status */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ width: "130px" }}>Status :</Typography>
            <TextField
              select
              fullWidth
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              {["Todo", "In-Progress", "Test", "Completed"].map((statusOption) => (
                <MenuItem key={statusOption} value={statusOption}>
                  {statusOption}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskModal;
