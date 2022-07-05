import React, { useEffect } from "react";
import { Tooltip } from "bootstrap";
import { NavLink } from "react-router-dom";
// const handleOnMouseOver = function (event) {
//   event.stopPropagation();
//   console.log(event.target);
//   const tooltip = new Tooltip(event.target, { title: "asdfsdf" });
//   console.log(tooltip);
//   tooltip.show();
// };

export default function SideNav() {
  const sideNavRef = React.useRef(null);
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      sideNavRef.current.querySelectorAll(`[data-bs-toggle="tooltip"]`)
    );
    tooltipTriggerList.forEach(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );
  }, []);
  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-light"
      style={{ width: "4.5rem" }}
      ref={sideNavRef}
    >
      <NavLink
        to="./dashboard"
        className={({ isActive }) => `d-block p-3 link-dark text-decoration-none text-center ${
          isActive && "active"
        }`}
        title=""
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        data-bs-original-title="Icon-only"
      >
        <img
          width="24px"
          height="24px"
          className="mb-auto"
          alt="Splitwise"
          src="https://avatars.githubusercontent.com/u/1584483?s=24&v=4"
        />
        <span className="visually-hidden">Icon-only</span>
      </NavLink>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <NavLink
            to="home"
            className={({ isActive }) => `nav-link py-3 border-bottom ${isActive && "active"}`}
            aria-current="page"
            title="Home"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Home"
          >
            <i className="bi bi-house fs-4" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) => `nav-link py-3 border-bottom ${isActive && "active"}`}
            title="Dashboard"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Dashboard"
          >
            <i className="bi bi-speedometer2 fs-4" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="expenses"
            className={({ isActive }) => `nav-link py-3 border-bottom ${isActive && "active"}`}
            title="Expenses"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Expenses"
          >
            <i className="bi bi-table fs-4" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="splitshare-calculator"
            className={({ isActive }) => `nav-link py-3 border-bottom ${isActive && "active"}`}
            title="Share Calculator"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Share Calculator"
          >
            <i className="bi bi-grid fs-4" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
