import { type FC, useActionState, useEffectEvent, useState } from 'react';
import { toast } from 'react-toastify';

type FormState = {
    field1: string;
    field2: string;
}

export const ActionStateWithReducer: FC = () => {
    const [dirty, setDirty] = useState(false);
    const stateReducer = useEffectEvent(async (_: FormState, data: FormData) => {
        const field1 = data.get('field1') as string;
        const field2 = data.get('field2') as string;
        toast(`Send fields: ${field1}, ${field2}`);
        return new Promise<FormState>((resolve) => {
            setTimeout(() => {
                setDirty(false);
                resolve({
                    field1: '',
                    field2: '',
                });
            }, 1000);
        });
    });
    const [_, formAction, isPending] = useActionState(stateReducer, {
        field1: '',
        field2: '',
    });

    return (
        <div>
            <header>Form state: {isPending ? 'submitting...' : dirty ? 'dirty' : 'success'}</header>
            <form action={formAction} onChange={() => setDirty(true)}>
                <div>
                    <label>
                        <span>field1: </span>
                        <input type="text" name="field1" />
                    </label>
                </div>
                <div>
                    <label>
                        <span>field2: </span>
                        <input type="text" name="field2" />
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};