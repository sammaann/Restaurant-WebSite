
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import TaskBoard from "@/components/TaskBoard";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/types/task";
import { TaskFormValues } from "@/components/TaskForm";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Load tasks from local storage on init
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing stored tasks:", error);
      }
    } else {
      // Create demo tasks if no tasks exist
      const demoTasks: Task[] = [
        {
          id: uuidv4(),
          title: "Complete project proposal",
          description: "Finish the project proposal document for client review.",
          status: "In Progress",
          priority: "High",
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        },
        {
          id: uuidv4(),
          title: "Schedule team meeting",
          description: "Set up a weekly team meeting for project updates.",
          status: "To Do",
          priority: "Medium",
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        },
        {
          id: uuidv4(),
          title: "Update task manager UI",
          description: "Improve the visual design of the task management interface.",
          status: "Completed",
          priority: "Low",
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      setTasks(demoTasks);
      localStorage.setItem("tasks", JSON.stringify(demoTasks));
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = (values: TaskFormValues) => {
    const newTask: Task = {
      id: uuidv4(),
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      createdAt: new Date().toISOString(),
      dueDate: values.dueDate?.toISOString(),
    };

    setTasks([newTask, ...tasks]);
    setDialogOpen(false);
    toast.success("Task created successfully");
  };

  const handleUpdateTask = (values: TaskFormValues) => {
    if (!editingTask) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id
        ? {
            ...task,
            title: values.title,
            description: values.description,
            status: values.status,
            priority: values.priority,
            dueDate: values.dueDate?.toISOString(),
          }
        : task
    );

    setTasks(updatedTasks);
    setDialogOpen(false);
    setEditingTask(null);
    toast.success("Task updated successfully");
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully");
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleStatusChange = (id: string, status: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    toast.success(`Task moved to "${status}"`);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onNewTask={handleNewTask} />
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <DashboardStats tasks={tasks} />
        <TaskBoard
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Task Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {editingTask ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            defaultValues={editingTask || undefined}
            isEditing={!!editingTask}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
