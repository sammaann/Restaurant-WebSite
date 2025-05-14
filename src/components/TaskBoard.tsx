
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "./TaskList";
import { Task } from "@/types/task";

interface TaskBoardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}) => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Tabs
      defaultValue="all"
      className="w-full"
      onValueChange={(value) => setActiveTab(value)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="todo">To Do</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="all" className="mt-0">
        <TaskList
          tasks={tasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      </TabsContent>

      <TabsContent value="todo" className="mt-0">
        <TaskList
          tasks={tasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          filterStatus="To Do"
        />
      </TabsContent>

      <TabsContent value="in-progress" className="mt-0">
        <TaskList
          tasks={tasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          filterStatus="In Progress"
        />
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <TaskList
          tasks={tasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          filterStatus="Completed"
        />
      </TabsContent>
    </Tabs>
  );
};

export default TaskBoard;
