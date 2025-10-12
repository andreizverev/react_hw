export type FormState = {
    stepNumber: number;
    email: string;
};

export async function handleSubmit(state: FormState): Promise<FormState> {
    if (state.stepNumber == 2) {
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return { ...state, stepNumber: state.stepNumber + 1 };
}
