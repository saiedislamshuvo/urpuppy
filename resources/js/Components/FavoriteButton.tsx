import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import Tooltip from './Tooltip'

const FavoriteButton = ({puppyId, sellerId, isFavorite, uniqueId = null} : {
    uniqueId?: string | null
    puppyId: number
    sellerId: number,
    isFavorite?: boolean | null
}) => {
  const user = usePage().props?.auth?.user

  return user?.roles?.includes('buyer') && <> <Tooltip content={  (


                          <Link method="patch" preserveState preserveScroll href={`/favorites/${puppyId}`} data-bs-toggle="tooltip" data-bs-title="Add To Favourite"
                            className="bg-white border d-flex align-items-center justify-content-center round-40 rounded-circle">
                {
                    isFavorite ? (
                        <img src="/images/svgs/icon-heart-red.svg" alt="" />
                    ) : (
                        <img src="/images/svgs/icon-heart.svg" alt="" />
                    )
                }
                          </Link>

  )} tooltipMessage="Add To Favorite"  id={`favorite-${uniqueId ?? puppyId}`}/>
</>
}


export default FavoriteButton
