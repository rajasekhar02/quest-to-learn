import React from "react";
import { Link } from "react-router-dom";

const navigationItems = [
  { title: "About me", path: "about-me" },
  { title: "Projects", path: "projects" },
  { title: "Learning References", path: "learning-references" },
  { title: "Download Resume", path: "resume" },
];
export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Quest to Learn
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navigationItems.map((eachItem) => (
              <li className="nav-item" key={eachItem.path}>
                <Link
                  className="nav-link active"
                  aria-current={eachItem.title}
                  to={`/${eachItem.path}`}
                >
                  {eachItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
