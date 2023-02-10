import { useReducer } from "react";
import { descriptionType, TasksState } from "../models/Tasks.model";
import { TasksContext } from "./TasksContext";
import { tasksReducer } from "./tasksReducer";

const INITIAL_STATE: TasksState = {
	tasks: [],
};

interface TasksProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
	const [tasksState, dispatch] = useReducer(tasksReducer, INITIAL_STATE);

	const addTask = (description: descriptionType) =>
		dispatch({
			type: "addTask",
			payload: description,
		});

	const toogleTask = (id: number) =>
		dispatch({
			type: "toggleTask",
			payload: id,
		});

	const removeTask = (id: number) =>
		dispatch({
			type: "removeTask",
			payload: id,
		});

	return (
		<TasksContext.Provider
			value={{ tasksState, addTask, toogleTask, removeTask }}
		>
			{children}
		</TasksContext.Provider>
	);
};
