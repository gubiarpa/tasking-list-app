import { descriptionType, Task } from "../models/Tasks.model";

export const isValidTaskDescription = (
	description: descriptionType
): boolean => !(!description || description.length < 3);

export const getNewId = (tasks: Task[]): number =>
	tasks?.length === 0
		? 1
		: tasks
				.map((task) => task.id)
				.reduce(
					(maxId, currentId) => (maxId < currentId ? currentId : maxId),
					-Infinity
				) + 1;
