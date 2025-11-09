import { useActionState, useEffectEvent, useOptimistic } from 'react';

type Todo = {
    description: string;
    id: string;
    isSaved: boolean;
}

type FormState = {
    todos: Todo[];
}

async function updateState(prevState: FormState, data: FormData): Promise<FormState> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                todos: [
                    {
                        description: data.get('input') as string,
                        id: crypto.randomUUID(),
                        isSaved: true,
                    },
                    ...prevState.todos,
                ],
            });
        }, 1000);
    });
}

function updateOptimisticState(prevState: FormState, data: FormData): FormState {
    return {
        todos: [
            {
                description: data.get('input') as string,
                id: crypto.randomUUID(),
                isSaved: false,
            },
            ...prevState.todos,
        ],
    };
}

export function TodoListOptimistic() {
    const [state, actionStateAction, isPending] = useActionState<FormState, FormData>(
        updateState,
        {
            todos: [],
        });
    const [optimisticState, addOptimistic] = useOptimistic(state, updateOptimisticState);
    const formAction = useEffectEvent((payload: FormData) => {
        addOptimistic(payload);
        actionStateAction(payload);
    });

    return (
        <div>
            <form action={formAction}>
                <input type="text" name="input" />
                <span> </span>
                <button type="submit">Submit</button>
            </form>
            <ul>
                {optimisticState.todos.map(t => <li
                    key={t.id}>{t.description} (saved: {t.isSaved ? 'yes' : isPending ? 'saving...' : 'no'})</li>)}
            </ul>
        </div>
    );
}