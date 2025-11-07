import DashboardLayout from '@/Layouts/DashboardLayout';
import { PageProps } from '@/types';
import Avatar from '@/Components/Avatar';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AlertDismissible from '@/Components/AlertDismissible';

export default function Dashboard({
    user,
    statistics,
    next_steps,
}: PageProps<{
    user: {
        initial_name: string;
        name: string;
        email: string;
        avatar: string;
        is_seller?: boolean;
        is_breeder?: boolean;
    };
    statistics: {
        total_puppies: number;
        published_puppies: number;
        pending_puppies: number;
        expired_puppies: number;
    };
    next_steps?: Array<{
        key: string;
        title: string;
        message: string;
        action_url: string | null;
        completed: boolean;
        priority: number;
        status?: string;
        type?: string;
    }>;
}>) {
    // Filter incomplete steps
    const incompleteSteps = next_steps?.filter(step => !step.completed) || [];
    const hasIncompleteSteps = incompleteSteps.length > 0;

    return (
        <DashboardLayout activeTab="Dashboard" metaTitle="Dashboard">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mb-md-5">Dashboard</h2>
                </div>
            </div>

            {/* Display all incomplete steps */}
            {hasIncompleteSteps && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="alert alert-warning" role="alert">
                            <h5 className="alert-heading mb-3">Complete Your Setup to Start Listing</h5>
                            <p className="mb-3">Please complete the following steps before creating your first listing:</p>
                            <div className="d-flex flex-column gap-2">
                                {incompleteSteps.map((step) => {
                                    // Handle approval status steps with AlertDismissible
                                    if (step.key === 'wait_approval' || step.key === 'request_rejected' || step.key === 'approval_completed') {
                                        const variant = step.type === 'error' ? 'danger' : step.type === 'success' ? 'success' : 'primary';
                                        return (
                                            <div key={step.key} className="mb-2">
                                                <AlertDismissible
                                                    variant={variant}
                                                    heading={step.title}
                                                    message={
                                                        <p>
                                                            {step.message}
                                                            {step.action_url && (
                                                                <>
                                                                    <br />
                                                                    <Link
                                                                        aria-label={step.title}
                                                                        method="post"
                                                                        className="border-0 bg-transparent text-primary text-decoration-underline"
                                                                        href={step.action_url}
                                                                    >
                                                                        Request Again
                                                                    </Link>
                                                                </>
                                                            )}
                                                        </p>
                                                    }
                                                />
                                            </div>
                                        );
                                    }

                                    // Handle regular action steps
                                    return (
                                        <div key={step.key} className="d-flex flex-column flex-md-row align-items-md-center justify-content-between p-3 border border-primary rounded">
                                            <div>
                                                <span className="fw-semibold d-block mb-1">{step.title}</span>
                                                <span className="text-muted small">{step.message}</span>
                                            </div>
                                            {step.action_url && (
                                                <Link
                                                    href={step.action_url}
                                                    className="btn btn-sm btn-primary mt-3 mt-md-0"
                                                >
                                                    {step.key === 'verify_email' ? 'Verify Now' :
                                                        step.key === 'complete_profile' ? 'Complete Now' :
                                                            step.key === 'purchase_plan' ? 'View Plans' : 'Take Action'}
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="card border">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-6">
                                <Avatar image_url={user.avatar} initial_name={user.initial_name} size={'sm'} />
                                <div>
                                    <h6 className="mb-0">{user.name}</h6>
                                    <p className="mb-0 fs-2 d-flex align-items-center gap-2">
                                        <img src="/images/svgs/icon-mail-dark.svg" alt="urpuppy-img" width="14" />
                                        <a rel='nofollow' className="text-muted" href="mailto:support@urpuppy.com">{user.email}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6 mb-4 mb-md-4">
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="text-muted mb-2 fs-4">Total Puppies</h5>
                            <h2 className="text-primary mb-0">{statistics.total_puppies}</h2>
                            <p className="text-muted mb-0 fs-3 mt-2">All your puppy listings</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-md-4">
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="text-muted mb-2 fs-4">Published</h5>
                            <h2 className="text-success mb-0">{statistics.published_puppies}</h2>
                            <p className="text-muted mb-0 fs-3 mt-2">Live and visible to buyers</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-md-4">
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="text-muted mb-2 fs-4">Pending</h5>
                            <h2 className="text-warning mb-0">{statistics.pending_puppies}</h2>
                            <p className="text-muted mb-0 fs-3 mt-2">Drafts awaiting publication</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-md-4">
                    <div className="card border h-100">
                        <div className="card-body">
                            <h5 className="text-muted mb-2 fs-4">Expired</h5>
                            <h2 className="text-danger mb-0">{statistics.expired_puppies}</h2>
                            <p className="text-muted mb-0 fs-3 mt-2">Listings older than 6 months</p>
                        </div>
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
}
