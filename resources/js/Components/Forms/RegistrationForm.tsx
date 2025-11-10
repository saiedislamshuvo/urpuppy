import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Button from '@/Components/ui/Button';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

type RegistrationRole = 'buyer' | 'seller' | 'breeder';

interface RegistrationFormProps {
    role: RegistrationRole;
    title: string;
    description: string;
}

const roleConfig = {
    buyer: {
        title: 'Buyer Registration',
        description: 'Explore the best dog breeds! Signup to discover more.',
        endpoint: '/register/buyer',
    },
    seller: {
        title: 'Seller Registration',
        description: 'Explore the best dog breeds! Signup to discover more.',
        endpoint: '/register/seller',
    },
    breeder: {
        title: 'Breeder Registration',
        description: 'Become a Part of Our Breeding Community – List Your Business!',
        endpoint: '/register/breeder',
    },
};

export default function RegistrationForm({ role, title, description }: RegistrationFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        email_confirmation: '',
        password: '',
        password_confirmation: '',
    });

    const [loading, setLoading] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (role === 'seller') {
            setLoading(true);
        }

        post(roleConfig[role].endpoint, {
            onFinish: () => {
                reset('password', 'password_confirmation');
                if (role === 'seller') {
                    setLoading(false);
                }
            },
            onSuccess: () => {
                if (role === 'seller') {
                    setLoading(false);
                }
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="row">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="First Name" />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                        {errors.first_name && <InputError message={errors.first_name} />}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="Last Name" />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            autoComplete="last_name"
                            isFocused={true}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        {errors.last_name && <InputError message={errors.last_name} />}
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    name="email"
                    value={data.email}
                    type="email"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />

                {errors.email && <InputError message={errors.email} />}
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="email_confirmation" value="Confirm Email" />

                <TextInput
                    id="email_confirmation"
                    type="email"
                    name="email_confirmation"
                    value={data.email_confirmation}
                    autoComplete="email_confirmation"
                    isFocused={true}
                    onChange={(e) => setData('email_confirmation', e.target.value)}
                    required
                />
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            name="password"
                            value={data.password}
                            type="password"
                            autoComplete="password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <InputError message={errors.password} />}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            type="password"
                            autoComplete="password_confirmation"
                            isFocused={true}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <p className="mb-4">
                By signing up for a urpuppy account, you confirm that you have read, understand and
                agreed{' '}
                <Link
                    aria-label="Terms of Service"
                    className="text-decoration-underline fw-semibold"
                    href="/terms-of-use"
                >
                    Terms of Service
                </Link>
            </p>
            <Button
                disabled={processing}
                loading={role === 'seller' ? loading : undefined}
                size="full"
                href=""
                type="button"
            >
                Signup
            </Button>

            <div className="d-flex align-items-center">
                <p className="fs-4 mb-0">I already have an account?</p>
                <Link
                    aria-label="Login"
                    className="text-dark fw-semibold text-decoration-underline ms-2"
                    href="/login"
                >
                    Login
                </Link>
            </div>
        </form>
    );
}

