import Avatar from '@/Components/Avatar'
import React from 'react'

const PostCommentCard = ({
    comment
}: {
        comment: App.Data.CommentData
    }) => {
  return (

    <div className="card border mb-3">
        <div className="card-body">
                <div className="d-flex gap-3">
                    <Avatar image_url={comment.reviewer?.avatar} size="sm" initial_name={comment.reviewer?.initial_name} />
                    <div className="d-flex">
                        <div>
                            <div className="d-flex align-items-center  gap-2">
                                <div style={{
                                    fontWeight: '500',
                                    color: 'rgba(8, 49, 78, 1)'
                                }} className="fs-3">{comment.reviewer?.full_name}</div>
                                <div className="rounded-circle" style={{

                                    backgroundColor: 'rgba(8, 49, 78, 0.4)',
                                    width: '4px',
                                    height: '4px',
                                }}></div>

                                <span>{comment.review_on}</span>

                            </div>
                            <span>{comment.body}</span>
                        </div>


                    </div>


                </div>

        </div>
    </div>
    )
}

export default PostCommentCard
