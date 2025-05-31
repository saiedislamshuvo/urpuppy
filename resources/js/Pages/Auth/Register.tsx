import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import PuppyCard from '@/Components/Puppy/Card';
import TextInput from '@/Components/TextInput';
import Button from '@/Components/ui/Button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Register({puppy}: {
    puppy: App.Data.PuppyData
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        email_confirmation: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/register/buyer', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const { flash }: any = usePage().props;

    useEffect(() => {
        if (flash?.message?.success) {

            toast.success(flash.message.success,
                {
                    duration: 3000
                });
        }
    }, [flash]);

    useEffect(() => {
        if (flash?.message?.error) {
            toast.error(flash.message.error, {
                duration: 3000
            });
        }
    }, [flash]);

    return (
        <>
            <Head title="Register" />
              <div
    className="page-wrapper login-bg position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center">
    <div className="card position-relative overflow-hidden">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-7 order-last order-lg-first">
            <div className="login-info d-flex flex-column justify-content-center h-100 py-5 px-3 ps-lg-0">
              <h1>Buyer Registration</h1>
              <p className="mb-4 pb-2">Explore the best dog breeds! Signup
                to discover more.</p>
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
                                            {
                        errors.first_name &&
                    <InputError message={errors.first_name} />
                                            }

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
                                            {
                        errors.last_name &&
                    <InputError message={errors.last_name} />
                                            }
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

                                            {
                        errors.email &&
                    <InputError message={errors.email} />
                                            }
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
                                            {
                        errors.password &&
                    <InputError message={errors.password} />
                                            }

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
                <p className="mb-4">By signing up for a urpuppy account, you confirm that you have read, understand and
                  agreed <Link aria-label='Terms of Service' className="text-decoration-underline fw-semibold" href="/terms-of-use">Terms of Service</Link></p>
                <Button disabled={processing} size="full" href="" type="button" >Signup</Button>

                <div className="d-flex align-items-center">
                  <p className="fs-4 mb-0">I already have an account?</p>
                  <Link aria-label='Login' className="text-dark fw-semibold text-decoration-underline ms-2" href="/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 order-first order-lg-last">
            <div
              className="login-right-bg signup-right-bg position-relative overflow-hidden h-100 d-flex align-items-center justify-content-center p-4 p-lg-5 pt-9">
              <div className="p-4 pb-0 position-absolute top-0 end-0">
                <Link aria-label='Home' href="/"><img src="/images/logos/logo-white.svg" alt="logo-white" /></Link>
              </div>
              <div className="card login-right-card mb-0">
                <div className="card-body">
                    <PuppyCard key={puppy?.id} puppy={puppy} className="puppy-spotlight-item rounded-1 overflow-hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




                </>
    );
}
