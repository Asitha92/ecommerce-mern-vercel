'use client';
import { AppDispatch } from '@/store/store';
import { FormData } from './types';
import { FormEvent, useState } from 'react';
import { loginFormControls } from '@/components/common/form/formConfig';
import { signInUser } from '@/store/authSlice';
import { SIGNUP_URL } from '@/constants';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import CommonForm from '@/components/common/form/form';
import Link from 'next/link';

const initialState: FormData = {
	email: '',
	password: '',
};

function SignIn() {
	const [formData, setFormData] = useState<FormData | null>(initialState);
	const dispatch = useDispatch<AppDispatch>();
	const { toast } = useToast();

	function onSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		dispatch(signInUser(formData)).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: data?.payload?.message,
				});
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
					Sign in to your account
				</h1>
				<p className="mt-2">
					{"Don't have an account"}
					<Link
						className="font-medium ml-2 text-primary hover:underline"
						href={SIGNUP_URL}
					>
						Sign Up
					</Link>
				</p>
			</div>
			<CommonForm
				buttonText="Sign In"
				formControls={loginFormControls}
				formData={formData}
				onSubmit={onSubmit}
				setFormData={setFormData}
			/>
		</div>
	);
}

export default SignIn;
