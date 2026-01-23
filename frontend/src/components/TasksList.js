"use client";

import { useState } from "react";
import { Circle, CheckCircle2, Clock } from "lucide-react";

export default function TasksList({ tasks = [] }) {
  const defaultTasks = [
    {
      id: 1,
      title: "Review temperature sensor readings",
      description: "The team identified all of the work to be done",
      time: "Today",
      completed: false,
    },
    {
      id: 2,
      title: "Calibrate pressure sensors",
      description: "The team identified all of the work to be done",
      time: "Tomorrow",
      completed: false,
    },
    {
      id: 3,
      title: "Update risk threshold parameters",
      description: "The team identified all of the work to be done",
      time: "Yesterday",
      completed: true,
    },
    {
      id: 4,
      title: "Generate monthly report",
      description: "The team identified all of the work to be done",
      time: "10 min ago",
      completed: false,
    },
  ];

  const [taskList, setTaskList] = useState(tasks.length > 0 ? tasks : defaultTasks);

  const toggleTask = (id) => {
    setTaskList(taskList.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTimeColor = (time) => {
    if (time === "Today") return "text-primary-500 bg-primary-50";
    if (time === "Tomorrow") return "text-blue-500 bg-blue-50";
    if (time === "Yesterday") return "text-gray-500 bg-gray-100";
    return "text-gray-400 bg-gray-50";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Tasks</h2>
        <span className="text-sm text-gray-500">
          {taskList.filter(t => !t.completed).length} pending
        </span>
      </div>

      <div className="space-y-3">
        {taskList.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer ${
              task.completed ? "bg-gray-50" : "hover:bg-gray-50"
            }`}
            onClick={() => toggleTask(task.id)}
          >
            {/* Checkbox */}
            <div className="mt-0.5">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 hover:text-primary-500 transition-colors" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                task.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}>
                {task.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {task.description}
              </p>
            </div>

            {/* Time Badge */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTimeColor(task.time)}`}>
              <Clock className="w-3 h-3" />
              {task.time}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-primary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
        + Add new task
      </button>
    </div>
  );
}
