
import React from "react";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: string) => void;
  filterStatus?: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
  filterStatus,
}) => {
  // Filter tasks if filterStatus is provided
  const filteredTasks = filterStatus
    ? tasks.filter((task) => task.status === filterStatus)
    : tasks;
    
  // Create a handler to convert from (task: Task) to (id: string)
  const handleDeleteTask = (task: Task) => {
    onDelete(task.id);
  };

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tasks found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
