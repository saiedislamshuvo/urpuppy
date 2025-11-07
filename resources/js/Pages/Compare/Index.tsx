import Layout from '@/Layouts/Layout'
import React from 'react'
import Banner from '../Home/Sections/Banner'
import MetaTags from '@/Components/MetaTags'
import { PaginatedCollection } from '@/types/global'
import Pagination from '@/Components/Pagination'
import { Link } from '@inertiajs/react'

const Index = ({ compare_puppies }: {
    compare_puppies: PaginatedCollection<App.Data.PuppyData>
}) => {
    const puppies = compare_puppies.data || [];

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const compareFields = [
        { key: 'image', label: 'Image & Name' },
        { key: 'gender', label: 'Gender' },
        { key: 'birth_date', label: 'Date of Birth' },
        { key: 'price', label: 'Price' },
        { key: 'breed', label: 'Breed' },
        { key: 'color', label: 'Color' },
        { key: 'patterns', label: 'Patterns' },
        { key: 'traits', label: 'Traits' },
        { key: 'health_certificate', label: 'Health Certificate' },
        { key: 'vaccinated', label: 'Vaccinated' },
        { key: 'vet_examination', label: 'Vet Examination' },
        { key: 'travel_ready', label: 'Travel Ready' },
        { key: 'delivery_included', label: 'Delivery Included' },
    ];

    const getFieldValue = (puppy: App.Data.PuppyData, fieldKey: string) => {
        switch (fieldKey) {
            case 'image':
                return { type: 'image', value: puppy };
            case 'gender':
                return { type: 'text', value: puppy.gender || 'N/A' };
            case 'birth_date':
                return { type: 'text', value: formatDate(puppy.birth_date) };
            case 'price':
                return { type: 'text', value: puppy.formatted_price || 'N/A' };
            case 'breed':
                return { type: 'text', value: puppy.breeds?.map((b: any) => b.name).join(', ') || 'N/A' };
            case 'color':
                return { type: 'text', value: puppy.puppy_colors?.map((c: any) => c.name).join(', ') || 'N/A' };
            case 'patterns':
                return { type: 'text', value: puppy.patterns || 'N/A' };
            case 'traits':
                return { type: 'text', value: puppy.puppy_traits?.map((t: any) => t.name).join(', ') || 'N/A' };
            case 'health_certificate':
                return { type: 'boolean', value: puppy.has_health_certificate ?? false };
            case 'vaccinated':
                return { type: 'boolean', value: puppy.has_vaccine ?? false };
            case 'vet_examination':
                return { type: 'boolean', value: puppy.has_vet_exam ?? false };
            case 'travel_ready':
                return { type: 'boolean', value: puppy.has_travel_ready ?? false };
            case 'delivery_included':
                return { type: 'boolean', value: puppy.has_delivery_included ?? false };
            default:
                return { type: 'text', value: 'N/A' };
        }
    };

    return (
        <Layout>
            <MetaTags title="Compare" />
            <section
                className="hero-section position-relative d-flex align-items-center pt-11 pb-10">
                <div className="container position-relative z-1 pt-lg-1 mt-lg-3 mb-lg-4">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <h1 className="text-white text-center fs-11 mb-1" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="1000">My Compare List</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="puppy-spotlight py-7 py-md-5 py-xl-9">
                <div className="container">
                    {puppies.length > 0 ? (
                        <>
                            <div className="table-responsive mb-4 mb-lg-8">
                                <table className="table mb-0" style={{ borderCollapse: 'collapse', border: 'none' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ border: '1px solid #e0e0e0', borderTop: 'none', borderLeft: 'none', borderBottom: '1px solid #e0e0e0', padding: '1rem', backgroundColor: '#f8f9fa', fontWeight: 600, minWidth: '200px' }}>Information</th>
                                            {puppies.map((puppy: App.Data.PuppyData) => (
                                                <th key={puppy.id} style={{ border: '1px solid #e0e0e0', borderTop: 'none', borderRight: 'none', borderBottom: '1px solid #e0e0e0', padding: '1rem', backgroundColor: '#f8f9fa', fontWeight: 600, textAlign: 'center', minWidth: '200px' }}>
                                                    <Link href={`/puppies/${puppy.slug}`} className="text-decoration-none text-dark">
                                                        {puppy.name}
                                                    </Link>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {compareFields.map((field, fieldIndex) => (
                                            <tr key={field.key}>
                                                <td style={{ border: '1px solid #e0e0e0', borderLeft: 'none', borderTop: 'none', padding: '1rem', fontWeight: 500, backgroundColor: '#f8f9fa', verticalAlign: 'middle' }}>
                                                    {field.label}
                                                </td>
                                                {puppies.map((puppy: App.Data.PuppyData) => {
                                                    const fieldData = getFieldValue(puppy, field.key);
                                                    return (
                                                        <td key={puppy.id} style={{ border: '1px solid #e0e0e0', borderRight: 'none', borderTop: 'none', padding: '1rem', textAlign: 'center', verticalAlign: 'middle' }}>
                                                            {fieldData.type === 'image' ? (
                                                                <div className="d-flex flex-column align-items-center">
                                                                    <Link href={`/puppies/${puppy.slug}`}>
                                                                        <img
                                                                            src={puppy.image}
                                                                            alt={puppy.name}
                                                                            style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}
                                                                        />
                                                                    </Link>
                                                                    <Link href={`/puppies/${puppy.slug}`} className="text-decoration-none text-dark fw-medium">
                                                                        {puppy.name}
                                                                    </Link>
                                                                    {puppy.breeds && puppy.breeds.length > 0 && (
                                                                        <p className="text-muted mb-0 small">{puppy.breeds[0].name}</p>
                                                                    )}
                                                                </div>
                                                            ) : fieldData.type === 'boolean' ? (
                                                                fieldData.value ? (
                                                                    <span className="badge bg-success">Yes</span>
                                                                ) : (
                                                                    <span className="badge bg-secondary">No</span>
                                                                )
                                                            ) : (
                                                                <span>{String(fieldData.value)}</span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                        <tr>
                                            <td style={{ border: '1px solid #e0e0e0', borderLeft: 'none', borderTop: 'none', padding: '1rem', fontWeight: 500, backgroundColor: '#f8f9fa', verticalAlign: 'middle' }}>
                                                Remove from Compare
                                            </td>
                                            {puppies.map((puppy: App.Data.PuppyData) => (
                                                <td key={puppy.id} style={{ border: '1px solid #e0e0e0', borderRight: 'none', borderTop: 'none', padding: '1rem', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <Link
                                                        method="patch"
                                                        href={`/compares/${puppy.id}`}
                                                        preserveState={false}
                                                        preserveScroll={false}
                                                        className="d-inline-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            border: '1px solid #dc3545',
                                                            backgroundColor: 'transparent',
                                                            color: '#dc3545',
                                                            textDecoration: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = '#dc3545';
                                                            e.currentTarget.style.color = 'white';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                            e.currentTarget.style.color = '#dc3545';
                                                        }}
                                                        onClick={(e) => {
                                                            if (!confirm('Are you sure you want to remove this puppy from compare?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        title="Remove from Compare"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row mb-4 mb-lg-8">
                                <div className="col-12 text-center">
                                    <Link href="/puppies" className="btn btn-primary d-inline-flex align-items-center gap-2">
                                        <img loading="lazy" src="/images/svgs/icon-paws.svg" alt="urpuppy-img" />
                                        Add More Puppies to Compare
                                    </Link>
                                </div>
                            </div>
                            <Pagination links={compare_puppies.links} />
                        </>
                    ) : (
                        <div className="text-center py-5">
                            <p className="mb-4">No puppies in your compare list yet.</p>
                            <Link href="/puppies" className="btn btn-primary d-inline-flex align-items-center gap-2">
                                <img loading="lazy" src="/images/svgs/icon-paws.svg" alt="urpuppy-img" />
                                Add Puppies to Compare
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export default Index

