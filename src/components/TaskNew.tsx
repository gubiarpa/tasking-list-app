import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
import { isValidTaskDescription } from "../helpers/task.helper";

type TaskNewProps = {
	handleAdd: (newTaskDescription: string) => void;
};

const TaskNew = ({ handleAdd }: TaskNewProps) => {
	const [newTask, setNewTask] = useState<string>("");
	const newTaskRef = useRef<HTMLInputElement>(null);

	const handleChangeNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTask(e.target.value);
	};

	const handleAddTask = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		if (!isValidTaskDescription(newTask)) return;
		handleAdd(newTask);
		setNewTask("");
		newTaskRef.current?.focus();
	};

	return (
		<Form onSubmit={handleAddTask}>
			<InputGroup className="mb-3">
				<Form.Control
					ref={newTaskRef}
					type="text"
					placeholder="Enter new task"
					value={newTask}
					onChange={handleChangeNewTask}
				/>
				<Button
					variant="outline-primary"
					disabled={!isValidTaskDescription(newTask)}
					id="button-addon2"
					onClick={handleAddTask}
				>
					<BsPlusCircle />
				</Button>
			</InputGroup>
		</Form>
	);
};

export default TaskNew;
