import React from 'react'

const Gender = ({gender} : {gender: string}) => {
  return (
  <>

                      <div className="d-flex align-items-center gap-2">
            {
                gender == 'Male' ? (
                      <>
                        <img loading="lazy" src="/images/svgs/icon-male.svg" alt="urpuppy-img" width="20" height="20" />
                        <p className="mb-0">{gender}</p>
</>
                ) : (
                        <>
                        <img loading="lazy" src="/images/svgs/icon-female.svg" alt="urpuppy-img" width="20" height="20" />
                        <p className="mb-0">{gender}</p>
</>
                )

            }

                      </div>

        </>

  )
}

export default Gender
