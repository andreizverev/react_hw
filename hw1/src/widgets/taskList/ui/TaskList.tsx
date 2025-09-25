import useTasks from "widgets/taskList/model/useTasks";
import TaskCard from "entities/task/ui/TaskCard";
import FilterButton from "shared/filter/ui/FilterButton";

export default function TaskList() {
    const useTasksModel = useTasks([
        {id: "1", title: "First", completed: false},
        {id: "2", title: "Second", completed: true},
        {id: "3", title: "Third", completed: false},
    ]);

    return (
        <>
            <div>
                <FilterButton filter={useTasksModel.filter} onSetFilter={useTasksModel.setFilter}/>
            </div>
            {useTasksModel.tasks.map(t =>
                <div key={t.id}>
                    <TaskCard task={t} onTaskClick={useTasksModel.onTaskClick}/>
                    <button onClick={() => useTasksModel.onRemoveTask(t.id)}>Удалить</button>
                </div>)}
        </>
    );
}