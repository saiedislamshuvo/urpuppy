import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import AvatarInput from './UserAvatar'
import PrimaryButton from '@/Components/PrimaryButton'
import Button from '@/Components/ui/Button'
import InputError from '@/Components/InputError'
import IconInput from '@/Components/IconInput'
import DeleteAccountModal from '@/Components/Modals/DeleteAccountModal'
import StateDropdown from '@/Components/StateDropdown'
import DateInput from '@/Components/DateInput'
import PhoneNumberInput from '@/Components/PhoneNumberInput'
import MapInput from '@/Components/MapInput'

const UserProfile = () => {

  const user = usePage().props.auth.user

  const [selectedGMap, setSelectedGMap] = useState<google.maps.LatLngLiteral | null>(null);
  const { post, data, setData, errors } = useForm<{
    first_name: string,
    last_name: string,
    email: string,
    avatar: File | null,
    current_password?: string, new_password?: string, new_password_confirmation?: string, state?: App.Data.StateData | null, city?: string | null, zip_code?: string,
    social_fb?: string, social_ig?: string, social_tiktok?: string, social_x?: string, enable_notification: boolean,
    kennel_name?: string, company_state?: string | null, company_city?: string | null, company_address?: string | null, company_established_on?: string | null, company_logo?: any | null, company_zip_code: string | null, phone: string,
    company_name?: string | null,
    company_email_address?: string | null,
    company_about?: string | null
    company_phone?: string | null
    has_usda_registration?: boolean
    gmap_payload?: any


  }>({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    avatar: null,
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
    social_fb: user?.social_fb ?? "",
    social_ig: user?.social_ig ?? "",
    social_tiktok: user?.social_tiktok ?? "",
    social_x: user?.social_x ?? "",
    enable_notification: user.enable_notification,
    kennel_name: user.kennel_name ?? "",
    company_zip_code: user.company_zip_code ?? "",
    company_state: user.company_state ?? null,
    has_usda_registration: user.has_usda_registration,
    company_city: user.company_city ?? null,
    company_phone: user.company_phone ?? null,
    company_address: user.company_address ?? null,
    company_established_on: user.company_established_on ?? null,
    company_logo: user.company_logo ?? "",
    company_name: user.company_name ?? null,
    company_email_address: user.company_email_address ?? null,
    company_about: user.company_about ?? null,
    gmap_payload: null
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // setData('gmap_payload', selectedGMap);
    post('/profile');
  };


  useEffect(() => {
    if (selectedGMap) {
      setData('gmap_payload', selectedGMap);
    }
  }, [selectedGMap]);



  return (
    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="card border">
        <div className="card-body">
          <div className="pb-4 mb-4 border-bottom">
            <h5 className="mb-4 fs-7">Profile Picture</h5>
            <AvatarInput
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  avatar: e.target.files![0],
                }))
              }
            />

          </div>
          <div className="pb-4 mb-4 border-bottom">
            <h5 className="mb-4 fs-7">Account Details</h5>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3 pb-1">
                  <InputLabel value="First Name" />
                  <TextInput placeholder="First Name" onChange={e => setData('first_name', e.target.value)} value={data.first_name} />
                  {errors.first_name &&
                    <InputError message={errors.first_name} />
                  }
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3 pb-1">
                  <InputLabel value="Last Name" />
                  <TextInput placeholder="Last Name" onChange={e => setData('last_name', e.target.value)} value={data.last_name} />
                  {errors.last_name &&
                    <InputError message={errors.last_name} />
                  }
                </div>
              </div>
              <div className="col-6">
                <div className="">
                  <InputLabel value="Email" />
                  <TextInput disabled type="email" onChange={e => setData('email', e.target.value)} placeholder="Email" value={data.email} />
                  {errors.email &&
                    <InputError message={errors.email} />
                  }
                </div>
              </div>
              <div className="col-6">
                <div className="">
                  <InputLabel value="Phone" />
                  <PhoneNumberInput value={data.phone} onChange={(e: any) => setData('phone', e)}
                    className="phone-input form-control"
                  />
                  {errors.phone &&
                    <InputError message={errors.phone} />
                  }
                </div>
              </div>

            </div>
          </div>
          {!(user?.is_breeder || user?.is_seller) &&
            <div className="pb-4 mb-4 border-bottom">
              <h5 className="mb-4 fs-7">Location Details</h5>
              <div className="row">
                <div className="col-md-12">
                  <MapInput
                    initialAddress={user.gmap_address ?? ""}
                    onLocationSelect={setSelectedGMap} />
                </div>
              </div>
            </div>
          }
          {
            user?.is_breeder && <>
              <div className="pb-4 mb-4 border-bottom">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-4 fs-7">Company Details</h5>
                  <Button href={`/breeders/create`} variant="white">Edit More Details</Button>
                </div>
                <div className="row">


                  <div className="col-lg-12">
                    <div className="mb-3 pb-1">
                      <InputLabel isRequired={true} value="Company Logo" />
                      <div className="row align-items-center">

                        <div className="col-lg-2">
                          {data.company_logo && <img style={{
                            height: "100px",
                            width: "100px",
                          }} className=" object-fit-cover  rounded-circle"

                            src={typeof data.company_logo === 'string' ? data.company_logo : URL.createObjectURL(data.company_logo)}
                            alt="Company Logo" />}
                        </div>
                        <div className="col-lg-10">
                          <TextInput className=" file-upload-wrapper " type="file" onChange={(e: any) => setData('company_logo', e.target.files[0])} />
                        </div>
                      </div>

                      {errors.company_logo && <InputError message={errors.company_logo} />}
                    </div>
                  </div>


                  <div className="col-lg-6">
                    <div className="mb-3 pb-1">
                      <InputLabel value="Full Name" />
                      <TextInput placeholder="Full Name" onChange={e => setData('company_name', e.target.value)} value={data.company_name ?? ""} />
                      {errors.company_name &&
                        <InputError message={errors.company_name} />
                      }
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3 pb-1">
                      <InputLabel value="Kennel Name" />
                      <TextInput placeholder="Kennel Name" onChange={e => setData('kennel_name', e.target.value)} value={data.kennel_name} />
                      {errors.kennel_name &&
                        <InputError message={errors.kennel_name} />
                      }
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3 pb-1">
                      <InputLabel value="Company Email Address" />
                      <TextInput placeholder="Company Email Address" onChange={e => setData('company_email_address', e.target.value)} value={data.company_email_address ?? ""} />
                      {errors.company_name &&
                        <InputError message={errors.company_email_address} />
                      }
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3 pb-1">
                      <InputLabel value="Company Phone" />

                      <PhoneNumberInput value={data.company_phone} onChange={(e: any) => setData('company_phone', e)}
                        className="phone-input form-control"
                      />
                      {errors.company_name &&
                        <InputError message={errors.company_phone} />
                      }
                    </div>
                  </div>



                  <div className="col-lg-6">
                    <div className="mb-3 pb-1">
                      <InputLabel value="Company Established on" isRequired={true} />
                      <DateInput name="company_established_on" setData={setData} value={data.company_established_on} />
                      {errors.company_established_on && <InputError message={errors.company_established_on} />}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3 pb-1">
                      <InputLabel isRequired={true} value="Has Usda Registration" />
                      <div className="form-check form-switch">
                        <input
                          onChange={e => setData('has_usda_registration', e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                          checked={data.has_usda_registration}
                        />
                      </div>

                      {errors.has_usda_registration && <InputError message={errors.has_usda_registration} />}
                    </div>
                  </div>



                  <div className="col-lg-12">
                    <div className="mb-3 pb-1">
                      <InputLabel value="About" />
                      <TextInput placeholder="About" onChange={e => setData('company_about', e.target.value)} value={data.company_about ?? ""} />
                      {errors.company_about &&
                        <InputError message={errors.company_about} />
                      }
                    </div>
                  </div>



                </div>
              </div>
            </>

          }


          <div className="pb-4 mb-4 border-bottom">
            <h5 className="mb-4 fs-7">Social Profiles</h5>
            <div className="row">

              <div className="mb-4">
                <ul className="list-unstyled d-flex align-items-center gap-6 social-icon mb-0">
                  <li>
                    <IconInput value={data.social_fb} onChange={(e: any) => setData('social_fb', e.target.value)} icon="/images/svgs/icon-facebook-dark.svg" />
                  </li>
                  <li>
                    <IconInput value={data.social_x} onChange={(e: any) => setData('social_x', e.target.value)} icon="/images/svgs/icon-twitter-dark.svg" />
                  </li>
                  <li>
                    <IconInput value={data.social_tiktok} onChange={(e: any) => setData('social_tiktok', e.target.value)} icon="/images/svgs/icon-tiktok-dark.svg" />
                  </li>
                  <li>
                    <IconInput value={data.social_ig} onChange={(e: any) => setData('social_ig', e.target.value)} icon="/images/svgs/icon-instagram-dark.svg" />
                  </li>
                </ul>
              </div>

            </div>
          </div>
          <div className="pb-4 mb-4 border-bottom">
            <h5 className="mb-4 fs-7">Change Password</h5>
            <div className="row">
              <div className="col-12">
                <div className="mb-3 pb-1">
                  <InputLabel value="Current Password" />
                  <TextInput onChange={e => setData('current_password', e.target.value)} type="password" placeholder="**********" />
                  {
                    errors.current_password &&
                    <InputError message={errors.current_password} />
                  }
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 pb-1">
                  <InputLabel value="New Password" />
                  <TextInput onChange={e => setData('new_password', e.target.value)} type="password" placeholder="**********" />
                  {
                    errors.new_password &&
                    <InputError message={errors.new_password} />
                  }
                </div>
              </div>
              <div className="col-12">
                <div className="">
                  <InputLabel value="Confirm Password" />
                  <TextInput onChange={e => setData('new_password_confirmation', e.target.value)} type="password" placeholder="**********" />
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4 mb-4 border-bottom">
            <h5 className="mb-3 pb-1 fs-7">Manage Account</h5>
            <div className="d-md-flex align-items-center justify-content-between gap-4">
              <div className="mb-3 mb-md-0">
                <h6 className="mb-0 fs-4 font-work-sans">Delete Account</h6>
                <p className="mb-0">Permanently delete your urpuppy.com account.</p>
              </div>
              <DeleteAccountModal />


            </div>
          </div>
          <div className="">
            <h5 className="mb-3 pb-1 fs-7">Notifications</h5>
            <div className="d-md-flex align-items-center justify-content-between gap-4">
              <div className="mb-3 mb-md-0">
                <h6 className="mb-0 fs-4 font-work-sans">Account Notifications</h6>
                <p className="mb-0">We will send you notifications to inform you of any updates and/or changes
                  as events occur for you</p>
              </div>
              <div className="form-check form-switch">
                <input
                  onChange={e => setData('enable_notification', e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                  checked={data.enable_notification}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button href="#" type="button" variant="primary">Update Settings</Button>
    </form>

  )
}

export default UserProfile
