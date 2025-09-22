import {Task} from 'entities/task/model/types';
import {useState} from 'react';

export type Filter = 'all' | 'completed' | 'incomplete';

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
    const removeTask: (id: string) => void = () => {
    };
    return [tasks, handleTaskClick, filter, setFilter, removeTask];
}