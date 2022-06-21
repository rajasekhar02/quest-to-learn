import React from "react";
import { v4 as uuidv4 } from "uuid";
import CONSTANTS from "./Splitwise/constants.json";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";
const client_id = CONSTANTS.CLIENT_ID;

function ActionButton() {
  const auth = useAuth();
  const navigate = useNavigate();
  function handleSignOut() {
    auth.signOut("splitwise");
    navigate("/projects", { replace: true });
  }
  return (
    <>
      {auth.isAuthenticated ? (
        <>
          <a className="btn btn-primary" href="/projects/splitwise/dashboard">
            Dashboard
          </a>
          <button className="btn btn-primary mx-2" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <a
          href={`https://secure.splitwise.com/oauth/authorize?redirect_uri=${
            CONSTANTS.REDIRECT_URI
          }&response_type=code&state=${uuidv4()}&client_id=${client_id}`}
          className="btn btn-primary"
        >
          Login Through Splitwise
        </a>
      )}
    </>
  );
}
const SplitWiseCard = function () {
  return (
    <div className="card-body">
      <h5 className="card-title">Splitwise Dashboard</h5>
      <p className="card-text">Dashboard on Splitwise Expenses</p>
      <ActionButton appName={"splitwise"} />
    </div>
  );
};
export default function ProjectGrids() {
  const auth = useAuth();
  return (
    <div className="card" style={{ width: "18rem" }} key={auth.isAuthenticated}>
      {/* <img src="..." className="card-img-top" alt="..."> */}
      <SplitWiseCard></SplitWiseCard>
    </div>
  );
}
