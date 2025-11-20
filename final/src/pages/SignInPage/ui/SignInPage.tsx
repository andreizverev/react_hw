import { SignInForm } from 'widgets/SignInForm/index';
import { WithProtection } from 'features/Protection/model/WithProtection';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
