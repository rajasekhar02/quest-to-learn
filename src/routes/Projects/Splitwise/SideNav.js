import React, { useEffect } from "react";
import { Tooltip } from "bootstrap";
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
      <a
        href="./dashboard"
        className="d-block p-3 link-dark text-decoration-none text-center"
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
      </a>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <a
            href="/"
            className="nav-link active py-3 border-bottom"
            aria-current="page"
            title="Home"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Home"
          >
            <i className="bi bi-house fs-4" />
          </a>
        </li>
        <li>
          <a
            href="/"
            className="nav-link py-3 border-bottom"
            title="Dashboard"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Dashboard"
          >
            <i className="bi bi-speedometer2 fs-4" />
          </a>
        </li>
        <li>
          <a
            href="./expenses-table"
            className="nav-link py-3 border-bottom"
            title="Orders"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Orders"
          >
            <i className="bi bi-table fs-4" />
          </a>
        </li>
        <li>
          <a
            href="/"
            className="nav-link py-3 border-bottom"
            title="Products"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Products"
          >
            <i className="bi bi-grid fs-4" />
          </a>
        </li>
      </ul>
    </div>
  );
}
