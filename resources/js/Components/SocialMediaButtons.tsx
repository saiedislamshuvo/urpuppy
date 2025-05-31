import React from 'react'
import Tooltip from './Tooltip'

const SocialMediaButtons = ({igUrl, xUrl, fbUrl, tiktokUrl, webUrl} : {
    igUrl?: string | null,
    xUrl?: string | null,
    fbUrl?: string | null,
    tiktokUrl?: string | null,
    webUrl?: string | null
}) => {
  return (
    <ul className="list-unstyled d-flex align-items-center justify-content-center gap-6 social-icon mb-0">

            {fbUrl &&

                  <li>
                                <Tooltip
                                            tooltipMessage="Facebook"
                                            content={
                    <a target="_blank" href={fbUrl}
                      className="border d-flex align-items-center justify-content-center round-36 rounded-circle">
                      <img src="/images/svgs/icon-facebook-dark.svg" alt="urpuppy-img" />
                    </a>
                                            }
                               id={`fburl`}
                                        />

                  </li>
            }

            {xUrl &&
                  <li>
                                <Tooltip
                                            tooltipMessage="X"
                                            content={
                    <a target="_blank" href={xUrl} data-bs-toggle="tooltip" data-bs-title="Twitter"
                      className="border d-flex align-items-center justify-content-center round-36 rounded-circle">
                      <img src="/images/svgs/icon-twitter-dark.svg" alt="urpuppy-img"/>
                    </a>
                    } id={"xurl"} />
                  </li>
            }

            {tiktokUrl &&
                  <li>
                                <Tooltip
                                            tooltipMessage="Tiktok"
                                            content={
                    <a target="_blank" href={tiktokUrl} data-bs-toggle="tooltip" data-bs-title="Tiktok"
                      className="border d-flex align-items-center justify-content-center round-36 rounded-circle">
                      <img src="/images/svgs/icon-tiktok-dark.svg" alt="urpuppy-img" />
                    </a> } id="tiktokurl" />
                  </li>
            }

            {igUrl &&
                  <li>
                                <Tooltip
                                            tooltipMessage="Instagram"
                                            content={
                    <a target="_blank" href={igUrl} data-bs-toggle="tooltip" data-bs-title="Instagram"
                      className="border d-flex align-items-center justify-content-center round-36 rounded-circle">
                      <img src="/images/svgs/icon-instagram-dark.svg" alt="urpuppy-img" />
                    </a>
                    } id={"igurl"} />
                  </li>
            }

            {
                webUrl &&
                  <li>
                                <Tooltip
                                tooltipMessage="Website"
                                content={
                    <a target="_blank" href={webUrl} data-bs-toggle="tooltip" data-bs-title="Website"
                      className="border d-flex align-items-center justify-content-center round-36 rounded-circle">
                      <img src="/images/svgs/icon-globe-dark.svg" alt="urpuppy-img" />
                    </a>
                    } id={"weburl"} />
                  </li>

            }

    </ul>
  )
}

export default SocialMediaButtons
