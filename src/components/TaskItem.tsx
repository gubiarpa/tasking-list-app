import { BsFillTrashFill } from "react-icons/bs";
import { Task } from "./TaskList";

type TaskItemProps = {
	task: Task;
	handleToggle: () => void;
	handleRemove: () => void;
};

const TaskItem = ({ task, handleToggle, handleRemove }: TaskItemProps) => {
	return (
		<tr>
			<td
				className={`${task.done ? "text-decoration-line-through" : ""}`}
				onClick={() => handleToggle()}
			>
				{task.description}
			</td>
			<td className="text-center">
				<BsFillTrashFill
					cursor={"pointer"}
					className="mx-1"
					title="Eliminar"
					onClick={() => handleRemove()}
				/>
			</td>
		</tr>
	);
};

export default TaskItem;
