export type idType = number;
export type descriptionType = string;

export type Task = {
	id: idType;
	description: descriptionType;
	done: boolean;
};

export type TasksState = {
	tasks: Task[];
};
