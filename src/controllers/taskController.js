const prisma = require("../prisma/client");

// GET /api/tasks — list all tasks
async function getAllTasks(req, res) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

// GET /api/tasks/:id — get single task
async function getTaskById(req, res) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
}

// POST /api/tasks — create a new task
async function createTask(req, res) {
  try {
    const { title, description, status, priority, due_date, weather, temperature } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: status || "pending",
        priority: priority || "medium",
        dueDate: due_date ? new Date(due_date) : null,
        weather: weather || null,
        temperature: temperature != null ? parseFloat(temperature) : null,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
}

// PUT /api/tasks/:id — update a task
async function updateTask(req, res) {
  try {
    const { title, description, status, priority, due_date, weather, temperature } = req.body;

    const existing = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!existing) return res.status(404).json({ error: "Task not found" });

    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
        ...(due_date !== undefined && { dueDate: due_date ? new Date(due_date) : null }),
        ...(weather !== undefined && { weather }),
        ...(temperature !== undefined && { temperature: temperature != null ? parseFloat(temperature) : null }),
      },
    });

    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
}

// DELETE /api/tasks/:id — delete a task
async function deleteTask(req, res) {
  try {
    const existing = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!existing) return res.status(404).json({ error: "Task not found" });

    await prisma.task.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
