import { SignUpForm } from 'widgets/SignUpForm';
import { WithProtection } from 'features/Protection/model/WithProtection';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
