import { Link } from '@inertiajs/react'
import Tooltip from './Tooltip'

const FavoriteButton = ({ puppyId, sellerId, isFavorite, uniqueId = null }: {
    uniqueId?: string | null
    puppyId: number
    sellerId: number,
    isFavorite?: boolean | null
}) => {
    return <> <Tooltip content={(


        <Link method="patch" preserveState preserveScroll href={`/favorites/${puppyId}`} data-bs-toggle="tooltip" data-bs-title="Add To Favourite"
            className="bg-white border d-flex align-items-center justify-content-center round-40 rounded-circle">
            {
                isFavorite ? (
                    <img src="/images/svgs/icon-heart-red.svg" alt="urpuppy-img" />
                ) : (
                    <img src="/images/svgs/icon-heart.svg" alt="urpuppy-img" />
                )
            }
        </Link>

    )} tooltipMessage="Add To Favorite" id={`favorite-${uniqueId ?? puppyId}`} />
    </>
}


export default FavoriteButton
