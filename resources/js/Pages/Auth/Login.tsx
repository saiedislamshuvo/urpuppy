import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import PuppyCard from '@/Components/Puppy/Card';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';

export default function Login({
  status,
  canResetPassword,
  puppy,
  recaptchaSiteKey
}: {
  status?: string;
  canResetPassword: boolean;
  puppy: App.Data.PuppyData;
  recaptchaSiteKey?: string;
}) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { data, setData, post, processing, errors, reset } = useForm<
    {
      email: string;
      password: string;
      remember: boolean;
      'g-recaptcha-response': string;
    }
  >({
    email: '',
    password: '',
    remember: false,
    'g-recaptcha-response': '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (recaptchaSiteKey && !data['g-recaptcha-response']) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    post("/login", {
      onFinish: () => {
        reset('password');
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      },
      onError: () => {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      },
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
      <Head title="Log in" />
      <div
        className="page-wrapper login-bg position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card position-relative overflow-hidden">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-7 order-last order-lg-first">
                <div className="login-info d-flex flex-column justify-content-center h-100 py-7 py-lg-0 px-3 ps-lg-0">
                  <h1>Let's Login</h1>
                  <p className="mb-4 pb-2">Explore the best dog breeds! Log in now
                    to discover more.</p>
                  <form onSubmit={submit}>
                    <div className="mb-3 pb-1">
                      <InputLabel htmlFor="email" value="Email" />
                      <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pb-1">
                      <InputLabel htmlFor="password" value="Password" />
                      <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                      />

                    </div>

                    {errors.email && <InputError message={errors.email} className="mt-2" />}
                    {errors.password && <InputError message={errors.password} className="mt-2" />}
                    {errors['g-recaptcha-response'] && <InputError message={errors['g-recaptcha-response']} className="mt-2" />}

                    {recaptchaSiteKey && (
                      <div className="mb-3">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={recaptchaSiteKey}
                          onChange={(value) => setData('g-recaptcha-response', value || '')}
                        />
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-between mb-4 pb-2">
                      <div className="form-check">
                        <Checkbox
                          name="remember"
                          className="form-check-input primary"
                          checked={data.remember}
                          onChange={(e) =>
                            setData('remember', e.target.checked)
                          }
                        />

                        <label className="form-check-label text-dark fs-3" >
                          Remember me
                        </label>


                      </div>

                      {canResetPassword && (
                        <Link
                          aria-label="Forgot Password"
                          href="/forgot-password"
                          className="text-dark fs-3 fw-semibold text-decoration-underline"
                        >
                          Forgot your password?
                        </Link>
                      )}
                    </div>
                    <PrimaryButton
                      type="submit"
                      className="btn btn-primary w-100 mb-3"
                      disabled={processing}
                    >
                      {processing ? 'Logging in...' : 'Login'}
                    </PrimaryButton>
                    <div className="d-flex align-items-center">
                      <p className="fs-4 mb-0">I don’t have an account?</p>
                      <Link aria-label="Create Account" className="text-dark fw-semibold text-decoration-underline ms-2" href="/register">Create Account</Link>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 order-first order-lg-last">
                <div
                  className="login-right-bg position-relative overflow-hidden h-100 d-flex align-items-center justify-content-center p-4 pt-10 py-lg-10">
                  <div className="p-4 pb-0 position-absolute top-0 end-0">
                    <Link aria-label="Home" prefetch cacheFor="5m" href="/"><img src="/images/logos/logo-white.svg" alt="logo" /></Link>
                  </div>
                  <div className="card login-right-card mb-0">
                    <div className="card-body">

                      <PuppyCard className="puppy-spotlight-item rounded-1 overflow-hidden" puppy={puppy} />

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