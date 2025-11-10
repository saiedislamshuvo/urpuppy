import React, { useEffect, useState } from 'react'
import TextInput from '../TextInput'
import InputLabel from '../InputLabel'
import IconInput from '../IconInput'
import SemiHeading from '../SemiHeading'
import YesOrNoRadioInput from '../YesOrNoRadioInput'
import { useForm, usePage } from '@inertiajs/react'
import Dropzone from 'react-dropzone'
import FileUpload from '../FileUpload'
import DateInput from '../DateInput'
import SelectInput, { Option } from '../SelectInput'
import CheckoutV2Form from '../CheckoutV2Form'
import InputError from '../InputError'
import { parseInt } from 'lodash'
import PhoneNumberInput from '../PhoneNumberInput'
import MapInput, { LocationData } from '../Map/MapInput'
import PhoneVerification from '../PhoneVerification'
import { AsyncPaginate } from 'react-select-async-paginate'



const SellerRegistrationForm = ({
  puppy_edit,
  puppy_count: puppyCountProp
}: {
  puppy_edit: App.Data.PuppyEditData | null
  puppy_count?: number
}) => {

  const patterns = usePage().props.patterns as App.Data.PatternData[];
  const colors = usePage().props.colors as App.Data.OptionData[];
  const siblings = usePage().props.siblings as App.Data.SiblingData[];
  const breeds = usePage().props.breeds as App.Data.BreedOptionData[];
  const puppy_count = puppyCountProp ?? (usePage().props.puppy_count as number);
  const user = usePage().props.auth.user;
  const mapProvider = usePage().props.mapProvider as string;
  const defaultLocation = usePage().props.defaultLocation as LocationData | null;

  // Determine if this is seller registration mode (no puppies yet)
  const isSellerRegistration = !puppy_count && !puppy_edit;

  // Define form data type
  type FormData = {
    first_name: string;
    last_name: string;
    email: string;
    website: string | null;
    phone: string;
    social_fb: string | null;
    social_ig: string | null;
    social_tiktok: string | null;
    social_x: string | null;
    zip_code: string;
    gmap_payload: any | null;
    // Location fields
    location_lat?: number | null;
    location_lng?: number | null;
    location_address?: string | null;
    location_city?: string | null;
    location_street?: string | null;
    location_house_no?: string | null;
    location_state?: string | null;
    location_short_state?: string | null;
    location_zip_code?: string | null;
    // Puppy fields (optional)
    images?: any[];
    puppy_breeds?: any[];
    videos?: any[];
    has_vaccine?: string;
    has_health_certificate?: string;
    has_vet_exam?: string;
    has_delivery_included?: string;
    has_travel_ready?: string;
    has_certificate?: string;
    certificate_type?: string | null;
    puppy_price?: number;
    puppy_name?: string;
    puppy_gender?: string;
    city_id?: string | null;
    city?: string | null;
    state_id?: string | null;
    puppy_about?: string;
    puppy_patterns?: any[];
    puppy_colors?: any[];
    puppy_birth_date?: string;
    puppy_siblings?: any[];
    image_upload?: any[];
    certificate_document?: any[];
  };

  // Get initial location from user or defaultLocation
  const getInitialLocation = (): LocationData | null => {
    if (user && (user as any).lat && (user as any).lng) {
      return {
        lat: (user as any).lat,
        lng: (user as any).lng,
        address: (user as any).gmap_address ?? (user as any).address ?? '',
        city: (user as any).city ?? '',
        street: (user as any).street ?? '',
        houseNo: (user as any).house_no ?? '',
        state: (user as any).state ?? '',
        shortState: (user as any).short_state ?? '',
        zipCode: (user as any).zip_code ?? '',
      };
    }
    return defaultLocation;
  };

  const initialLocation = getInitialLocation();

  // Helper function to extract state code from "US-TX" format
  const extractStateCode = (shortState: string): string => {
    if (!shortState) return '';
    // If format is "US-TX", extract "TX" (take last part after dash)
    if (shortState.includes('-')) {
      return shortState.split('-').pop() || shortState;
    }
    return shortState;
  };

  // State for the state select dropdown
  const [selectedState, setSelectedState] = useState<any>(() => {
    const stateName = initialLocation?.state ?? null;
    if (stateName) {
      return { label: stateName, value: stateName };
    }
    return null;
  });

  // State for state codes dropdown options
  const [stateCodeOptions, setStateCodeOptions] = useState<any[]>([]);
  const [selectedStateCode, setSelectedStateCode] = useState<any>(() => {
    const stateCode = extractStateCode(initialLocation?.shortState ?? '');
    if (stateCode) {
      return { label: stateCode, value: stateCode };
    }
    return null;
  });

  // Initialize form data - only include seller fields for seller registration
  const initialFormData: FormData = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    website: (user as any)?.website ?? null,
    phone: user?.phone ?? '',
    social_fb: (user as any)?.social_fb ?? null,
    social_ig: (user as any)?.social_ig ?? null,
    social_tiktok: (user as any)?.social_tiktok ?? null,
    social_x: (user as any)?.social_x ?? null,
    zip_code: user.zip_code ?? '',
    gmap_payload: null,
    // Location fields
    location_lat: initialLocation?.lat ?? null,
    location_lng: initialLocation?.lng ?? null,
    location_address: initialLocation?.address ?? null,
    location_city: initialLocation?.city ?? null,
    location_street: initialLocation?.street ?? null,
    location_house_no: initialLocation?.houseNo ?? null,
    location_state: initialLocation?.state ?? null,
    location_short_state: initialLocation?.shortState ?? null,
    location_zip_code: initialLocation?.zipCode ?? null,
    // Only add puppy fields if not in seller registration mode
    ...(!isSellerRegistration ? {
      images: puppy_edit?.preview_images ?? [],
      puppy_breeds: puppy_edit?.breeds ?? [],
      videos: puppy_edit?.video != null ? [puppy_edit?.video] : [],
      has_vaccine: puppy_edit?.has_vaccine ? 'yes' : 'no',
      has_health_certificate: puppy_edit?.has_health_certificate ? 'yes' : 'no',
      has_vet_exam: puppy_edit?.has_vet_exam ? 'yes' : 'no',
      has_delivery_included: puppy_edit?.has_delivery_included ? 'yes' : 'no',
      has_travel_ready: puppy_edit?.has_travel_ready ? 'yes' : 'no',
      has_certificate: puppy_edit?.has_certificate ? 'yes' : 'no',
      certificate_type: puppy_edit?.certificate_type ?? null,
      puppy_price: puppy_edit?.price,
      puppy_name: puppy_edit?.name ?? '',
      puppy_gender: puppy_edit?.gender ?? 'Male',
      city_id: user.city ?? null,
      city: user.city ?? null,
      state_id: null,
      puppy_about: puppy_edit?.description ?? '',
      puppy_patterns: puppy_edit?.puppy_patterns ?? [],
      puppy_colors: puppy_edit?.puppy_colors ?? [],
      puppy_birth_date: puppy_edit?.birth_date ?? '',
      puppy_siblings: puppy_edit?.siblings ?? [],
      image_upload: [],
      certificate_document: puppy_edit?.certificate_document ?? []
    } : {})
  };

  const { patch, data, setData, post, errors, processing } = useForm<FormData>(initialFormData)

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
  useEffect(() => {
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
        location_short_state: '',
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
      location_state: location.state,
      location_short_state: stateCode, // Use extracted state code
      location_zip_code: location.zipCode,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If this is seller registration mode, submit to seller profile endpoint
    if (isSellerRegistration) {
      post('/seller/profile');
      return;
    }

    // Otherwise, handle puppy creation/update
    if (puppy_edit) {
      post(`/seller/update/${puppy_edit?.id}`);
    } else {
      post(`/seller/store`);
    }
  };




  return (
    <form onSubmit={handleSubmit}>
      <div className="card border">
        <div className="card-body">

          {isSellerRegistration &&
            <>
              <div className="contact-details border-bottom mb-4">
                <h2 className="fs-5 mb-3 pb-1">Contact Details</h2>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <InputLabel isRequired={true} value="First Name " />
                      <TextInput onChange={(e: any) => setData('first_name', e.target.value)} value={data.first_name} />
                      {errors.first_name && <InputError message={errors.first_name} />}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <InputLabel isRequired={true} value="Last Name" />
                      <TextInput onChange={(e: any) => setData('last_name', e.target.value)} value={data.last_name} />
                      {errors.last_name && <InputError message={errors.last_name} />}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <InputLabel isRequired={true} value="Email" />
                      <TextInput onChange={(e: any) => setData('email', e.target.value)} value={data.email} />
                      {errors.email && <InputError message={errors.email} />}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      {user && (
                        <PhoneVerification
                          phoneNumber={data.phone || (user as any).phone}
                          phoneType="phone"
                          isVerified={(user as any).phone_verified_at ? true : false}
                        />
                      )}
                      {errors.phone && <InputError message={errors.phone} />}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <InputLabel value="Website (Optional)" />
                      <TextInput type="text" onChange={(e: any) => setData('website', e.target.value)} />
                      {errors.website && <InputError message={errors.website} />}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <InputLabel value="Social Links (Optional)" />
                      <ul className="list-unstyled d-flex align-items-center gap-6 social-icon mb-0">
                        <li>
                          <IconInput value={data.social_fb ?? ''} onChange={(e: any) => setData('social_fb', e.target.value)} icon="/images/svgs/icon-facebook-dark.svg" />
                        </li>
                        <li>
                          <IconInput value={data.social_x ?? ''} onChange={(e: any) => setData('social_x', e.target.value)} icon="/images/svgs/icon-twitter-dark.svg" />
                        </li>
                        <li>
                          <IconInput value={data.social_tiktok ?? ''} onChange={(e: any) => setData('social_tiktok', e.target.value)} icon="/images/svgs/icon-tiktok-dark.svg" />
                        </li>
                        <li>
                          <IconInput value={data.social_ig ?? ''} onChange={(e: any) => setData('social_ig', e.target.value)} icon="/images/svgs/icon-instagram-dark.svg" />
                        </li>
                      </ul>

                      {errors.social_fb && <InputError message={errors.social_fb} />}
                      {errors.social_tiktok && <InputError message={errors.social_tiktok} />}
                      {errors.social_ig && <InputError message={errors.social_ig} />}
                      {errors.social_x && <InputError message={errors.social_x} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="location-details border-bottom mb-4">
                <SemiHeading title="Location" />
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <InputLabel value="Your Location" />
                      <p className="text-muted small mb-3">
                        {defaultLocation ? 'Default location from your account is pre-filled. You can change it if needed.' : 'Select your location. You can use the map to search or manually enter the address below.'}
                      </p>
                      <MapInput
                        provider={mapProvider as any}
                        onLocationSelect={handleLocationSelect}
                        initialAddress={initialLocation?.address}
                        initialLocation={initialLocation && initialLocation.lat != null && initialLocation.lng != null
                          ? { lat: initialLocation.lat, lng: initialLocation.lng }
                          : null}
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
            </>}
          {!isSellerRegistration && (
            <>
              <div className="puppy-details border-bottom mb-4">
                <SemiHeading title="Puppy Details" />
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Puppy Name" isRequired={true} />
                      <TextInput value={data.puppy_name ?? ''} onChange={(e) => setData('puppy_name', e.target.value)} />
                      {errors.puppy_name && <InputError message={errors.puppy_name} />}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Puppy Price" isRequired={true} />
                      <TextInput value={data.puppy_price ?? ''} onChange={(e) => setData('puppy_price', parseInt(e.target.value))} />
                      {errors.puppy_price && <InputError message={errors.puppy_price} />}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Gender" isRequired={true} />
                      <select value={data.puppy_gender ?? 'Male'} onChange={(e) => setData('puppy_gender', e.target.value)} className="form-select shadow-none" aria-label="Default select example">
                        <option value="Male" >Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Date of Birth" isRequired={true} />
                      <DateInput name="puppy_birth_date" setData={setData} value={data.puppy_birth_date ?? ''} />
                      {errors.puppy_birth_date && <InputError message={errors.puppy_birth_date} />}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-4">
                      <InputLabel value="Puppy Bio" isRequired={true} />
                      <textarea value={data.puppy_about ?? ''} onChange={(e) => setData('puppy_about', e.target.value)} className="form-control rounded-1" id="About" rows={3} placeholder=""></textarea>
                      {errors.puppy_about && <InputError message={errors.puppy_about} />}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Breeds" isRequired={true} />
                      <SelectInput value={data.puppy_breeds ?? []} setData={setData} multiple={true} name="puppy_breeds" options={breeds} />
                      {errors.puppy_breeds && <InputError message={errors.puppy_breeds} />}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Pattern/Coat " isRequired={true} />
                      <SelectInput value={data.puppy_patterns ?? []} setData={setData} multiple={true} name="puppy_patterns" options={patterns} />
                      {errors.puppy_patterns && <InputError message={errors.puppy_patterns} />}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Color" isRequired={true} />
                      <SelectInput value={data.puppy_colors ?? []} setData={setData} multiple={true} name="puppy_colors" options={colors} />
                      {errors.puppy_colors && <InputError message={errors.puppy_colors} />}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label d-block">
                        Siblings Of
                      </label>
                      <SelectInput value={data.puppy_siblings ?? []} setData={setData} multiple={true} name="puppy_siblings" options={siblings} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="why-stand-out border-bottom mb-4">
                <SemiHeading title="Why I Stand Out" />
                <div className="row">
                  <div className="col-md-6 col-lg-4 col-xxl">
                    <YesOrNoRadioInput title="Health Certificate" value={data.has_health_certificate ?? 'no'} name="has_health_certificate" setData={setData} />
                  </div>
                  <div className="col-md-6 col-lg-4 col-xxl">
                    <YesOrNoRadioInput title="Vaccinated"
                      value={data.has_vaccine ?? 'no'} name="has_vaccine" setData={setData}
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 col-xxl">
                    <YesOrNoRadioInput title="Vet Exam"
                      value={data.has_vet_exam ?? 'no'} name="has_vet_exam" setData={setData}
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 col-xxl">
                    <YesOrNoRadioInput title="Travel Ready"
                      value={data.has_travel_ready ?? 'no'} name="has_travel_ready" setData={setData}
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 col-xxl">
                    <YesOrNoRadioInput title="Delivery Included"
                      name="has_delivery_included"
                      value={data.has_delivery_included ?? 'no'} setData={setData}
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 col-xxl">
                    <YesOrNoRadioInput title="Certificate"
                      value={data.has_certificate ?? 'no'} name="has_certificate" setData={setData}
                    />
                  </div>
                  {/*
                  <div className="col-md-6 col-lg-4 col-xxl">
                    <YesOrNoRadioInput title="Are You a Breeder"
                           name="are_you_a_breeder"
value={data.are_you_a_breeder}  setData={setData}
                                />
                  </div>
*/}
                </div>
              </div>
              <div className="certificate-details border-bottom mb-4">
                <SemiHeading title="Certificate Details (Optional)" />
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Certificate Type" />
                      <select
                        value={data.certificate_type || ''}
                        onChange={(e) => setData('certificate_type', e.target.value || null)}
                        className="form-select shadow-none"
                      >
                        <option value="">Select Certificate Type</option>
                        <option value="AKC">AKC</option>
                        <option value="CKC">CKC</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.certificate_type && <InputError message={errors.certificate_type} />}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <InputLabel value="Upload Certificate Document" />
                      <FileUpload
                        defaultUrls={data.certificate_document ?? []}
                        setData={(name, files: any) => setData('certificate_document', files)}
                        errors={errors}
                        name="certificate_document" required={false} />
                      {errors.certificate_document && <InputError message={errors.certificate_document} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="upload-details">
                <div className="row">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <h6 className="fs-5 mb-3 pb-1">Upload a Image</h6>
                    <FileUpload
                      defaultUrls={data.images ?? []}
                      setData={(name, files: any) => setData('images', files)}
                      errors={errors}
                      name="images" required={true} />
                    {errors.images && <InputError message={errors.images} />}

                  </div>
                  <div className="col-lg-6">
                    <h6 className="fs-5 mb-3 pb-1">Upload a Video</h6>
                    <FileUpload
                      name="videos"
                      errors={errors}
                      setData={(name, files: any) => setData('videos', files)}
                      defaultUrls={data.videos ?? []}

                      required={true} />
                    {errors.videos && <InputError message={errors.videos} />}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>



      <button disabled={processing} type="submit" className="btn btn-primary d-flex align-items-center gap-2">
        <img src="../images/svgs/icon-arrow-right.svg" alt="urpuppy-img" /> {isSellerRegistration ? 'Submit Profile' : 'Submit Registration'}
      </button>
    </form>
  )
}

export default SellerRegistrationForm
