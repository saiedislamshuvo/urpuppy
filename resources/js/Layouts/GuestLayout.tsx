import ApplicationLogo from '@/Components/ApplicationLogo';
import PuppyCard from '@/Components/Puppy/Card';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Guest({ variant = 'primary', children, puppy, header = "", subHeader = "" }: PropsWithChildren <{variant?: 'primary' | 'secondary', puppy?: App.Data.PuppyCardData  , header?: string, subHeader?: string }>) {

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
              <div
    className="page-wrapper login-bg position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center">
    <div className="card position-relative overflow-hidden">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-7 order-last order-lg-first">
            <div className="login-info d-flex flex-column justify-content-center h-100 py-7 py-lg-0 px-3 ps-lg-0">
            {header !== "" &&
              <h2>{header}</h2>
}
              {subHeader != "" &&
              <p className="mb-4 pb-2">{subHeader}</p>
}
                                    {children}
            </div>
          </div>
          <div className="col-lg-5 order-first order-lg-last">
            <div
              className={`login-right-bg ${variant == 'secondary' ? 'signup-right-bg' :  '' } position-relative overflow-hidden h-100 d-flex align-items-center justify-content-center p-4 pt-10 py-lg-10`}>
              <div className="p-4 pb-0 position-absolute top-0 end-0">
                <Link aria-label="logo" prefetch cacheFor="5m" href="/"><img src="/images/logos/logo-white.svg" alt="logo-white" /></Link>
              </div>
              <div className="card login-right-card mb-0">
                <div className="card-body">
                    <PuppyCard key={puppy?.id} className="puppy-spotlight-item rounded-1 overflow-hidden" puppy={puppy} />
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
