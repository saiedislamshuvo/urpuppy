"use client"

import { Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../TextInput';
import InputError from '../InputError';

function DeleteAccountModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const {  data, setData, errors, delete: destroy } = useForm({
        password: '',
    });

    const handleDeleteAccount = (e: React.SyntheticEvent) => {
        e.preventDefault();
        destroy('/profile', {
            preserveScroll: true,
            preserveState: true,
        });
    }


  return (
    <>

   <div className="mb-8 text-end">
      <a rel='nofollow' onClick={handleShow} href="#" className="btn btn-outline-extralight border btn-white text-dark" data-bs-toggle="modal" data-bs-target="#SaveThisSearch">Delete Account</a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="py-8 px-4">
            <h3 className="mb-3 text-center text-primary">Delete your account</h3>
                    <form action="">
            <div>

             { errors?.password &&  <InputError message={errors?.password} /> }
              <label className="form-label">
                                    Password
              </label>

              <TextInput type="password" onChange={(e: any) => setData('password', e.target.value) }  placeholder="**" />
            </div>
          </form>
                    </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button onClick={handleDeleteAccount}  className="btn btn-danger border btn-white text-white" >Confirm</button>
          <a rel='nofollow' onClick={handleClose} href="#" className="btn btn-outline-extralight border btn-white text-dark" data-bs-toggle="modal" data-bs-target="#SaveThisSearch">Cancel</a>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default DeleteAccountModal;
