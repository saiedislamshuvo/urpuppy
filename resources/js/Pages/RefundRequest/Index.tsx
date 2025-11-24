import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import InputError from '@/Components/InputError';
import AlertDismissible from '@/Components/AlertDismissible';

interface ActiveSubscription {
    id: number;
    type: string;
    stripe_status: string;
    plan: {
        id: number;
        name: string;
        type: string;
    } | null;
}

interface RefundRequest {
    id: number;
    subscription_id: number;
    message: string;
    status: string;
    created_at: string;
    updated_at: string;
    subscription: {
        id: number;
        type: string;
        plan: {
            name: string;
        } | null;
    } | null;
}

export default function RefundRequestIndex({
    activeSubscriptions,
    refundRequests,
}: {
    activeSubscriptions: ActiveSubscription[];
    refundRequests: RefundRequest[];
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        subscription_id: '',
        message: '',
    });

    const { flash } = usePage().props as any;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/refund-request', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { class: string; label: string }> = {
            pending: { class: 'bg-warning', label: 'Pending' },
            approved: { class: 'bg-success', label: 'Approved' },
            declined: { class: 'bg-danger', label: 'Declined' },
            cancelled: { class: 'bg-info', label: 'Cancelled' },
        };

        const config = statusConfig[status] || { class: 'bg-secondary', label: status };
        return (
            <span className={`badge ${config.class}`}>
                {config.label}
            </span>
        );
    };

    const hasActiveSubscription = activeSubscriptions.length > 0;

    return (
        <DashboardLayout activeTab="Refund Request" metaTitle="Refund Request">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mb-md-5">Refund Request</h2>
                </div>
            </div>

            {/* Success Message */}
            {flash?.success && (
                <div className="row mb-4">
                    <div className="col-12">
                        <AlertDismissible
                            variant="success"
                            heading="Success"
                            message={<p>{flash.success}</p>}
                        />
                    </div>
                </div>
            )}

            {/* No Subscription Message */}
            {!hasActiveSubscription && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border">
                            <div className="card-body text-center py-5">
                                <div className="mb-4">
                                    <img
                                        src="/images/svgs/icon-card.svg"
                                        alt="No Subscription"
                                        width="120"
                                        height="120"
                                        className="text-muted"
                                    />
                                </div>
                                <h3 className="h4 mb-3">No Active Subscription</h3>
                                <p className="text-muted mb-4">
                                    You need an active subscription to request a refund. Please purchase a subscription plan first.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Refund Request Form */}
            {hasActiveSubscription && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border">
                            <div className="card-body">
                                <h5 className="mb-4 fs-5">Submit Refund Request</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label htmlFor="subscription_id" className="form-label">
                                                Select Subscription <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="subscription_id"
                                                className={`form-select ${errors.subscription_id ? 'is-invalid' : ''}`}
                                                value={data.subscription_id}
                                                onChange={(e) => setData('subscription_id', e.target.value)}
                                                required
                                            >
                                                <option value="">Choose a subscription...</option>
                                                {activeSubscriptions.map((subscription) => (
                                                    <option key={subscription.id} value={subscription.id}>
                                                        {subscription.plan?.name || `Subscription #${subscription.id}`}
                                                        {' '}({subscription.type}) - {subscription.stripe_status}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.subscription_id && (
                                                <InputError message={errors.subscription_id} />
                                            )}
                                        </div>

                                        <div className="col-12 mb-3">
                                            <label htmlFor="message" className="form-label">
                                                Refund Reason <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                className={`form-control rounded ${errors.message ? 'is-invalid' : ''}`}
                                                rows={5}
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                placeholder="Please provide a detailed reason for your refund request (minimum 10 characters)..."
                                                required
                                                minLength={10}
                                                maxLength={1000}
                                            />
                                            <div className="form-text">
                                                {data.message.length}/1000 characters
                                            </div>
                                            {errors.message && (
                                                <InputError message={errors.message} />
                                            )}
                                        </div>

                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={processing || !data.subscription_id || !data.message.trim() || data.message.length < 10}
                                            >
                                                {processing ? 'Submitting...' : 'Submit Refund Request'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Existing Refund Requests */}
            {refundRequests.length > 0 && (
                <div className="row">
                    <div className="col-12">
                        <div className="card border">
                            <div className="card-body">
                                <h5 className="mb-4 fs-5">Your Refund Requests</h5>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Request ID</th>
                                                <th>Subscription</th>
                                                <th>Status</th>
                                                <th>Requested At</th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {refundRequests.map((request) => (
                                                <tr key={request.id}>
                                                    <td>#{request.id}</td>
                                                    <td>
                                                        {request.subscription?.plan?.name || `Subscription #${request.subscription_id}`}
                                                        {request.subscription && (
                                                            <span className="text-muted ms-2">
                                                                ({request.subscription.type})
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>{getStatusBadge(request.status)}</td>
                                                    <td>
                                                        {new Date(request.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </td>
                                                    <td>
                                                        <div style={{ maxWidth: '300px' }}>
                                                            <p className="mb-0 text-truncate" title={request.message}>
                                                                {request.message}
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* No Refund Requests Message */}
            {hasActiveSubscription && refundRequests.length === 0 && (
                <div className="row">
                    <div className="col-12">
                        <div className="card border">
                            <div className="card-body text-center py-4">
                                <p className="text-muted mb-0">You haven't submitted any refund requests yet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

