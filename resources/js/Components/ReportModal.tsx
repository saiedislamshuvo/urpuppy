import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from 'react-bootstrap/Modal';

interface ReportModalProps {
    show: boolean;
    onClose: () => void;
    puppySlug: string;
}

export default function ReportModal({ show, onClose, puppySlug }: ReportModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        reason: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/report/${puppySlug}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Report This Listing</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="reason" className="form-label">
                            Reason for Reporting <span className="text-danger">*</span>
                        </label>
                        <textarea
                            id="reason"
                            className={`form-control rounded ${errors.reason ? 'is-invalid' : ''}`}
                            rows={5}
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            placeholder="Please provide a detailed reason for reporting this listing..."
                            required
                        />
                        {errors.reason && (
                            <div className="invalid-feedback">{errors.reason}</div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-outline-extralight border btn-white text-dark"
                        onClick={handleClose}
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary text-white"
                        disabled={processing || !data.reason.trim()}
                    >
                        {processing ? 'Submitting...' : 'Submit Report'}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

