import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function ProjectGridItem({ details }) {
  return (
    <li className="group relative flex flex-col items-start">      
    <a href="#" class="flex md:flex-col items-center bg-white border border-gray-200 rounded-lg shadow flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full rounded-t-lg h-48 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt="" />
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
    </a>
    </li>
  );
}

ProjectGridItem.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    github_link: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
  }),
};
