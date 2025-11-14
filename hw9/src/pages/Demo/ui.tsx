import { DelayedButton } from '@/features/react19Examples/DelayedButton';
import { FormWithAsyncSave } from '@/features/react19Examples/FormWithAsyncSave';
import { TodoListOptimistic } from '@/features/react19Examples/TodoListOptimistic';
import { ActionStateWithReducer } from '@/features/react19Examples/ActionStateWithReducer';

export function DemoPage() {
    return <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <header>This is demo page</header>
        <section>
            <header>DelayedButton</header>
            <DelayedButton>Delayed button</DelayedButton>
        </section>
        <section>
            <header>FormWithAsyncSave</header>
            <FormWithAsyncSave />
        </section>
        <section>
            <header>TodoListOptimistic</header>
            <TodoListOptimistic />
        </section>
        <section>
            <header>ActionStateWithReducer</header>
            <ActionStateWithReducer />
        </section>
    </div>;
}