import { useState, ChangeEvent } from "react";
import { Container, Form, Row, Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

type Task = {
	id: number;
	description: string;
};

function App() {
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
		setTasks([...tasks, { id, description: newTask.trim() } as Task]);
		setNewTask("");
	};

	const handleRemoveTask = ({ id }: Task) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<Container>
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
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Task</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task: Task, index: number) => (
						<tr key={index}>
							<td>{task.description}</td>
							<td>
								<BsFillTrashFill
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
}

export default App;
