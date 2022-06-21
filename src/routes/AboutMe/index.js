import React from "react";
import Joyride from "react-joyride";
import SideBar from "./SideBar";
import Education from "./Education";
import Experience from "./Experience";
import "./index.css";
import { AboutMeProvider } from "./AboutMeContext";

export default function AboutMe() {
  const [productTour] = React.useState({
    steps: [
      {
        target: ".profile-picture-holder",
        content: "Here I am Raja Sekhar Pothina",
        placement: "top",
      },
      {
        target: ".contact-info-container",
        content: "Here are the ways you can contact me",
        placement: "top",
      },
      {
        target: ".education",
        content: "Here are my education details",
        placement: "top",
      },
      {
        target: ".experience",
        content: "Here are my professional experience details",
        placement: "top",
      },
    ],
  });
  return (
    <section className="resume d-flex flex-wrap">
      <AboutMeProvider>
        <Joyride
          steps={productTour.steps}
          styles={{
            options: {
              primaryColor: "var(--brand-color)",
              textColor: "var(--brand-color)",
              zIndex: 1100,
            },
          }}
          continuous
          run
        />
        <SideBar />
        <main className="content p-3 flex-grow-1">
          {/* <section className="summary mt-3">
          <p className="heading fw-bold fs-4 border-bottom">Summary</p>
        </section> */}
          <Education />
          <Experience />
        </main>
      </AboutMeProvider>
    </section>
  );
}
