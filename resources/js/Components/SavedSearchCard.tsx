import { Link, router } from '@inertiajs/react'
import React from 'react'
import Button from './ui/Button';

const SavedSearchCard = ({saved_search} : {
    saved_search: App.Data.SavedSearchData
}) => {

   const handleSearch = () => {
    const payload = Object.entries(saved_search.payload.filter).map(([key, obj]) => ({
        [key]: obj?.value ?? obj
    }));

    const flattenedPayload = payload.reduce((acc, current) => {
        const [key, value] = Object.entries(current)[0];
        acc[key] = value;
        return acc;
    }, {});

    router.visit(`/puppies`, {
        data: { filter: flattenedPayload },
            only: [
            'puppies',
            'breed_filter_list',
            'state_filter_list',
            ],
        method: 'get',
        preserveState: true,
    });
};

  return (
    <div className="card border">
      <div className="card-body">
        <h6 className="mb-4">{saved_search.name ?? saved_search.created_at}</h6>
        <div className="d-flex align-items-center gap-6">
          <Button type="button" onClick={handleSearch} className="btn btn-primary fs-2" href="#">View Search</Button>
          <Link aria-label="Delete saved search" className="btn btn-outline-extralight border btn-white text-dark fs-2" href={`/saved-search/${saved_search.id}`}>Delete</Link>
        </div>
      </div>
    </div>
)
}

export default SavedSearchCard

