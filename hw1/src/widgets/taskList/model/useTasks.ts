import {useState} from 'react';
import {Task} from 'entities/task/model/types';

export type Filter = 'all' | 'completed' | 'incomplete';

function filterTasks(tasks: Task[], filter: Filter): Task[] {
    return tasks.filter(t => {
        switch (filter) {
            case 'completed':
                return t.completed;
            case 'incomplete':
                return !t.completed;
            default:
                return true;
        }
    })
}

export default function useTasks(initial: Task[]): [Task[], (id: string) => void, Filter, (f: Filter) => void, (id: string) => void] {
    const [tasks, setTasks] = useState(initial);
    const handleTaskClick = (id: string) => {
        setTasks(tasks.map(t => {
            if (t.id !== id) {
                return t;
            } else {
                return {...t, completed: !t.completed};
            }
        }));
    };
    const [filter, setFilter] = useState<Filter>('all');
    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    };
    return [filterTasks(tasks, filter), handleTaskClick, filter, setFilter, removeTask];
}