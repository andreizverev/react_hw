import { useActionState } from 'react';
import { type FormState, handleSubmit } from '@/features/SubscriptionWizardForm/model.ts';

function EmailStep() {
    return (
        <div>
            <label>
                Введите email:
                <input name="email" type="email" required={true} />
            </label>
            <button type="submit">Дальше</button>
        </div>
    );
}

function SubscriptionConfirmation() {
    return (
        <div>
            <button type="submit">Подтверждаю подписку</button>
        </div>
    );
}

function SubscriptionResult() {
    return (
        <div>
            <span>Вы подписались!</span>
        </div>
    );
}

function FormPending() {
    return (
        <div>
            <span>Подождите, пожалуйста...</span>
        </div>
    );
}

export function SubscriptionWizardForm() {
    const [formState, formAction, isPending] = useActionState<FormState>(handleSubmit, { stepNumber: 1, email: '' });
    return (
        <>
            {isPending && <FormPending />}
            {!isPending && (
                <form action={formAction}>
                    {formState.stepNumber === 1 && <EmailStep />}
                    {formState.stepNumber === 2 && <SubscriptionConfirmation />}
                    {formState.stepNumber === 3 && <SubscriptionResult />}
                </form>
            )}
        </>
    );
}
