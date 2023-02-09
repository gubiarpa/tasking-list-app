import { useReducer } from "react";
import { Container, Table } from "react-bootstrap";
import { getNewId } from "../helpers/task.helper";
import TaskItem from "./TaskItem";
import TaskNew from "./TaskNew";

type idType = number;
type descriptionType = string;

export type Task = {
	id: idType;
	description: descriptionType;
	done: boolean;
};

type TaskState = {
	tasks: Task[];
};

type TasksAction =
	| { type: "addTask"; payload: descriptionType }
	| { type: "toggleTask"; payload: idType }
	| { type: "removeTask"; payload: idType };

const reducer = (state: TaskState, action: TasksAction): TaskState => {
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

export const TaskList = () => {
	const initState: TaskState = { tasks: [] };

	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<Container className="mt-5 col-lg-7">
			<TaskNew
				handleAdd={(newTaskDescription: string) =>
					dispatch({
						type: "addTask",
						payload: newTaskDescription,
					})
				}
			/>
			<Table bordered hover className="mt-4">
				<thead>
					<tr>
						<th className="col-8 col-md-10">Task</th>
						<th className="col-4 col-md-2 text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{state.tasks.map((task: Task, index: number) => (
						<TaskItem
							key={index}
							task={task}
							handleToggle={() =>
								dispatch({
									type: "toggleTask",
									payload: task.id,
								})
							}
							handleRemove={() =>
								dispatch({
									type: "removeTask",
									payload: task.id,
								})
							}
						/>
					))}
				</tbody>
			</Table>
		</Container>
	);
};
