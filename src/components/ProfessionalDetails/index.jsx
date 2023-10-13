import { useEffect, useState } from "react";
import {
  getEducationDetails,
  getExperienceDetails
} from "../../routes/AboutMe/services";
import PropTypes from "prop-types";
import { format as formatDate, formatDuration } from "date-fns";
import get from "lodash.get";

let EducationItem = function ({ details }) {
  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <img
          alt=""
          loading="lazy"
          width="32"
          height="32"
          decoding="async"
          data-nimg="1"
          className="h-7 w-7"
          style={{ color: "transparent" }}
          src={details.imageUrl.url}
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">University</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {details.specialization}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {<a href={details.universityLink}>{details.universityName}</a>}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
          <time dateTime={details.startDate}>
            {formatDate(
              new Date(get(details, "startDate", new Date())),
              "MMM yyyy"
            )}
          </time>{" "}
          <span aria-hidden="true">—</span>
          <time dateTime={details.endDate}>
            {formatDate(
              new Date(get(details, "endDate", new Date())),
              "MMM yyyy"
            )}
          </time>
        </dd>
      </dl>
    </li>
  );
};
EducationItem.propTypes = {
  details: PropTypes.shape({
    universityName: PropTypes.string,
    universityLink: PropTypes.string,
    isCurrent: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    specialization: PropTypes.string,
    educationSlug: PropTypes.string,
    detailType: PropTypes.oneOf(["EDU", "WORK"]),
    imageUrl: PropTypes.shape({ url: PropTypes.string })
  })
};

let WorkItem = function ({ details }) {
  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <img
          alt=""
          loading="lazy"
          width="32"
          height="32"
          decoding="async"
          data-nimg="1"
          className="h-7 w-7"
          style={{ color: "transparent" }}
          src={details.imageUrl.url}
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">University</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {details.role}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {<a href={details.companyLink}>{details.companyName}</a>}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
          <time dateTime={details.startDate}>
            {formatDate(
              new Date(get(details, "startDate", new Date())),
              "MMM yyyy"
            )}
          </time>{" "}
          <span aria-hidden="true">—</span>
          <time dateTime={details.endDate}>
            {formatDate(
              new Date(get(details, "endDate", new Date())),
              "MMM yyyy"
            )}
          </time>
        </dd>
      </dl>
    </li>
  );
};

WorkItem.propTypes = {
  details: PropTypes.shape({
    companyName: PropTypes.string,
    companyLink: PropTypes.string,
    role: PropTypes.string,
    technologiesUsed: PropTypes.string,
    isCurrent: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    experienceSlug: PropTypes.string,
    imageUrl: PropTypes.shape({ url: PropTypes.string })
  })
};

const DownloadResumeButton = function () {
  return (
    <a
      className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"
      href="https://docs.google.com/viewer?url=https://docs.google.com/document/d/12jheehLMiG0Q9Bp0SZ4AZ2ThEcqFmWjN-yJs7Mj7NY8/export?format=pdf"
    >
      Download CV
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
      >
        <path
          d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </a>
  );
};

// const initialState = {
//   loading: true,
//   error: "",
//   data: []
// };
// const detailsReducer = function (state, action) {
//   switch (action.type) {
//     case "FETCH_SUCCESS":
//       return {
//         loading: false,
//         data: action.payload,
//         error: ""
//       };
//     case "FETCH_ERROR":
//       return {
//         loading: false,
//         data: [],
//         error: "Unable to Fetch data"
//       };
//     default:
//       return state;
//   }
// };

export default function ProfessionalDetails() {
  const [allDetails, setAllDetails] = useState([]);
  useEffect(() => {
    (async function () {
      const educationPromise = getEducationDetails();
      const experiencePromise = getExperienceDetails();
      Promise.all([educationPromise, experiencePromise]).then(data => {
        setAllDetails(() =>
          data.flat(1).sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
        );
      });
    })();
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 flex-none"
        >
          <path
            d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
            className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
          ></path>
          <path
            d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
            className="stroke-zinc-400 dark:stroke-zinc-500"
          ></path>
        </svg>
        <span className="ml-3">Education and Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {allDetails.map((item, index) => {
          switch (item.detailType) {
            case "EDU":
              return (
                <EducationItem
                  details={item}
                  key={`professional-details-${index}`}
                ></EducationItem>
              );
            case "WORK":
              return (
                <WorkItem
                  key={`professional-details-${index}`}
                  details={item}
                ></WorkItem>
              );
          }
        })}
      </ol>
      <DownloadResumeButton></DownloadResumeButton>
    </div>
  );
}