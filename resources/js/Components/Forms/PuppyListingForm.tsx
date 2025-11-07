import React from 'react'
import TextInput from '../TextInput'
import InputLabel from '../InputLabel'
import SemiHeading from '../SemiHeading'
import YesOrNoRadioInput from '../YesOrNoRadioInput'
import { useForm, usePage } from '@inertiajs/react'
import GenericFileUpload from '../GenericFileUpload'
import DateInput from '../DateInput'
import SelectInput from '../SelectInput'
import InputError from '../InputError'
import MapInput, { LocationData } from '../Map/MapInput'
import { parseInt } from 'lodash'

const PuppyListingForm = ({
    puppy_edit
}: {
    puppy_edit: App.Data.PuppyEditData | null
}) => {
    const patterns = usePage().props.patterns as App.Data.PatternData[];
    const colors = usePage().props.colors as App.Data.OptionData[];
    const breeds = usePage().props.breeds as App.Data.BreedOptionData[];
    const mapProvider = usePage().props.mapProvider as string;
    const defaultLocation = usePage().props.defaultLocation as LocationData | null;

    // Define form data type
    type FormData = {
        images?: any[];
        puppy_breeds?: any[];
        videos?: any[];
        has_vaccine?: string;
        has_health_certificate?: string;
        has_vet_exam?: string;
        has_delivery_included?: string;
        has_travel_ready?: string;
        certificate_type?: string | null;
        puppy_price?: number;
        puppy_name?: string;
        puppy_gender?: string;
        puppy_about?: string;
        puppy_patterns?: any[];
        puppy_colors?: any[];
        puppy_birth_date?: string;
        certificate_document?: any[];
        location_lat?: number | null;
        location_lng?: number | null;
        location_address?: string | null;
        location_city?: string | null;
        location_street?: string | null;
        location_state?: string | null;
        location_short_state?: string | null;
        location_zip_code?: string | null;
    };

    // Get initial location from puppy_edit or defaultLocation
    const getInitialLocation = (): LocationData | null => {
        if (puppy_edit && (puppy_edit as any).lat && (puppy_edit as any).lng) {
            return {
                lat: (puppy_edit as any).lat,
                lng: (puppy_edit as any).lng,
                address: (puppy_edit as any).address ?? '',
                city: (puppy_edit as any).city ?? '',
                street: (puppy_edit as any).street ?? '',
                state: (puppy_edit as any).state ?? '',
                shortState: (puppy_edit as any).short_state ?? '',
                zipCode: (puppy_edit as any).zip_code ?? '',
            };
        }
        return defaultLocation;
    };

    const initialLocation = getInitialLocation();

    // Initialize form data
    const initialFormData: FormData = {
        images: puppy_edit?.preview_images ?? [],
        puppy_breeds: puppy_edit?.breeds ?? [],
        videos: puppy_edit?.video != null ? [puppy_edit?.video] : [],
        has_vaccine: puppy_edit?.has_vaccine ? 'yes' : 'no',
        has_health_certificate: puppy_edit?.has_health_certificate ? 'yes' : 'no',
        has_vet_exam: puppy_edit?.has_vet_exam ? 'yes' : 'no',
        has_delivery_included: puppy_edit?.has_delivery_included ? 'yes' : 'no',
        has_travel_ready: puppy_edit?.has_travel_ready ? 'yes' : 'no',
        certificate_type: puppy_edit?.certificate_type ?? null,
        puppy_price: puppy_edit?.price,
        puppy_name: puppy_edit?.name ?? '',
        puppy_gender: puppy_edit?.gender ?? 'Male',
        puppy_about: puppy_edit?.description ?? '',
        puppy_patterns: puppy_edit?.puppy_patterns ?? [],
        puppy_colors: puppy_edit?.puppy_colors ?? [],
        puppy_birth_date: puppy_edit?.birth_date ?? '',
        certificate_document: puppy_edit?.certificate_document ?? [],
        location_lat: initialLocation?.lat ?? null,
        location_lng: initialLocation?.lng ?? null,
        location_address: initialLocation?.address ?? null,
        location_city: initialLocation?.city ?? null,
        location_street: initialLocation?.street ?? null,
        location_state: initialLocation?.state ?? null,
        location_short_state: initialLocation?.shortState ?? null,
        location_zip_code: initialLocation?.zipCode ?? null,
    };

    const { post, put, data, setData, errors, processing } = useForm<FormData>(initialFormData)

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

        if (puppy_edit) {
            put(`/puppies-listing/${puppy_edit?.id}`);
        } else {
            post(`/puppies-listing`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card border">
                <div className="card-body">
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
                                    <InputLabel value="Date of Birth" isRequired={true} />
                                    <div>
                                        <DateInput name="puppy_birth_date" setData={setData} value={data.puppy_birth_date ?? ''} />
                                        {errors.puppy_birth_date && <InputError message={errors.puppy_birth_date} />}
                                    </div>
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
                        </div>
                    </div>
                    <div className="certificate-details border-bottom mb-4">
                        <SemiHeading title="Certificate & Registration" />
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-4">
                                    <div className="card border round">
                                        <div className="card-body p-3">
                                            <p className="mb-2 fw-semibold">Certificate Type</p>
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="form-check form-check-inline mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="certificate_type"
                                                        id="certificate_akc"
                                                        value="AKC"
                                                        checked={data.certificate_type === 'AKC'}
                                                        onChange={(e) => setData('certificate_type', e.target.value)}
                                                    />
                                                    <label
                                                        className="form-check-label fs-2"
                                                        htmlFor="certificate_akc"
                                                        onClick={() => setData('certificate_type', 'AKC')}
                                                    >
                                                        AKC
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="certificate_type"
                                                        id="certificate_ckc"
                                                        value="CKC"
                                                        checked={data.certificate_type === 'CKC'}
                                                        onChange={(e) => setData('certificate_type', e.target.value)}
                                                    />
                                                    <label
                                                        className="form-check-label fs-2"
                                                        htmlFor="certificate_ckc"
                                                        onClick={() => setData('certificate_type', 'CKC')}
                                                    >
                                                        CKC
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="certificate_type"
                                                        id="certificate_other"
                                                        value="Other"
                                                        checked={data.certificate_type === 'Other'}
                                                        onChange={(e) => setData('certificate_type', e.target.value)}
                                                    />
                                                    <label
                                                        className="form-check-label fs-2"
                                                        htmlFor="certificate_other"
                                                        onClick={() => setData('certificate_type', 'Other')}
                                                    >
                                                        Other
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="certificate_type"
                                                        id="certificate_none"
                                                        value="None"
                                                        checked={data.certificate_type === 'None'}
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                certificate_type: e.target.value,
                                                                certificate_document: []
                                                            });
                                                        }}
                                                    />
                                                    <label
                                                        className="form-check-label fs-2"
                                                        htmlFor="certificate_none"
                                                        onClick={() => {
                                                            setData({
                                                                ...data,
                                                                certificate_type: 'None',
                                                                certificate_document: []
                                                            });
                                                        }}
                                                    >
                                                        None
                                                    </label>
                                                </div>
                                            </div>
                                            {data.certificate_type && data.certificate_type !== 'None' && (
                                                <div className="col-12 mt-3">
                                                    <div className="mb-4">
                                                        <p className="mb-2 fw-semibold">Upload Certificate</p>
                                                        <GenericFileUpload
                                                            defaultUrls={data.certificate_document ?? []}
                                                            setData={(name, files: any) => setData('certificate_document', files)}
                                                            errors={errors}
                                                            name="certificate_document"
                                                            required={false}
                                                            fileType="documents"
                                                            accept=".pdf,.doc,.docx"
                                                            label="Certificate Document"
                                                            description="Upload PDF or Word document"
                                                            borderColor="#ff8c00"
                                                            hoverBorderColor="#ff8c00"
                                                            backgroundColor="#fff5e6"
                                                        />
                                                        {errors.certificate_document && <InputError message={errors.certificate_document} />}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {errors.certificate_type && <InputError message={errors.certificate_type} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="puppy-bio border-bottom mb-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-4">
                                    <InputLabel value="Puppy Bio" isRequired={true} />
                                    <textarea value={data.puppy_about ?? ''} onChange={(e) => setData('puppy_about', e.target.value)} className="form-control rounded-1" id="About" rows={3} placeholder=""></textarea>
                                    {errors.puppy_about && <InputError message={errors.puppy_about} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="location-details border-bottom mb-4">
                        <SemiHeading title="Location" />
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-4">
                                    <InputLabel value="Puppy Location" />
                                    <p className="text-muted small mb-3">
                                        {defaultLocation ? 'Default location from your account is pre-filled. You can change it if needed.' : 'Select the location for this puppy listing. You can use the map to search or manually enter the address below.'}
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
                                    <InputLabel value="Full Address" isRequired={true} />
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
                                    <InputLabel value="House & Street No" isRequired={true} />
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
                                    <InputLabel value="State Code" isRequired={true} />
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
                                    <InputLabel value="Zip Code" isRequired={true} />
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
                    <div className="upload-details border-bottom mb-4">
                        <div className="row">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <GenericFileUpload
                                    defaultUrls={data.images ?? []}
                                    setData={(name, files: any) => setData('images', files)}
                                    errors={errors}
                                    name="images"
                                    required={true}
                                    fileType="images"
                                    accept=".jpg,.jpeg,.png,.gif,.webp"
                                    label="Upload Images"
                                    description="Upload puppy images (JPG, PNG, GIF, WebP)"
                                    innerText="Drag and drop a images here, or click to upload"
                                    watermark={{
                                        text: 'urpuppy.com',
                                        opacity: 0.3,
                                        position: 'tile',
                                        fontSize: undefined,
                                        color: '#ffffff'
                                    }}
                                />
                                {errors.images && <InputError message={errors.images} />}

                            </div>
                            <div className="col-lg-6">
                                <GenericFileUpload
                                    name="videos"
                                    errors={errors}
                                    setData={(name, files: any) => setData('videos', files)}
                                    defaultUrls={data.videos ?? []}
                                    required={false}
                                    fileType="videos"
                                    accept=".mp4,.mov,.avi,.webm"
                                    label="Upload Video"
                                    description="Upload puppy video (MP4, MOV, AVI, WebM)"
                                    innerText="Drag and drop a video here, or click to upload"
                                />
                                {errors.videos && <InputError message={errors.videos} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button disabled={processing} type="submit" className="btn btn-primary d-flex align-items-center gap-2">
                <img src="../images/svgs/icon-arrow-right.svg" alt="urpuppy-img" /> {puppy_edit ? 'Update Listing' : 'Create Listing'}
            </button>
        </form>
    )
}

export default PuppyListingForm

