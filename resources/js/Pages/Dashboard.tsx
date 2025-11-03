import DashboardLayout from '@/Layouts/DashboardLayout';
import { PageProps } from '@/types';
import Avatar from '@/Components/Avatar';

export default function Dashboard({
    user,
    statistics,
}: PageProps<{
    user: {
        initial_name: string;
        name: string;
        email: string;
        avatar: string;
    };
    statistics: {
        total_puppies: number;
        published_puppies: number;
        pending_puppies: number;
        expired_puppies: number;
    };
}>) {
    return (
        <DashboardLayout activeTab="Dashboard" metaTitle="Dashboard">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mb-md-5">Dashboard</h2>
                </div>
            </div>
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
