import PrimaryButton from '@/Components/PrimaryButton';
import Button from '@/Components/ui/Button';
import GuestLayout from '@/Layouts/GuestLayout';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm, usePage, usePoll } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status, puppy }: { status?: string, puppy: App.Data.PuppyCardData }) {
    const { post, processing } = useForm({});

    const is_breeder = usePage().props?.auth?.user?.is_breeder;
    const is_seller = usePage().props?.auth?.user?.is_seller;
    const roles = [is_breeder ? 'breeder' : (is_seller ? 'seller' : 'buyer')];


    usePoll(3000, { only: ['status'] })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/email/verification-notification');
    };

    return (
        <GuestLayout header="Email Verification" puppy={puppy}>

            <Head title="Email Verification" />

            {
                roles?.includes("breeder") ? <>
                    <div className="mb-4 text-sm text-gray-600">
                        Thank you for signing up for our breeder directory. To get started, please verify your email by clicking the link in the email we just sent you.
                    </div>

                </> : roles?.includes("seller") ? <>
                    <div className="mb-4 text-sm text-gray-600">
                        Thank you for signing up for a seller account. To get started, please verify your email by clicking the link in the email we just sent you.
                    </div>

                </> :
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            Thank you for signing up for a buyer account. To get started, please verify your email by clicking the link in the email we just sent you.
                        </div>


                    </>
            }


            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 mb-2" >
                    Didn't receive it?
                </div>
                <div className=" d-flex justify-content-between">

                    <Button type="button" href="" >
                        Resend Verification Email
                    </Button>

                    <Link
                        aria-label="Log Out"
                        href={"/logout"}
                        method="post"
                        as="button"
                        className="btn btn-secondary"
                    >
                        Log Out
                    </Link>
                </div>

                <div className="my-4">
                    Need help? Contact us anytime!

                </div>
            </form>
        </GuestLayout>
    );
}
