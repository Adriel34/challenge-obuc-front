/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
} from "@mui/material";

function TaskCard(data) {
  const { assignedTo, description, categories } = data.task;
  return (
    <Card
      variant="outlined"
      sx={{
        width: "25rem",
        marginBottom: 2,
        borderRadius: 3,
        boxShadow: 3,
        padding: 2,
        backgroundColor: "white",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {assignedTo}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        {categories.map((category) => (
          <Box sx={{ marginTop: 1 }}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "4px 8px",
              }}
            >
              {category?.name}
            </Button>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default function TaskBoard({ task, categories }) {
  const statuses = [
    { label: "Pending", status: "pending", color: "#ff9800" },
    { label: "In Progress", status: "inProgress", color: "#f57c00" },
    { label: "Completed", status: "completed", color: "#4caf50" },
    { label: "Archived", status: "archived", color: "#9e9e9e" },
    { label: "To Do", status: "to_do", color: "#1976d2" },
    { label: "Done", status: "done", color: "#4caf50" }
  ];

  const tasksByStatus = statuses.map(({ label, status, color }) => ({
    label,
    color,
    tasks: task.filter((task) => task.status === status),
  }));
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {tasksByStatus.map(({ label, color, tasks }) => (
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            backgroundColor: "#f5f6f8",
            padding: 2,
            borderRadius: 3,
            height: "35rem",
            display: "flex",
            flexDirection: "column",
            minWidth: "28rem",
          }}
          key={label}
        >
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {label}
            </Typography>
            <Box
              sx={{
                height: 4,
                backgroundColor: color,
                marginY: 1,
                borderRadius: "2px",
              }}
            />
          </Box>
          <Box
            sx={{
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} categories={categories} />
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
