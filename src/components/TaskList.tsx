import { useReducer } from "react";
import { Container, Table } from "react-bootstrap";
import { getNewId } from "../helpers/task.helper";
import TaskItem from "./TaskItem";
import TaskNew from "./TaskNew";

export type Task = {
	id: number;
	description: string;
	done: boolean;
};

export const TaskList = () => {
	const initState: Task[] = [];

	const enum REDUCER_ACTION_TYPE {
		NEW_TASK,
		TOOGLE_TASK,
		REMOVE_TASK,
	}

	type ReducerAction = {
		type: REDUCER_ACTION_TYPE;
		payload?: Task;
	};

	const reducer = (state: Task[], action: ReducerAction): Task[] => {
		switch (action.type) {
			case REDUCER_ACTION_TYPE.NEW_TASK:
				return [
					...state,
					{
						id: getNewId(state),
						description: action.payload?.description!,
						done: false,
					},
				];
			case REDUCER_ACTION_TYPE.TOOGLE_TASK:
				return state.map(
					(task: Task): Task =>
						task.id === action.payload?.id
							? { ...task, done: !task.done }
							: task
				);
			case REDUCER_ACTION_TYPE.REMOVE_TASK:
				return state.filter((task) => task.id !== action.payload?.id);
			default:
				throw new Error();
		}
	};

	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<Container className="mt-5 col-lg-7">
			<TaskNew
				handleAdd={(newTaskDescription: string) =>
					dispatch({
						type: REDUCER_ACTION_TYPE.NEW_TASK,
						payload: { id: 0, description: newTaskDescription, done: false },
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
					{state.map((task: Task, index: number) => (
						<TaskItem
							key={index}
							task={task}
							handleToggle={() =>
								dispatch({
									type: REDUCER_ACTION_TYPE.TOOGLE_TASK,
									payload: task,
								})
							}
							handleRemove={() =>
								dispatch({
									type: REDUCER_ACTION_TYPE.REMOVE_TASK,
									payload: task,
								})
							}
						/>
					))}
				</tbody>
			</Table>
		</Container>
	);
};
