import PuppyCard from '@/Components/Puppy/Card';
import RegistrationForm from '@/Components/Forms/RegistrationForm';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { router } from '@inertiajs/react';

export default function Register({ puppy }: {
  puppy: App.Data.PuppyData
}) {
  const { flash }: any = usePage().props;

  useEffect(() => {
    if (flash?.message?.success) {
      toast.success(flash.message.success, {
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

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    if (role === 'buyer') {
      router.visit('/register');
    } else if (role === 'seller') {
      router.visit('/register-seller');
    } else if (role === 'breeder') {
      router.visit('/register-breeder');
    }
  };

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
                  <RegistrationForm
                    role="buyer"
                    title="Buyer Registration"
                    description="Explore the best dog breeds! Signup to discover more."
                  />
                </div>
              </div>
              <div className="col-lg-5 order-first order-lg-last">
                <div
                  className="login-right-bg signup-right-bg position-relative overflow-hidden h-100 d-flex align-items-center justify-content-center p-4 p-lg-5 pt-9">
                  <div className="p-4 pb-2 position-absolute top-0 start-0">
                    <select
                      className="form-select"
                      value="buyer"
                      onChange={handleRoleChange}
                      aria-label="Select registration type"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="breeder">Breeder</option>
                    </select>
                  </div>
                  <div className="p-4 pb-0 position-absolute top-0 end-0">
                    <Link aria-label='Home' href="/"><img src="/images/logos/logo-white.svg" alt="logo-white" /></Link>
                  </div>
                  <div className="card login-right-card mb-0 mt-3 mt-md-0">
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
