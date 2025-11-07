import { Link } from '@inertiajs/react'
import Tooltip from './Tooltip'

const CompareButton = ({ puppyId, sellerId, isCompared, uniqueId = null }: {
    uniqueId?: string | null
    puppyId: number
    sellerId: number,
    isCompared?: boolean | null
}) => {
    return <> <Tooltip content={(

        <Link method="patch" preserveState={false} preserveScroll={false} href={`/compares/${puppyId}`} data-bs-toggle="tooltip" data-bs-title="Add To Compare"
            className="bg-white border d-flex align-items-center justify-content-center round-40 rounded-circle">
            {isCompared ? (
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1H12C12.7956 1 13.5587 1.31607 14.1213 1.87868C14.6839 2.44129 15 3.20435 15 4V15M11 8V19L6 16L1 19V8C1 7.20435 1.31607 6.44129 1.87868 5.87868C2.44129 5.31607 3.20435 5 4 5H8C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8Z" fill="#E88325" stroke="#E88325" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1H12C12.7956 1 13.5587 1.31607 14.1213 1.87868C14.6839 2.44129 15 3.20435 15 4V15M11 8V19L6 16L1 19V8C1 7.20435 1.31607 6.44129 1.87868 5.87868C2.44129 5.31607 3.20435 5 4 5H8C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8Z" stroke="#08314E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </Link>

    )} tooltipMessage="Add To Compare" id={`compare-${uniqueId ?? puppyId}`} />
    </>
}


export default CompareButton

