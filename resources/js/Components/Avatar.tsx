import React from 'react'
import InitialName from './InitialName'


const Avatar = ({image_url, initial_name, size = 'md' } : { image_url?: string, initial_name?: string, size?: 'sm' | 'md' }) => {
  return (
      <div
            style={{
                width: size == 'md' ? '96px' : '50px',
                height: size == 'md' ? '96px' : '50px'
            }}

            className={`${size == 'md' ? 'round-96' : 'rounded-40 ' }  object-fit-cover rounded-circle position-relative overflow-hidden`}>
            {image_url != ""  && image_url != null ? (
         <img src={image_url} alt="urpuppy-img"
          className="object-fit-cover w-100 h-100" />
            ):
            <InitialName initial_name={initial_name} size={size} />
            }
      </div>
  )
}

export default Avatar
