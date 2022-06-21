import React, { useEffect } from "react";
import ProfilePicture from "./ProfilePicture";
import { getUserDetails } from "./services";
import { useAboutMe } from "./AboutMeContext";
import get from "lodash.get";

const renderHomeAddress = function (getPropertiesFromUserDetails) {
  return (
    <li className="list-group-item">
      <a
        className="contact-link"
        href={getPropertiesFromUserDetails(
          "contactDetails.houseAddress.googleMapsLink"
        )}
      >
        <address>
          <i className="bi bi-geo-alt-fill"> </i>
          <span>
            {getPropertiesFromUserDetails(
              "contactDetails.houseAddress.addressLine1"
            )}
            ,
          </span>
          <div className="ms-4">
            {getPropertiesFromUserDetails("contactDetails.houseAddress.city")},
          </div>
          <div className="ms-4">
            {getPropertiesFromUserDetails("contactDetails.houseAddress.state")}-
            {getPropertiesFromUserDetails(
              "contactDetails.houseAddress.pinCode"
            )}
          </div>
        </address>
      </a>
    </li>
  );
};

const renderPhoneNumber = function (getPropertiesFromUserDetails) {
  return (
    <li className="list-group-item">
      <a
        className="contact-link"
        href={`tel:+${getPropertiesFromUserDetails(
          "contactDetails.phoneNumber.number"
        )}`}
      >
        <i className="bi bi-phone">
          &nbsp;
          {getPropertiesFromUserDetails(
            "contactDetails.phoneNumber.displayNumber"
          )}
        </i>
      </a>
    </li>
  );
};

const renderEmail = function (getPropertiesFromUserDetails) {
  return (
    <li className="list-group-item">
      <a
        className="contact-link"
        href={`mailto:${getPropertiesFromUserDetails("contactDetails.email")}`}
      >
        <i className="bi bi-envelope">
          &nbsp; {getPropertiesFromUserDetails("contactDetails.email")}
        </i>
      </a>
    </li>
  );
};

const renderGithubLink = function (getPropertiesFromUserDetails) {
  return (
    <li className="list-group-item">
      <a
        className="contact-link"
        href={getPropertiesFromUserDetails(
          "contactDetails.githubProfileLink.link"
        )}
      >
        <i className="bi bi-github">
          &nbsp;
          {getPropertiesFromUserDetails(
            "contactDetails.githubProfileLink.title"
          )}
        </i>
      </a>
    </li>
  );
};

const renderLinkedInLink = function (getPropertiesFromUserDetails) {
  return (
    <li className="list-group-item">
      <a
        className="contact-link"
        href={getPropertiesFromUserDetails(
          "contactDetails.linkedInProfileLink.link"
        )}
      >
        <i className="bi bi-linkedin">
          &nbsp;
          {getPropertiesFromUserDetails(
            "contactDetails.linkedInProfileLink.title"
          )}
        </i>
      </a>
    </li>
  );
};

const renderSideNav = function (aboutMeContext) {
  const getPropertiesFromUserDetails = function (
    path,
    defaultValue = "Loading..."
  ) {
    return get(aboutMeContext.userDetails, path, defaultValue);
  };
  return (
    <>
      <div className="profile-picture">
        <ProfilePicture />
      </div>
      <div className="name fs-4 fw-semibold">
        {["firstName", "lastName"].reduce((acc, currKey, index) => {
          return `${acc} ${get(
            aboutMeContext.userDetails,
            currKey,
            index === 0 ? "Loading..." : ""
          )}`;
        }, "")}
      </div>
      <div className="work-motto mt-3">
        <figure className="text-center">
          <blockquote className="blockquote">
            <p className="fs-6">
              {get(aboutMeContext.userDetails, "quotes.text", "Loading ...")}
            </p>
          </blockquote>
          <figcaption className="blockquote-footer">
            {get(aboutMeContext.userDetails, "quotes.author", "Loading ...")}
          </figcaption>
        </figure>
      </div>
      <div className="contact-info-container">
        <ul className="list-group list-group-flush contact-info">
          <li className="list-group-item fw-semibold text-center">Contact</li>
          {renderHomeAddress(getPropertiesFromUserDetails)}
          {renderPhoneNumber(getPropertiesFromUserDetails)}
          {renderEmail(getPropertiesFromUserDetails)}
          {renderGithubLink(getPropertiesFromUserDetails)}
          {renderLinkedInLink(getPropertiesFromUserDetails)}
        </ul>
      </div>
    </>
  );
};

const renderSideNavPlaceholder = function () {
  return (
    <>
      <div className="profile-picture">
        <ProfilePicture />
      </div>
      <div className="name fs-4 fw-semibold">
        <div className="placeholder col-3"></div>
        <div className="placeholder ms-3 col-2"></div>
        <div className="placeholder ms-3 col-2"></div>
      </div>
      <div className="work-motto mt-3">
        <figure className="text-center">
          <blockquote className="blockquote">
            <div className="fs-6">
              <div className="placeholder col-3"></div>
              <div className="ms-3 placeholder col-3"></div>
              <div className="ms-3 placeholder col-3"></div>
              <div className="ms-3 placeholder col-2"></div>
              <div className="ms-2 placeholder col-2"></div>
            </div>
          </blockquote>
          <figcaption className="blockquote-footer">
            <div className="placeholder col-3"></div>
          </figcaption>
        </figure>
      </div>
      <div className="contact-info-container">
        <ul className="list-group list-group-flush contact-info">
          <li className="list-group-item fw-semibold text-center">Contact</li>
          <li className="list-group-item">
            <address>
              <i className="bi bi-geo-alt-fill"></i>
              <span className="placeholder ms-2 col-4"></span>
              {Array(4)
                .fill(1)
                .map((value, lineIndex) => {
                  return (
                    <div
                      className={`placeholder ms-4 col-${lineIndex + 1}`}
                      key={lineIndex}
                    ></div>
                  );
                })}
            </address>
          </li>
          {[
            "bi bi-phone",
            "bi bi-envelope",
            "bi bi-github",
            "bi bi-linkedin",
          ].map((iconName) => {
            return (
              <li className="list-group-item" key={iconName}>
                <i className={iconName}>
                  &nbsp; <div className="placeholder col-7"></div>
                </i>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
// const render
export default function SideBar() {
  const aboutMeContext = useAboutMe();

  useEffect(() => {
    (async () => {
      const response = await getUserDetails();
      aboutMeContext.setUserDetails(response);
      console.log(response);
    })();
  }, []);
  return (
    <aside className="side-container border-end flex-grow-3 p-3 placeholder-glow">
      {aboutMeContext.userDetails
        ? renderSideNav(aboutMeContext)
        : renderSideNavPlaceholder()}
    </aside>
  );
}
