import { IconButton, useTheme, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useTodoStore from '../store/store';

const ThemeToggle = () => {
  const darkMode = useTodoStore((state) => state.darkMode);
  const toggleDarkMode = useTodoStore((state) => state.toggleDarkMode);
  const theme = useTheme();

  return (
    <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <IconButton
        onClick={toggleDarkMode}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: theme.palette.background.paper,
          '&:hover': {
            bgcolor: theme.palette.action.hover,
          },
          boxShadow: 3,
          zIndex: 1300,
        }}
        aria-label="toggle theme"
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
