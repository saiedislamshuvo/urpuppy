"use client"

import { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { PropsWithChildren } from 'react';

function GenericModal({ title, buttonTitle, children, setIsModalOpen, handleOk, ...props }: PropsWithChildren<{
    buttonTitle: ReactNode,
    title?: string,
    centered?: boolean,
    setIsModalOpen?: any,
    handleOk?: any
}>) {
    const [show, setShow] = useState(false);

    if (setIsModalOpen) {
        setIsModalOpen(show)
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // Disable scrolling on the body when the modal is open
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to re-enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    return (
        <>
            <div className="text-end">
                <div onClick={handleShow} className="" data-bs-toggle="modal" data-bs-target="#SaveThisSearch">
                    {buttonTitle}
                </div>
                <Modal show={show} className="modal-lg" {...props} onHide={handleClose}>
                    <Modal.Body className="py-8 px-4" style={{
                        maxHeight: '60vh',
                        overflow: 'hidden'
                    }}>
                        <h3 className="mb-3 text-center text-primary">{title}</h3>
                        {children}
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        <a rel='nofollow' onClick={handleClose} href="#" className="btn btn-outline-extralight border btn-white text-dark" data-bs-toggle="modal" data-bs-target="#SaveThisSearch">Cancel</a>
                        {
                            handleOk &&
                        <a rel='nofollow' onClick={handleClose} href="#" className="btn  border btn-primary text-white" data-bs-toggle="modal" data-bs-target="#SaveThisSearch">Select</a>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default GenericModal;
