import useTasks from "widgets/taskList/model/useTasks";
import TaskCard from "entities/task/ui/TaskCard";
import FilterButton from "shared/filter/ui/FilterButton";

export default function TaskList() {
    const [tasks, onTaskClick, filter, setFilter, removeTask] = useTasks([
        {id: "1", title: "First", completed: false},
        {id: "2", title: "Second", completed: true},
        {id: "3", title: "Third", completed: false},
    ]);

    return (
        <>
            <div>
                <FilterButton filter={filter} onSetFilter={setFilter}/>
            </div>
            {tasks.map(t => <div>
                <TaskCard task={t} onTaskClick={onTaskClick} key={t.id}/>
                <button onClick={() => removeTask(t.id)}>Удалить</button>
            </div>)}
        </>
    );
}