import useTasks from "features/taskList/model/useTasks";
import TaskCard from "entities/task/ui/TaskCard";

export default function TaskList() {
    const [tasks, onTaskClick, filter, setFilter, removeTask] = useTasks([
        {id: "1", title: "First", completed: false},
        {id: "2", title: "Second", completed: true},
        {id: "3", title: "Third", completed: false},
    ]);

    return (
        <>
            {tasks.map(t => <TaskCard task={t} onTaskClick={onTaskClick} key={t.id} />)}
        </>
    );
}