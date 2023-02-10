import { createContext } from "react";
import { descriptionType, idType, TasksState } from "../models/Tasks.model";

export type TasksContextProps = {
	tasksState: TasksState;
	addTask: (description: descriptionType) => void;
	toogleTask: (id: idType) => void;
	removeTask: (id: idType) => void;
};

export const TasksContext = createContext<TasksContextProps>(
	{} as TasksContextProps
);
