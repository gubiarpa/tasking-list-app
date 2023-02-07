import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { getNewId, isValidTaskDescription } from "../helpers/task.helper";
import TaskItem from "./TaskItem";
import TaskNew from "./TaskNew";

export type Task = {
	id: number;
	description: string;
	done: boolean;
};

export const TaskList = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	const handleAddTask = (newTaskDescription: string) => {
		const id = getNewId(tasks);
		const task: Task = {
			id,
			description: newTaskDescription.trim(),
			done: false,
		};
		setTasks([...tasks, task]);
	};

	const handleRemoveTask = ({ id }: Task) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const handleToggleTask = ({ id }: Task) => {
		setTasks(
			tasks.map(
				(task: Task): Task =>
					task.id === id ? { ...task, done: !task.done } : task
			)
		);
	};

	return (
		<Container className="mt-5 col-lg-7">
			<TaskNew
				handleAdd={(newTaskDescription: string) =>
					handleAddTask(newTaskDescription)
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
					{tasks.map((task: Task, index: number) => (
						<TaskItem
							key={index}
							task={task}
							handleToggle={() => handleToggleTask(task)}
							handleRemove={() => handleRemoveTask(task)}
						/>
					))}
				</tbody>
			</Table>
		</Container>
	);
};
