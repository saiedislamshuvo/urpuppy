import React, { useState } from 'react'
import TextInput from '../TextInput'
import InputLabel from '../InputLabel'
import IconInput from '../IconInput'
import SemiHeading from '../SemiHeading'
import YesOrNoRadioInput from '../YesOrNoRadioInput'
import { useForm, usePage } from '@inertiajs/react'
import GenericFileUpload from '../GenericFileUpload'
import MediaUploadSection from '../MediaUploadSection'
import SelectInput from '../SelectInput'
import InputError from '../InputError'
import DateInput from '../DateInput'
import PhoneNumberInput from '../PhoneNumberInput'
import MapInput, { LocationData } from '../Map/MapInput'
import Button from '../ui/Button'
import { AsyncPaginate } from 'react-select-async-paginate'
import PhoneVerification from '../PhoneVerification'

interface BreederRegistrationFormProps {
  breeds: App.Data.BreedOptionData[];
  gallery?: string[];
  videos?: string[];
  media_limits?: {
    images: number;
    videos: number;
  };
}

const BreederRegistrationForm = ({ breeds, gallery = [], videos = [], media_limits }: BreederRegistrationFormProps) => {

  const user = usePage().props.auth.user as App.Data.UserData;
  const mapProvider = usePage().props.mapProvider as string;

  // Get initial location from user company location data (inline only, no controller default)
  const getInitialLocation = (): LocationData | null => {
    return {
      lat: user.lat ?? '',
      lng: user.lng ?? '',
      address: user.company_address ?? user.address ?? user.gmap_address ?? '',
      city: user.company_city ?? user.city ?? '',
      street: user.company_street ?? user.street ?? '',
      houseNo: user.company_house_no ?? '',
      state: user.company_state ?? user.state ?? '',
      shortState: user.company_short_state ?? user.short_state ?? '',
      zipCode: user.company_zip_code ?? user.zip_code ?? '',
    } as LocationData;
  };

  const initialLocation = getInitialLocation();
  console.log('initialLocation', initialLocation);

  // Helper function to extract state code from "US-TX" format
  const extractStateCode = (shortState: string): string => {
    if (!shortState) return '';
    // If format is "US-TX", extract "TX" (take last part after dash)
    if (shortState.includes('-')) {
      return shortState.split('-').pop() || shortState;
    }
    return shortState;
  };

  // Check if user has saved location data (form has been saved before)
  const hasSavedLocationData = user && (
    user.company_address ||
    (user as any).company_city ||
    (user as any).company_street ||
    (user as any).company_house_no ||
    (user as any).company_state ||
    (user as any).company_short_state ||
    (user as any).company_zip_code
  );

  // Track if user has explicitly interacted with the map
  const isInitialLoad = React.useRef(true);

  // State for the state select dropdown
  const [selectedState, setSelectedState] = useState<any>(() => {
    const stateName = initialLocation?.state ?? (user as any).company_state ?? null;
    if (stateName) {
      return { label: stateName, value: stateName };
    }
    return null;
  });

  // State for state codes dropdown options
  const [stateCodeOptions, setStateCodeOptions] = useState<any[]>([]);
  const [selectedStateCode, setSelectedStateCode] = useState<any>(() => {
    const stateCode = extractStateCode(initialLocation?.shortState ?? (user as any).company_short_state ?? '');
    if (stateCode) {
      return { label: stateCode, value: stateCode };
    }
    return null;
  });

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
    gallery: gallery.length > 0 ? gallery : (user?.gallery ?? []),
    company_logo: null,
    videos: videos.length > 0 ? videos : (user?.video != null ? [user?.video] : []),
    gmap_payload: null,
    // Location fields - pre-fill from user data if exists, otherwise empty
    location_lat: initialLocation?.lat ?? null,
    location_lng: initialLocation?.lng ?? null,
    location_address: initialLocation?.address ?? (user.company_address ?? null),
    location_city: initialLocation?.city ?? ((user as any).company_city ?? null),
    location_street: initialLocation?.street ?? ((user as any).company_street ?? null),
    location_house_no: initialLocation?.houseNo ?? ((user as any).company_house_no ?? null),
    location_state: initialLocation?.state ?? ((user as any).company_state ?? null),
    location_short_state: initialLocation?.shortState ?? ((user as any).company_short_state ?? null),
    location_zip_code: initialLocation?.zipCode ?? ((user as any).company_zip_code ?? null),




  })


  // Fetch states function for AsyncPaginate
  const fetchStates = async (search: any, loadedOptions: any, { page }: any) => {
    try {
      const response = await fetch(
        `/api/puppy/states?page=${page}&search=${search}&all=false`,
      );
      const data = await response.json();

      // Transform to use state name as value instead of ID
      const transformedOptions = data.data.map((state: any) => ({
        label: state.label, // State name
        value: state.label, // Use name as value instead of ID
        abbreviation: state.abbreviation, // Include abbreviation for auto-fill
      }));

      // Update state code options when states are loaded
      if (page === 1 && !search) {
        const codes = transformedOptions
          .filter((state: any) => state.abbreviation)
          .map((state: any) => ({
            label: state.abbreviation,
            value: state.abbreviation,
            stateName: state.label,
          }));
        setStateCodeOptions(codes);
      }

      return {
        options: transformedOptions,
        hasMore: data.current_page !== data.last_page,
        additional: { page: data.current_page + 1 },
      };
    } catch (error) {
      return {
        options: [],
        hasMore: false,
        additional: { page: 1 },
      };
    }
  };

  // Fetch all states to populate state code dropdown
  React.useEffect(() => {
    const loadStateCodes = async () => {
      try {
        const response = await fetch('/api/puppy/states?all=true');
        const data = await response.json();
        const codes = data.data
          .filter((state: any) => state.abbreviation)
          .map((state: any) => ({
            label: state.abbreviation,
            value: state.abbreviation,
            stateName: state.label,
          }));
        setStateCodeOptions(codes);
      } catch (error) {
        console.error('Error loading state codes:', error);
      }
    };
    loadStateCodes();
  }, []);

  // Handle state selection change
  const handleStateChange = (selectedOption: any) => {
    setSelectedState(selectedOption);
    if (selectedOption) {
      const stateCode = selectedOption.abbreviation || '';
      const stateCodeOption = stateCode ? { label: stateCode, value: stateCode } : null;
      setSelectedStateCode(stateCodeOption);

      setData({
        ...data,
        location_state: selectedOption.value, // Use the name as value
        location_short_state: stateCode, // Auto-fill state code
      });
    } else {
      setSelectedStateCode(null);
      setData({
        ...data,
        location_state: null,
        location_short_state: null,
      });
    }
  };

  // Handle state code selection change
  const handleStateCodeChange = (selectedOption: any) => {
    setSelectedStateCode(selectedOption);
    if (selectedOption) {
      // Find corresponding state name from stateCodeOptions
      const correspondingCode = stateCodeOptions.find(
        (code: any) => code.value === selectedOption.value
      );

      if (correspondingCode && correspondingCode.stateName) {
        // Update state select to match the state code
        const stateOption = { label: correspondingCode.stateName, value: correspondingCode.stateName };
        setSelectedState(stateOption);

        setData({
          ...data,
          location_state: correspondingCode.stateName,
          location_short_state: selectedOption.value,
        });
      } else {
        // Just update state code if we can't find the state name
        setData({
          ...data,
          location_short_state: selectedOption.value,
        });
      }
    } else {
      setSelectedState(null);
      setData({
        ...data,
        location_state: null,
        location_short_state: null,
      });
    }
  };

  // Handle zip code lookup
  const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value;
    setData('location_zip_code', zipCode);

    // Only lookup if zip code is 5 digits and map provider is configured
    if (zipCode && /^\d{5}$/.test(zipCode) && mapProvider) {
      try {
        const response = await fetch(`/api/geocode?address=${encodeURIComponent(zipCode)}`);
        const geocodeData = await response.json();

        if (geocodeData.results && geocodeData.results.length > 0) {
          const addressComponents = geocodeData.results[0].address_components;
          let city = '';
          let state = '';
          let stateCode = '';

          addressComponents.forEach((component: any) => {
            if (component.types.includes('locality')) {
              city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
              state = component.long_name;
              // Extract state code, handling "US-TX" format if needed
              stateCode = extractStateCode(component.short_name);
            }
          });

          // Update city
          if (city) {
            setData('location_city', city);
          }

          // Update state and state code
          if (state && stateCode) {
            const stateOption = { label: state, value: state };
            setSelectedState(stateOption);

            const stateCodeOption = { label: stateCode, value: stateCode };
            setSelectedStateCode(stateCodeOption);

            setData({
              ...data,
              location_city: city || data.location_city,
              location_state: state,
              location_short_state: stateCode,
              location_zip_code: zipCode,
            });
          }
        }
      } catch (error) {
        console.error('Error looking up zip code:', error);
      }
    }
  };

  const handleLocationSelect = (location: LocationData) => {
    // If this is initial load and user has saved location data, only update lat/lng
    // Address fields will remain as saved values
    if (isInitialLoad.current && hasSavedLocationData) {
      setData({
        ...data,
        location_lat: location.lat,
        location_lng: location.lng,
        // Don't update address fields - keep existing saved values
      });
      isInitialLoad.current = false;
      return; // Exit early - don't update address fields
    }

    // Extract state code from "US-TX" format if needed (take last part after dash)
    const stateCode = extractStateCode(location.shortState);

    // Update state select when map location changes
    if (location.state) {
      const stateOption = { label: location.state, value: location.state };
      setSelectedState(stateOption);
    }

    // Update state code select
    if (stateCode) {
      const stateCodeOption = { label: stateCode, value: stateCode };
      setSelectedStateCode(stateCodeOption);
    }

    setData({
      ...data,
      location_lat: location.lat,
      location_lng: location.lng,
      location_address: location.address,
      location_city: location.city,
      location_street: location.street,
      location_house_no: location.houseNo ?? null,
      location_state: location.state, // This will be the state name
      location_short_state: stateCode, // Use extracted state code
      location_zip_code: location.zipCode,
    });
    isInitialLoad.current = false;
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
                  <InputLabel isRequired={true} value="First Name" />
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
                {user && (
                  <PhoneVerification
                    phoneNumber={data.company_phone || (user as any).company_phone}
                    phoneType="company_phone"
                    isVerified={(user as any).company_phone_verified_at ? true : false}
                    onPhoneChange={(phone) => setData('company_phone', phone)}
                    label="Phone"
                    required={true}
                  />
                )}
                {errors.company_phone && <InputError message={errors.company_phone} />}
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
                    Select your company location. You can use the map to search or manually enter the address below.
                  </p>
                  <MapInput
                    provider={mapProvider as any}
                    onLocationSelect={handleLocationSelect}
                    initialAddress={initialLocation?.address ?? data.location_address ?? undefined}
                    initialLocation={
                      initialLocation && initialLocation.lat != null && initialLocation.lng != null &&
                        !isNaN(Number(initialLocation.lat)) && !isNaN(Number(initialLocation.lng)) &&
                        (Number(initialLocation.lat) !== 0 || Number(initialLocation.lng) !== 0)
                        ? { lat: Number(initialLocation.lat), lng: Number(initialLocation.lng) }
                        : (data.location_lat != null && data.location_lng != null &&
                          !isNaN(Number(data.location_lat)) && !isNaN(Number(data.location_lng)) &&
                          (Number(data.location_lat) !== 0 || Number(data.location_lng) !== 0)
                          ? { lat: Number(data.location_lat), lng: Number(data.location_lng) }
                          : null) // null will show USA region in map
                    }
                    skipInitialLocationSelect={hasSavedLocationData}
                  />
                  {errors.location_lat && <InputError message={errors.location_lat} />}
                  {errors.location_lng && <InputError message={errors.location_lng} />}
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-4">
                <div className="mb-4">
                  <InputLabel value="House No" />
                  <TextInput
                    value={data.location_house_no ?? ''}
                    onChange={(e) => setData('location_house_no', e.target.value)}
                    placeholder="House/Apt number"
                  />
                  {errors.location_house_no && <InputError message={errors.location_house_no} />}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <InputLabel value="Street (Optional)" />
                  <TextInput
                    value={data.location_street ?? ''}
                    onChange={(e) => setData('location_street', e.target.value)}
                    placeholder="Street address"
                  />
                  {errors.location_street && <InputError message={errors.location_street} />}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <InputLabel value="City" isRequired={true} />
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
                  <InputLabel value="State" isRequired={true} />
                  <AsyncPaginate
                    loadOptions={fetchStates}
                    onChange={handleStateChange}
                    value={selectedState}
                    placeholder="Select state"
                    styles={{
                      option: (baseStyles, state) => ({
                        backgroundColor: state.isSelected ? 'var(--bs-primary)' : state.isFocused ? '#f0f0f0' : 'white',
                        padding: '6px 10px',
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: state.isFocused ? '1px solid var(--bs-primary)' : '1px solid rgba(8, 49, 78, 0.2)',
                        borderRadius: '100px',
                        outlineColor: 'red',
                        boxShadow: 'none',
                        '&:hover': {
                          border: 'auto',
                        },
                        padding: '3px 4px'
                      }),
                    }}
                    additional={{ page: 1 }}
                  />
                  {errors.location_state && <InputError message={errors.location_state} />}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <InputLabel value="State Code" isRequired={true} />
                  <AsyncPaginate
                    loadOptions={async (search: any, loadedOptions: any, { page }: any) => {
                      // Filter state codes based on search
                      const filtered = stateCodeOptions.filter((code: any) =>
                        code.label.toLowerCase().includes(search.toLowerCase())
                      );
                      return {
                        options: filtered,
                        hasMore: false,
                        additional: { page: 1 },
                      };
                    }}
                    onChange={handleStateCodeChange}
                    value={selectedStateCode}
                    placeholder="Select state code"
                    options={stateCodeOptions}
                    styles={{
                      option: (baseStyles, state) => ({
                        backgroundColor: state.isSelected ? 'var(--bs-primary)' : state.isFocused ? '#f0f0f0' : 'white',
                        padding: '6px 10px',
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: state.isFocused ? '1px solid var(--bs-primary)' : '1px solid rgba(8, 49, 78, 0.2)',
                        borderRadius: '100px',
                        outlineColor: 'red',
                        boxShadow: 'none',
                        '&:hover': {
                          border: 'auto',
                        },
                        padding: '3px 4px'
                      }),
                    }}
                    additional={{ page: 1 }}
                  />
                  {errors.location_short_state && <InputError message={errors.location_short_state} />}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-4">
                  <InputLabel value="Zip Code" isRequired={true} />
                  <TextInput
                    value={data.location_zip_code ?? ''}
                    onChange={handleZipCodeChange}
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
                  <div className="">
                    <DateInput name="established_date" setData={setData} value={data.established_date} />
                    {errors.established_date && <InputError message={errors.established_date} />}
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-4">
                  <InputLabel value="About Us" isRequired={true} />

                  <textarea
                    value={data.about_company}
                    onChange={(e) => setData('about_company', e.target.value)}
                    className="form-control rounded-1"
                    rows={5}
                    placeholder="Tell us about your company..."
                  />

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
                <MediaUploadSection
                  label="Upload Images"
                  description="Upload company images (JPG, PNG, GIF, WebP)"
                  name="gallery"
                  setData={(name, files: any) => setData('gallery', files)}
                  errors={errors}
                  defaultUrls={data.gallery ?? []}
                  fileType="images"
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  maxSize={12 * 1024 * 1024} // 12MB
                  watermark={{
                    text: 'urpuppy.com',
                    opacity: 0.3,
                    position: 'tile',
                    color: '#ffffff'
                  }}
                  required={true}
                  maxFiles={media_limits?.images}
                  currentCount={(data.gallery ?? []).length}
                  deleteEndpoint="/api/media/delete"
                />
                {errors.gallery && <InputError message={errors.gallery} />}
              </div>
              <div className="col-lg-6">
                <MediaUploadSection
                  label="Upload Videos"
                  description="Upload company videos (MP4, MOV, AVI, WebM)"
                  name="videos"
                  setData={(name, files: any) => setData('videos', files)}
                  errors={errors}
                  defaultUrls={data.videos ?? []}
                  fileType="videos"
                  accept=".mp4,.mov,.avi,.webm"
                  maxSize={50 * 1024 * 1024} // 50MB
                  required={false}
                  maxFiles={media_limits?.videos}
                  currentCount={(data.videos ?? []).length}
                  deleteEndpoint="/api/media/delete"
                />
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
