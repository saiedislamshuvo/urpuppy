import React from 'react'
import TextInput from '../TextInput'
import InputLabel from '../InputLabel'
import IconInput from '../IconInput'
import SemiHeading from '../SemiHeading'
import YesOrNoRadioInput from '../YesOrNoRadioInput'
import { useForm, usePage } from '@inertiajs/react'
import Dropzone from 'react-dropzone'
import FileUpload from '../FileUpload'
import SelectInput from '../SelectInput'
import InputError from '../InputError'
import DateInput from '../DateInput'
import PhoneNumberInput from '../PhoneNumberInput'
import MapInput, { LocationData } from '../Map/MapInput'
import Button from '../ui/Button'

const BreederRegistrationForm = ({ breeds }: { breeds: App.Data.BreedOptionData[] }) => {

  const user = usePage().props.auth.user as App.Data.UserData;
  const mapProvider = usePage().props.mapProvider as string;
  const defaultLocation = usePage().props.defaultLocation as LocationData | null;

  // Get initial location from user company location or defaultLocation
  const getInitialLocation = (): LocationData | null => {
    // Check if user has company location data
    const hasCompanyLocation = user && (user.company_address || (user as any).company_city);
    if (hasCompanyLocation) {
      return {
        lat: (user as any).company_lat ?? (user as any).lat ?? null,
        lng: (user as any).company_lng ?? (user as any).lng ?? null,
        address: user.company_address ?? '',
        city: (user as any).company_city ?? '',
        street: (user as any).company_street ?? '',
        state: (user as any).company_state ?? '',
        shortState: (user as any).company_short_state ?? '',
        zipCode: (user as any).company_zip_code ?? '',
      };
    }
    return defaultLocation;
  };

  const initialLocation = getInitialLocation();

  const { data, setData, post, errors, processing } = useForm({
    health_certificate: 'yes',
    vaccinated: 'yes',
    company_address: user.company_address ?? '',
    vet_exam: 'yes',
    has_usda_registration: 'no',
    about_company: user?.company_about ?? '',
    established_date: user?.company_established_on ?? '',
    company_phone: user?.company_phone ?? '',
    kennel_name: user?.kennel_name ?? '',
    fullname: user?.company_name ?? '',
    company_email_address: user?.company_email_address ?? '',
    travel_ready: 'yes',
    delivery_included: 'yes',
    breeds: user?.breeds ?? [],
    city: null,
    state_id: null,
    zip_code: '',
    are_you_a_breeder: 'yes',
    gallery: user?.gallery ?? [],
    company_logo: null,
    videos: user?.video != null ? [user?.video] : [],
    gmap_payload: null,
    // Location fields
    location_lat: initialLocation?.lat ?? null,
    location_lng: initialLocation?.lng ?? null,
    location_address: initialLocation?.address ?? null,
    location_city: initialLocation?.city ?? null,
    location_street: initialLocation?.street ?? null,
    location_state: initialLocation?.state ?? null,
    location_short_state: initialLocation?.shortState ?? null,
    location_zip_code: initialLocation?.zipCode ?? null,




  })


  const handleLocationSelect = (location: LocationData) => {
    setData({
      ...data,
      location_lat: location.lat,
      location_lng: location.lng,
      location_address: location.address,
      location_city: location.city,
      location_street: location.street,
      location_state: location.state,
      location_short_state: location.shortState,
      location_zip_code: location.zipCode,
    });
  };




  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);

    // const updatedData = {
    //     ...Object.fromEntries(formData.entries()),
    //     image_upload: formData.getAll('files')
    // };

    // setData((previous) => ({
    //     ...previous,
    //     ...updatedData,
    // }));

    post('/breeders');
  };




  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="card border">
        <div className="card-body">
          <div className="contact-details border-bottom mb-4">
            <h2 className="fs-5 mb-3 pb-1">Contact Details</h2>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb-4">
                  <InputLabel isRequired={true} value="Full Name" />
                  <TextInput value={data.fullname} onChange={(e: any) => setData('fullname', e.target.value)} />

                  {errors.fullname && <InputError message={errors.fullname} />}
                </div>
              </div>
            </div>
          </div>

          <div className="contact-details border-bottom mb-4">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputLabel isRequired={true} value="Kennel Name" />
                  <TextInput value={data.kennel_name} onChange={(e: any) => setData('kennel_name', e.target.value)} />

                  {errors.kennel_name && <InputError message={errors.kennel_name} />}
                </div>
              </div>


              <div className="col-lg-6">
                <div className="mb-4">
                  <InputLabel isRequired={true} value="Upload a Company Logo" />
                  <TextInput className=" file-upload-wrapper" type="file" onChange={(e: any) => setData('company_logo', e.target.files[0])} />

                  {errors.company_logo && <InputError message={errors.company_logo} />}
                </div>
              </div>

            </div>


          </div>


          <div className="contact-details border-bottom mb-4">
            <div className="row">

              <div className="col-lg-6">
                <div className="mb-4">
                  <InputLabel isRequired={true} value="Email" />
                  <TextInput value={data.company_email_address} type="email" onChange={(e: any) => setData('company_email_address', e.target.value)} />

                  {errors.company_email_address && <InputError message={errors.company_email_address} />}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputLabel isRequired={true} value="Phone" />
                  <PhoneNumberInput value={data.company_phone} onChange={(e: any) => setData('company_phone', e)}
                    className="phone-input form-control"
                  />

                  {errors.company_phone && <InputError message={errors.company_phone} />}
                </div>
              </div>

              { /**
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Social Links (Optional)"/>
                      <ul className="list-unstyled d-flex align-items-center gap-6 social-icon mb-0">
                        <li>
                            <IconInput onChange={() => {}} icon="/images/svgs/icon-facebook-dark.svg" />
                        </li>
                        <li>
                            <IconInput  onChange={() => {}} icon="/images/svgs/icon-twitter-dark.svg" />
                        </li>
                        <li>
                            <IconInput  onChange={() => {}} icon="/images/svgs/icon-tiktok-dark.svg" />
                        </li>
                        <li>
                            <IconInput  onChange={() => {}} icon="/images/svgs/icon-instagram-dark.svg" />
                        </li>
                        <li>
                            <IconInput  onChange={() => {}} icon="/images/svgs/icon-globe-dark.svg" />
                        </li>
                      </ul>
                    </div>
                  </div>
**/}

            </div>
          </div>



          <div className="location-details border-bottom mb-4">
            <SemiHeading title="Location" />
            <div className="row">
              <div className="col-12">
                <div className="mb-4">
                  <InputLabel value="Company Location" />
                  <p className="text-muted small mb-3">
                    {defaultLocation ? 'Default location from your account is pre-filled. You can change it if needed.' : 'Select your company location. You can use the map to search or manually enter the address below.'}
                  </p>
                  <MapInput
                    provider={mapProvider as any}
                    onLocationSelect={handleLocationSelect}
                    initialAddress={initialLocation?.address}
                    initialLocation={initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : null}
                  />
                  {errors.location_lat && <InputError message={errors.location_lat} />}
                  {errors.location_lng && <InputError message={errors.location_lng} />}
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="mb-4">
                  <InputLabel value="Full Address" />
                  <TextInput
                    value={data.location_address ?? ''}
                    onChange={(e) => setData('location_address', e.target.value)}
                    placeholder="Enter full address"
                  />
                  {errors.location_address && <InputError message={errors.location_address} />}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputLabel value="House & Street No" />
                  <TextInput
                    value={data.location_street ?? ''}
                    onChange={(e) => setData('location_street', e.target.value)}
                    placeholder="Street address"
                  />
                  {errors.location_street && <InputError message={errors.location_street} />}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputLabel value="City" />
                  <TextInput
                    value={data.location_city ?? ''}
                    onChange={(e) => setData('location_city', e.target.value)}
                    placeholder="City"
                  />
                  {errors.location_city && <InputError message={errors.location_city} />}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <InputLabel value="State" />
                  <TextInput
                    value={data.location_state ?? ''}
                    onChange={(e) => setData('location_state', e.target.value)}
                    placeholder="State name"
                  />
                  {errors.location_state && <InputError message={errors.location_state} />}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <InputLabel value="State Code" />
                  <TextInput
                    value={data.location_short_state ?? ''}
                    onChange={(e) => setData('location_short_state', e.target.value.toUpperCase())}
                    placeholder="e.g., CA, NY, TX"
                    maxLength={2}
                  />
                  {errors.location_short_state && <InputError message={errors.location_short_state} />}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <InputLabel value="Zip Code" />
                  <TextInput
                    value={data.location_zip_code ?? ''}
                    onChange={(e) => setData('location_zip_code', e.target.value)}
                    placeholder="Zip code"
                  />
                  {errors.location_zip_code && <InputError message={errors.location_zip_code} />}
                </div>
              </div>
            </div>
          </div>

          <div className="location-details border-bottom mb-4">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-6">
                  <InputLabel value={
                    <span>Breed Type <span className="fs-1"> ( Max 4 Type ) </span></span>

                  } isRequired={true} />
                  <SelectInput value={data.breeds} name="breeds" setData={setData} multiple={true} options={breeds} />
                  {errors.breeds && <InputError message={errors.breeds} />}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputLabel value="When did you start your business?" isRequired={true} />
                  <DateInput name="established_date" setData={setData} value={data.established_date} />

                  {errors.established_date && <InputError message={errors.established_date} />}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-4">
                  <InputLabel value="About Us" isRequired={true} />

                  <TextInput value={data.about_company} onChange={(e: any) => setData('about_company', e.target.value)} />

                  {errors.about_company && <InputError message={errors.about_company} />}
                </div>
              </div>
            </div>
          </div>
          <div className="why-stand-out border-bottom mb-4">
            <div className="row">
              <div className="col-md-6 col-lg-4 col-xxl">

                <YesOrNoRadioInput title="USDA Registered" value={data.has_usda_registration} name="has_usda_registration" setData={setData} />
              </div>
            </div>
          </div>
          <div className="upload-details">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h6 className="fs-5 mb-3 pb-1">Upload a Image</h6>
                <FileUpload
                  errors={errors}
                  setData={(name, files: any) => setData('gallery', files)}
                  defaultUrls={data.gallery}
                  name="gallery" required={true} />
                {errors.gallery && <InputError message={errors.gallery} />}

              </div>
              <div className="col-lg-6">
                <h6 className="fs-5 mb-3 pb-1">Upload a Video</h6>
                <FileUpload
                  name="videos"
                  setData={(name, files: any) => setData('videos', files)}
                  defaultUrls={data.videos}
                  required={true} />
                {errors.videos && <InputError message={errors.videos} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button disabled={processing} type="button" ><img
        src="../images/svgs/icon-arrow-right.svg" alt="urpuppy-img" /> Submit Registration</Button>
    </form>
  )
}

export default BreederRegistrationForm
