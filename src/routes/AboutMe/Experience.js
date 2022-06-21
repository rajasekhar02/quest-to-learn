import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import get from 'lodash.get';
import { format as formatDate } from 'date-fns';
// import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getExperienceDetails } from './services';

const richTextToReactOptions = {
  renderNode: {
    'ordered-list': (node, children) => (
      <ol className="list-group list-group-numbered">{children}</ol>
    ),
    'list-item': (node, children) => (
      // console.log(node.content[0].content[0].value);
      <li className="list-group-item d-flex list-item-experience">
        {children}
      </li>
    ),
  },
};

const renderExperienceDetailsCollapse = function (
  experienceDetails,
  stringSlug,
) {
  return experienceDetails.map((eachExperience) => {
    const getExpKeyValue = (key, defaultValue = undefined) => get(eachExperience, key, defaultValue);
    return (
      <div className="list-group" key={getExpKeyValue('experienceSlug')}>
        <a
          href={`/about-me/${getExpKeyValue('experienceSlug')}`}
          role="button"
          data-toggle="collapse-mst-study"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{getExpKeyValue('companyName')}</h5>
            <small>
              {`${
                getExpKeyValue('isCurrent', false) ? 'Current' : ''
              } ${formatDate(
                new Date(getExpKeyValue('startDate', new Date())),
                'MMM yyyy',
              )}
              -
              ${formatDate(
                new Date(getExpKeyValue('endDate', new Date())),
                'MMM yyyy',
              )}`}
            </small>
          </div>
          <p className="mb-1">{getExpKeyValue('role')}</p>
          <small className="text-muted">
            {getExpKeyValue('technologiesUsed')}
          </small>
        </a>
        <div
          className={`collapse ${
            [getExpKeyValue('experienceSlug'), undefined].includes(
              stringSlug,
            ) && 'show'
          }`}
        >
          <div className="card card-body">
            {documentToReactComponents(
              getExpKeyValue('jobDescription.json'),
              richTextToReactOptions,
            )}
          </div>
        </div>
      </div>
    );
  });
};

const renderExperienceDetailsPlaceHolder = function () {
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
        <div className="mt-2 placeholder col-4" />
        {/* <br /> */}
        <div className="mt-2 placeholder col-9" />
      </div>
      <div className="collapse show">
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

export default function Experience() {
  const { string_slug: stringSlug } = useParams();
  const [experienceDetails, setExperienceDetials] = React.useState([]);
  useEffect(() => {
    (async function () {
      const response = await getExperienceDetails();
      setExperienceDetials(response);
    }());
  }, []);
  return (
    <section className="experience mt-3">
      <p className="heading fw-bold fs-4 border-bottom">Experience</p>
      {experienceDetails.length === 0
        ? renderExperienceDetailsPlaceHolder()
        : renderExperienceDetailsCollapse(experienceDetails, stringSlug)}
    </section>
  );
}
