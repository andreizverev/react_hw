import {useCallback, useEffect, useMemo, useState} from 'react';
import {useGetTasksQuery} from "entities/task/api/tasksApi";
import {Task} from 'entities/task/model/types';
import type {Filter} from "shared/filter/model/types";

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

interface UseTasks {
    tasks: Task[],
    onTaskClick: (id: string) => void;
    filter: Filter;
    setFilter: (filter: Filter) => void;
    onRemoveTask: (id: string) => void;
}

export default function useTasks(): UseTasks {
    const {data: remoteTasks} = useGetTasksQuery();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>('all');
    const filteredTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);

    useEffect(() => {
        if (remoteTasks) {
            setTasks(remoteTasks);
        }
    }, [remoteTasks]);

    const handleTaskClick = useCallback((id: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id !== id) {
                return t;
            } else {
                return {...t, completed: !t.completed};
            }
        }));
    }, []);
    const removeTask = useCallback((id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id))
    }, []);
    return {
        tasks: filteredTasks,
        onTaskClick: handleTaskClick,
        filter: filter,
        setFilter: setFilter,
        onRemoveTask: removeTask
    };
}