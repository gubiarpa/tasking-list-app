import { getNewId } from "../helpers/task.helper";
import {
  descriptionType,
  idType,
  Task,
  TasksState,
} from "../models/Tasks.model";

type TasksAction =
  | { type: "addTask"; payload: descriptionType }
  | { type: "toggleTask"; payload: idType }
  | { type: "removeTask"; payload: idType };

export const tasksReducer = (
  state: TasksState,
  action: TasksAction
): TasksState => {
  switch (action.type) {
    case "addTask":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: getNewId(state.tasks),
            description: action.payload,
            done: false,
          },
        ],
      };
    case "toggleTask":
      return {
        ...state,
        tasks: state.tasks.map(
          (task: Task): Task =>
            task.id === action.payload ? { ...task, done: !task.done } : task
        ),
      };
    case "removeTask":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};
