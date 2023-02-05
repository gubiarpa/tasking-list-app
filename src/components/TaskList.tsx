import { useState, ChangeEvent } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

type Task = {
	id: number;
	description: string;
	done: boolean;
};

export const TaskList = () => {
	const [newTask, setNewTask] = useState<string>("");
	const [tasks, setTasks] = useState<Task[]>([]);

	const handleChangeNewTask = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTask(e.target.value);
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const id =
			tasks?.length === 0
				? 1
				: tasks
						.map((task) => task.id)
						.reduce(
							(maxId, currentId) => (maxId < currentId ? currentId : maxId),
							-Infinity
						) + 1;
		const task: Task = { id, description: newTask.trim(), done: false };
		setTasks([...tasks, task]);
		setNewTask("");
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
			<Form onSubmit={handleSubmitForm}>
				<Form.Group className={"mb-3"}>
					<Form.Label>New Task</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter new task"
						value={newTask}
						onChange={handleChangeNewTask}
					/>
					<Form.Text className="text-muted">Try to type a new task</Form.Text>
				</Form.Group>
			</Form>
			<Table bordered hover className="mt-4">
				<thead>
					<tr>
						<th className="col-8 col-md-10">Task</th>
						<th className="col-4 col-md-2 text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task: Task, index: number) => (
						<tr key={index}>
							<td
								className={`${task.done ? "text-decoration-line-through" : ""}`}
								onClick={() => handleToggleTask(task)}
							>
								{task.description}
							</td>
							<td className="text-center">
								<BsFillTrashFill
									className="mx-1"
									title="Eliminar"
									onClick={() => handleRemoveTask(task)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};
