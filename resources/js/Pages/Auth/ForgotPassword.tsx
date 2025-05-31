import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Button from '@/Components/ui/Button';
import GuestLayout from '@/Layouts/GuestLayout';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status, puppy }: { status?: string, puppy: App.Data.PuppyCardData }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/forgot-password');
        reset();
    };

    return (
        <GuestLayout puppy={puppy} header="Forgot Password" subHeader="
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            ">


            <Head title="Forgot Password" />

            <form onSubmit={submit} className="">
                <InputLabel value="Email Address" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                                placeholder="user@example.com"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <Button href="" type="button" className="btn mt-3 btn-primary w-100 mb-3">Email Password Reset Link</Button>
            </form>
                <div className="d-flex align-items-center">
                  <p className="fs-4 mb-0">I have an account?</p>
                  <Link aria-label='Login' className="text-dark fw-semibold text-decoration-underline ms-2" href="/login">Login</Link>
                </div>

</GuestLayout>
    );
}
