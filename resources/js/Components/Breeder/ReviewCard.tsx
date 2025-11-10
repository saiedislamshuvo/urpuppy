import React from 'react'

import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import Avatar from '../Avatar';

const ReviewCard = ({ comment }: { comment: App.Data.CommentData }) => {
  const CustomStar = (
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  )

  const myStyles = {
    itemShapes: CustomStar,
    itemStrokeWidth: 2,
    activeFillColor: 'var(--bs-primary)',
    activeStrokeColor: '#99F6E4',
    inactiveFillColor: 'var(--bs-gray-400)',
  }

  return (
    <div className="item">
      <div className="card border">
        <div className="card-body">
          <div className="mb-3">
            <Rating
              className="card-rating"
              itemStyles={myStyles}

              style={{ maxWidth: 120 }} readOnly value={comment.rating} />
          </div>
          <p className="text-dark swiper-no-swiping">
            {comment.body}
          </p>
          <div className="d-flex align-items-center gap-6">
            <div className=" position-relative overflow-hidden rounded-circle flex-shrink-0">
              <Avatar size={'sm'} image_url={comment?.reviewer?.avatar ?? ""} initial_name={comment?.reviewer?.initial_name ?? 'UP'} />
            </div>
            <div>
              <h6 className="fs-3 mb-0 swiper-no-swiping ">{comment?.reviewer?.full_name ?? 'Deleted User'}</h6>
              <p className="mb-0 fs-2 swiper-no-swiping">{comment.review_on}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
