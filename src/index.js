import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthHandler from "routes/Projects/AuthHandler";
import { ProjectsProvider } from "routes/Projects/ProjectsContext";
import Home from "routes/Projects/Splitwise/routes/Home";
import RedirectHandler from "routes/Projects/Splitwise/RedirectHandler";
import ExpensesTable from "routes/Projects/Splitwise/routes/ExpensesTable";
import Dashboard from "routes/Projects/Splitwise/routes/Dashboard";
import SplitShareCalculator from "routes/Projects/Splitwise/routes/SplitShareCalculator";
import App from "./App";
import AboutMe from "./routes/AboutMe/index";
import LearningReferences from "./routes/LearningReferences";
import Projects from "./routes/Projects/index";
import ProjectGrids from "./routes/Projects/ProjectGrids";
import Splitwise from "./routes/Projects/Splitwise/index";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AboutMe />} />
        <Route path="about-me" element={<AboutMe />}>
          <Route path=":string_slug" element={<AboutMe />} />
        </Route>
        <Route
          path="projects"
          element={(
            <ProjectsProvider>
              <Projects />
            </ProjectsProvider>
          )}
        >
          <Route index element={<ProjectGrids />} />
          <Route path="splitwise" element={<Splitwise />}>
            <Route path="redirect" element={<RedirectHandler />} />
            <Route
              path="home"
              element={(
                <AuthHandler>
                  <Home />
                </AuthHandler>
              )}
            />
            <Route
              path="dashboard"
              element={(
                <AuthHandler>
                  <Dashboard />
                </AuthHandler>
              )}
            />
            <Route
              path="expenses"
              element={(
                <AuthHandler>
                  <ExpensesTable />
                </AuthHandler>
              )}
            />
            <Route
              path="splitshare-calculator"
              element={(
                <AuthHandler>
                  <SplitShareCalculator />
                </AuthHandler>
              )}
            />
          </Route>
        </Route>
        <Route path="learning-references" element={<LearningReferences />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
