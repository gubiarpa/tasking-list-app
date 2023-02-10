import { BsCheckCircle, BsDashCircle } from "react-icons/bs";
import { idType, Task } from "../models/Tasks.model";

type TaskItemProps = {
	task: Task;
	handleToggle: (id: idType) => void;
	handleRemove: (id: idType) => void;
};

const TaskItem = ({ task, handleToggle, handleRemove }: TaskItemProps) => {
	return (
		<tr>
			<td
				className={`${
					task.done ? "text-decoration-line-through text-muted" : ""
				}`}
				onClick={() => handleToggle(task.id)}
			>
				{task.description}
			</td>
			<td className="text-center">
				{task.done ? (
					<BsCheckCircle title={`${task.description} is done`} />
				) : (
					<BsDashCircle
						cursor={"pointer"}
						title={`Remove ${task.description}`}
						onClick={() => handleRemove(task.id)}
					/>
				)}
			</td>
		</tr>
	);
};

export default TaskItem;
