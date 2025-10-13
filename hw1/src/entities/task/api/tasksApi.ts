import {baseApi} from "shared/api/baseApi";
import type {Task} from "../model/types";

type ApiTask = {
    id: string,
    todo: string,
    completed: boolean,
    userId: number
}

baseApi.enhanceEndpoints({addTagTypes: ["Tasks"]});
export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => 'todos',
            transformResponse: (response: { todos: ApiTask[] }) => response.todos.map(t => ({
                id: t.id,
                title: t.todo,
                completed: t.completed,
            })),
        })
    })
});

export const {useGetTasksQuery} = tasksApi;