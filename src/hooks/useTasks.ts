import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export const useTasks = () => {
  const { tasksState, addTask, toogleTask, removeTask } =
    useContext(TasksContext);
  const { tasks } = tasksState;

  return {
    tasks,
    addTask,
    toogleTask,
    removeTask,
  };
};
