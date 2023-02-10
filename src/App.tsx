import { TaskList } from "./components/TaskList";
import { TasksProvider } from "./context/TasksProvider";

function App() {
	return (
		<>
			<TasksProvider>
				<TaskList />
			</TasksProvider>
		</>
	);
}

export default App;
