'use client';
import { AppDispatch } from '@/store/store';
import { FormData } from './types';
import { registerFormControls } from '@/components/common/form/formConfig';
import { SIGNIN_URL } from '@/constants';
import { signUpUser } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import CommonForm from '@/components/common/form/form';
import Link from 'next/link';

const initialState: FormData = {
	email: '',
	password: '',
	userName: '',
};

function SignUp() {
	const [formData, setFormData] = useState<FormData>(initialState);
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { toast } = useToast();

	function onSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		dispatch(signUpUser(formData)).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: data?.payload?.message,
				});
				router.push(SIGNIN_URL);
			} else {
				toast({
					title: data?.payload?.message,
					variant: 'destructive',
				});
			}
		});
	}

	return (
		<div className="mx-auto w-full max-w-md space-y-6">
			<div className="text-center">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">
					Create new account
				</h1>
				<p className="mt-2">
					Already have an account
					<Link
						className="font-medium ml-2 text-primary hover:underline"
						href={SIGNIN_URL}
					>
						Sign In
					</Link>
				</p>
			</div>
			<CommonForm
				buttonText="Sign Up"
				formControls={registerFormControls}
				formData={formData}
				onSubmit={onSubmit}
				setFormData={setFormData}
			/>
		</div>
	);
}

export default SignUp;
