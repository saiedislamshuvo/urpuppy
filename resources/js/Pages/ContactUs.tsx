import Hero from '@/Components/Hero'
import InputError from '@/Components/InputError'
import MetaTags from '@/Components/MetaTags'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import Layout from '@/Layouts/Layout'
import { useForm } from '@inertiajs/react'
import React from 'react'

const ContactUs = ({url} : {url: string}) => {

    const {data, setData, reset, post, processing, errors} = useForm({
        first_name: '',
        last_name: '',
        email: '',
        account_type: 'seller',
        subject: '',
        message: '',
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        post('/contact-us');
        reset();
    }

  return (
  <Layout>

            <MetaTags url={url} title="Contact us"/>
            <Hero title="Contact us" bgImage="/images/contact/contact-bg.jpg"/>
                <section className="get-in-touch py-7 py-md-5 py-xl-9">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 border-end pe-xl-10 order-last order-lg-first">
            <div className="contact-form pe-xl-6">
              <h2 className="fs-10 mb-4 mb-lg-8">Get in Touch</h2>
              <form action="" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">
                        First Name
                      </label>
                      <TextInput value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                        {errors.first_name && <InputError message={errors.first_name} /> }
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">
                        Last Name
                      </label>
                      <TextInput value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                    {errors.last_name && <InputError message={errors.last_name} /> }
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-4">
                      <label  className="form-label">Email Address</label>
                      <TextInput type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                                {errors.email && <InputError message={errors.email} />}

                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label  className="form-label">
                        Account Type
                      </label>
                      <select value={data.account_type} onChange={(e) => setData('account_type', e.target.value)}  className="form-select shadow-none" aria-label="Default select example">
                        <option value="seller">Seller</option>
                        <option value="breeder">Breeder</option>
                        <option value="buyer">Buyer</option>
                        <option value="general_inquiry">General Inquiry</option>
                      </select>
                                                {errors.account_type && <InputError message={errors.account_type} />}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label  className="form-label">
                        Subject
                      </label>
                      <TextInput value={data.subject} onChange={(e) => setData('subject', e.target.value)} />
                                                {errors.subject && <InputError message={errors.subject} />}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-4">
                      <label  className="form-label">
                        Message
                      </label>

                      <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} rows={3} className="h-20 form-control rounded-1" id="Message" placeholder=""></textarea>
                                                {errors.message && <InputError message={errors.message} />}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
          <div className="col-lg-6 ps-xl-10 order-first order-lg-last mb-7 mb-lg-0">
            <div className="position-relative overflow-hidden rounded-1 ps-xl-6">
              <img src="/images/contact/contact-img.jpg" alt="contact-image"
                className="w-100 h-auto object-fit-cover rounded-1" />
            </div>
          </div>
        </div>
      </div>
    </section>

        </Layout>

  )
}

export default ContactUs
