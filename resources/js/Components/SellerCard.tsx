import React, { useState } from 'react'
import SocialMediaButtons from './SocialMediaButtons'
import Avatar from './Avatar';
import ChatButton from './ChatButton';
import { usePage } from '@inertiajs/react';

const SellerCard = ({
  seller
}: {
  seller: App.Data.BreederData
}) => {
  const { auth } = usePage().props;
  const currentUser = auth?.user as any;
  const [emailVisible, setEmailVisible] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);

  return (

    <div className="card shadow">
      <div className="card-body">
        <div className="text-center position-relative mb-6 mx-auto d-table">
          <Avatar image_url={seller.avatar} />

          {seller.is_breeder &&
            <span
              className="position-absolute bottom-0 end-0 d-block round-24 rounded-circle bg-primary d-flex align-items-center justify-content-center">
              <img src="/images/svgs/icon-paws.svg" alt="urpuppy-img" width="16" height="16" />
            </span>
          }
        </div>
        <h5 className="fs-5 text-center">{seller.full_name}</h5>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
          <img src="/images/svgs/icon-map-pin.svg" alt="urpuppy-img" width="20" height="20" />
          <p className="mb-0 fs-2">{seller.address}</p>
        </div>
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <img src="/images/svgs/icon-user-dark.svg" alt="urpuppy-img" width="14" height="14" />
            <p className="mb-0 fs-2">Member since: {seller.member_since}</p>
          </div>
          {((seller as any).is_breeder || (seller as any).is_seller) && (
            <div className="d-flex align-items-center justify-content-center gap-2">
              <img src="/images/svgs/icon-paws-dark.svg" alt="paw-icon" width="14" height="14" />
              <p className="mb-0 fs-2">
                {(seller as any).is_breeder && (seller as any).is_seller
                  ? 'Breeder & Seller'
                  : (seller as any).is_breeder
                    ? 'Breeder'
                    : 'Seller'}
              </p>
            </div>
          )}
        </div>


        <div>
          {/* Email Button */}
          {!emailVisible ? (
            <span
              onClick={() => setEmailVisible(true)}
              style={{ userSelect: "text" }}
              className="btn btn-outline-extralight btn-white text-dark hstack justify-content-center gap-2 mb-6 pointer"
            >
              <img src="/images/svgs/icon-mail-dark.svg" alt="urpuppy-img" />
              Show Email Address
            </span>
          ) : (
            <div className=" btn-outline-extralight btn-white text-dark hstack justify-content-center gap-2 mb-6">{seller.email}</div>
          )}

          {/* Phone Button */}
          {!phoneVisible ? (
            <span
              onClick={() => setPhoneVisible(true)}
              className="btn btn-outline-extralight btn-white text-dark hstack justify-content-center gap-2 mb-4"
            >
              <img src="/images/svgs/icon-call.svg" alt="urpuppy-img" />
              Show Phone Number
            </span>
          ) : (
            <div className=" btn-outline-extralight btn-white text-dark hstack justify-content-center gap-2 mb-4">{seller.phone_formatted}</div>
          )}

          {/* Chat Button */}
          {currentUser && seller?.id && currentUser.id !== seller.id && (
            <ChatButton
              senderId={currentUser.id}
              receiverId={seller.id}
              className="btn btn-primary w-100 hstack justify-content-center gap-2 mb-4"
            />
          )}
        </div>


        <p className="text-center">Follow me:</p>
        <SocialMediaButtons
          igUrl={seller?.social_ig}
          xUrl={seller.social_x}
          fbUrl={seller.social_fb}
          tiktokUrl={seller.social_tiktok}
          webUrl={seller.website}
        />
      </div>
    </div>

  )
}

export default SellerCard
