import { useActionState } from 'react';

type FormState = {
    input: string
}

const initialFormState: FormState = { input: '' };

async function save(_: FormState, formData: FormData) {
    return new Promise<FormState>((resolve) => {
        setTimeout(() => {
            resolve({input: formData.get('input') as string});
        }, 1000);
    });
}

export function FormWithAsyncSave() {
    const [state, formAction, isPending] = useActionState<FormState, FormData>(save, initialFormState);
    return <>
        <form action={formAction}>
            <input name="input" type="text" defaultValue={state.input}/>
            <span> </span>
            <button type="submit">{isPending ? `Saving...` : 'Save'}</button>
            <br/>
            <span>status: {!isPending && !state.input ? 'idle' : isPending ? 'saving' : 'success'}</span>
        </form>
    </>;
}