import { Task } from "../components/TaskList";

export const isValidTaskDescription = (taskDescription: string): boolean =>
	!(!taskDescription || taskDescription.length < 3);

export const getNewId = (tasks: Task[]): number =>
	tasks?.length === 0
		? 1
		: tasks
				.map((task) => task.id)
				.reduce(
					(maxId, currentId) => (maxId < currentId ? currentId : maxId),
					-Infinity
				) + 1;
