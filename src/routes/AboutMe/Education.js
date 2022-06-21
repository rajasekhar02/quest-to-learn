import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import get from "lodash.get";
import { format as formatDate } from "date-fns";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getEducationDetails } from "./services";

const renderEducationDetailsCollapses = function (
  educationDetails,
  stringSlug
) {
  return educationDetails.map((eachEducationDetail) => {
    const getEduKeyValue = (key, defaultValue = undefined) => get(eachEducationDetail, key, defaultValue);
    return (
      <div className="list-group" key={getEduKeyValue("educationSlug")}>
        <a
          href={`/about-me/${get(eachEducationDetail, "educationSlug")}`}
          role="button"
          data-toggle="collapse-mst-study"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">
              {get(eachEducationDetail, "universityName")}
            </h5>
            <small
              className={`${
                get(eachEducationDetail, "isCurrent", false) && "fw-bolder fs-6"
              }`}
            >
              {`${formatDate(
                new Date(get(eachEducationDetail, "startDate", new Date())),
                "MMM yyyy"
              )}
                    -
                    ${formatDate(
                new Date(get(eachEducationDetail, "endDate", new Date())),
                "MMM yyyy"
              )}
                  `}
            </small>
          </div>
          <p className="mb-1">{get(eachEducationDetail, "specialization")}</p>
        </a>
        <div
          className={`collapse ${[
            get(eachEducationDetail, "educationSlug"),
            undefined,
          ].includes(stringSlug)} ${
            get(eachEducationDetail, "coursesEnrolledCollection.items", [])
              .length !== 0 && "show"
          }`}
        >
          <div className="card card-body">
            {get(
              eachEducationDetail,
              "coursesEnrolledCollection.items",
              []
            ).map((eachCourse) => (
              <details key={eachCourse.title}>
                <summary>{eachCourse.title}</summary>
                {documentToReactComponents(
                  get(eachCourse, "courseDescription.json")
                )}
              </details>
            ))}
          </div>
        </div>
      </div>
    );
  });
};

const renderEducationDetailsPlaceHolder = function () {
  return [1, 2].map((listItem) => (
    <div
      className="list-group placeholder-glow"
      aria-hidden="true"
      key={listItem}
    >
      <div
        // href={`/about-me/${get(eachEducationDetail, "educationSlug")}`}
        role="button"
        data-toggle="collapse-mst-study"
        className="list-group-item list-group-item-action"
        aria-current="true"
      >
        <div className="d-flex w-100 justify-content-between">
          <span className="placeholder col-8" />
          <span className="placeholder col-2" />
        </div>
        <span className="mt-2 placeholder col-4" />
      </div>
      <div className={`collapse ${listItem === 1 && "show"}`}>
        <div className="card card-body">
          {[1, 2].map((placeholder) => (
            // <div key={placeholder}>
            <span className="ms-n2" key={placeholder}>
              <span className="ms-2 placeholder col-5" />
              <span className="ms-2 placeholder col-3" />
              <span className="ms-2 placeholder col-1" />
              <span className="ms-2 placeholder col-2" />
              <span className="ms-2 placeholder col-4" />
              <span className="ms-2 placeholder col-2" />
            </span>
          ))}
        </div>
      </div>
    </div>
  ));
};
export default function Education() {
  const { string_slug: stringSlug } = useParams();
  const [educationDetails, setEducationDetials] = React.useState([]);
  useEffect(() => {
    (async function () {
      const response = await getEducationDetails();
      setEducationDetials(response);
    }());
  }, []);
  return (
    <section className="education mt-3">
      <p className="heading fw-bold fs-4 border-bottom">Education</p>
      {educationDetails.length === 0
        ? renderEducationDetailsPlaceHolder()
        : renderEducationDetailsCollapses(educationDetails, stringSlug)}
    </section>
  );
}
