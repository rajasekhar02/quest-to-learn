import React from 'react';
import logo from 'assets/profile-picture.png'; // Tell webpack this JS file uses this image
import get from 'lodash.get';
import { useAboutMe } from './AboutMeContext';

export default function ProfilePicture() {
  const aboutMeContext = useAboutMe();
  return (
    <div className="image-mask profile-picture-holder">
      {aboutMeContext.userDetails ? (
        <img
          src={get(aboutMeContext.userDetails, 'profilePictureUrl.url') || logo}
          className="img-fluid rounded"
          alt="Profile"
          width="150"
        />
      ) : (
        <svg
          className="bd-placeholder-img img-fluid rounded"
          width="150"
          height="180"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#868e96" />
        </svg>
      )}
    </div>
  );
}
