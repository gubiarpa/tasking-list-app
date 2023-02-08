import { BsCheckCircle, BsDashCircle } from "react-icons/bs";
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
				className={`${
					task.done ? "text-decoration-line-through text-muted" : ""
				}`}
				onClick={() => handleToggle()}
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
						onClick={() => handleRemove()}
					/>
				)}
			</td>
		</tr>
	);
};

export default TaskItem;
