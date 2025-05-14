
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Task } from "@/types/task";

interface DashboardStatsProps {
  tasks: Task[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ tasks }) => {
  // Count tasks by status
  const tasksByStatus = {
    "To Do": tasks.filter((task) => task.status === "To Do").length,
    "In Progress": tasks.filter((task) => task.status === "In Progress").length,
    "Completed": tasks.filter((task) => task.status === "Completed").length,
  };

  // Count tasks by priority
  const tasksByPriority = {
    "Low": tasks.filter((task) => task.priority === "Low").length,
    "Medium": tasks.filter((task) => task.priority === "Medium").length,
    "High": tasks.filter((task) => task.priority === "High").length,
  };

  // Chart data
  const statusChartData = [
    { name: "To Do", value: tasksByStatus["To Do"] },
    { name: "In Progress", value: tasksByStatus["In Progress"] },
    { name: "Completed", value: tasksByStatus["Completed"] },
  ];

  const priorityChartData = [
    { name: "Low", value: tasksByPriority["Low"] },
    { name: "Medium", value: tasksByPriority["Medium"] },
    { name: "High", value: tasksByPriority["High"] },
  ];

  // Get completion percentage
  const completionPercentage =
    tasks.length > 0
      ? Math.round((tasksByStatus["Completed"] / tasks.length) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Tasks */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasks.length}</div>
        </CardContent>
      </Card>

      {/* Completion Rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionPercentage}%</div>
        </CardContent>
      </Card>

      {/* Tasks by Status */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tasks by Status</CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={statusChartData} barGap={4}>
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].name}
                            </span>
                            <span className="font-bold text-sm">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
