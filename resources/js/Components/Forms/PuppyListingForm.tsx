import React from 'react'
import TextInput from '../TextInput'
import InputLabel from '../InputLabel'
import SemiHeading from '../SemiHeading'
import YesOrNoRadioInput from '../YesOrNoRadioInput'
import { useForm, usePage } from '@inertiajs/react'
import FileUpload from '../FileUpload'
import DateInput from '../DateInput'
import SelectInput from '../SelectInput'
import InputError from '../InputError'
import { parseInt } from 'lodash'

const PuppyListingForm = ({
    puppy_edit
}: {
    puppy_edit: App.Data.PuppyEditData | null
}) => {
    const patterns = usePage().props.patterns as App.Data.PatternData[];
    const colors = usePage().props.colors as App.Data.OptionData[];
    const siblings = usePage().props.siblings as App.Data.SiblingData[];
    const breeds = usePage().props.breeds as App.Data.BreedOptionData[];

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
        has_certificate?: string;
        certificate_type?: string | null;
        puppy_price?: number;
        puppy_name?: string;
        puppy_gender?: string;
        puppy_about?: string;
        puppy_patterns?: any[];
        puppy_colors?: any[];
        puppy_birth_date?: string;
        puppy_siblings?: any[];
        certificate_document?: any[];
    };

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
        has_certificate: puppy_edit?.has_certificate ? 'yes' : 'no',
        certificate_type: puppy_edit?.certificate_type ?? null,
        puppy_price: puppy_edit?.price,
        puppy_name: puppy_edit?.name ?? '',
        puppy_gender: puppy_edit?.gender ?? 'Male',
        puppy_about: puppy_edit?.description ?? '',
        puppy_patterns: puppy_edit?.puppy_patterns ?? [],
        puppy_colors: puppy_edit?.puppy_colors ?? [],
        puppy_birth_date: puppy_edit?.birth_date ?? '',
        puppy_siblings: puppy_edit?.siblings ?? [],
        certificate_document: puppy_edit?.certificate_document ?? []
    };

    const { post, put, data, setData, errors, processing } = useForm<FormData>(initialFormData)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (puppy_edit) {
            put(`/account/puppies/${puppy_edit?.id}`);
        } else {
            post(`/account/puppies`);
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
                </div>
            </div>

            <button disabled={processing} type="submit" className="btn btn-primary d-flex align-items-center gap-2">
                <img src="../images/svgs/icon-arrow-right.svg" alt="urpuppy-img" /> {puppy_edit ? 'Update Listing' : 'Create Listing'}
            </button>
        </form>
    )
}

export default PuppyListingForm

