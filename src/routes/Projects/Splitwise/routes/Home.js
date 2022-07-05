import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import localStore from "utils/localStore";
import { useAuth } from "routes/Projects/AuthContext";
import CONSTANTS from "../constants.json";
import { getCurrentUserGroups } from "../services";
import { useSplitwise } from "../SplitwiseContext";

const callGetCurrentUserGroups = async function (splitwise) {
  let response;
  if (!localStore.getData(CONSTANTS.LOCAL_STORE_KEYS.groups)) {
    response = await getCurrentUserGroups();
    localStore.setData(CONSTANTS.LOCAL_STORE_KEYS.groups, response.data.groups);
    splitwise.setGroups(localStore.getData(CONSTANTS.LOCAL_STORE_KEYS.groups));
  } else {
    splitwise.setGroups(localStore.getData(CONSTANTS.LOCAL_STORE_KEYS.groups));
  }
};
const profileForm = function (authContext) {
  let profileFormEle = <div>Profile</div>;
  if (authContext.user) {
    profileFormEle = (
      <div className="col-6">
        <h3>Profile</h3>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={authContext.user?.email}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="first-name">
            First Name
          </label>
          <input
            id="first-name"
            type="text"
            className="form-control"
            placeholder="First Name"
            value={authContext.user?.first_name}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="last-name">
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={authContext.user?.last_name}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="currency">
            Currency
          </label>
          <input
            id="currency"
            type="text"
            className="form-control"
            placeholder="Currency"
            value={authContext.user?.default_currency}
            readOnly
          />
        </div>
      </div>
    );
  }
  return profileFormEle;
};

const groupsCollapseItem = function (splitwiseContext, params) {
  const [selectedCollapse, setSelectedCollapse] = useState(
    params.get("groupId") || 0
  );
  function collapseButtonClick(selectedIndex) {
    setSelectedCollapse(selectedIndex);
  }
  return (
    <div className="col-6 mx-2">
      <h3>Groups</h3>
      <div className="d-flex">
        {splitwiseContext.groups?.map((group, index) => (
          <p key={`collapse_trigger_${index}`} className="mx-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => collapseButtonClick(index)}
              aria-expanded="false"
            >
              {`${group.name}`}
            </button>
          </p>
        ))}
      </div>

      <div key="collapse_body">
        <div style={{ minHeight: "120px" }}>
          <div className={`collapse ${selectedCollapse >= 0 && "show"}`}>
            <div className="card card-body" style={{ width: "300px" }}>
              {(splitwiseContext.groups || []).length > 0
                ? splitwiseContext.groups[selectedCollapse]?.members.map(
                  (user, userIndex) => (
                    <a
                      key={userIndex}
                      href={`/projects/splitwise/dashboard?groupId=${selectedCollapse}&panels=["show_expenses"]&memberId=${user.id}`}
                    >
                      {`${user.first_name} ${user.last_name}`}
                    </a>
                  )
                )
                : "No Users"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function Dashboard() {
  const auth = useAuth();
  const splitwise = useSplitwise();
  const [params] = useSearchParams();
  useEffect(() => {
    (async () => {
      await callGetCurrentUserGroups(splitwise);
    })();
  }, []);
  useEffect(() => {
    splitwise.setIndexOnUsersInGroups(
      splitwise.groups?.reduce(
        (acc, eachGroup) => eachGroup.members.reduce((accUsers, user) => {
          accUsers[user.id] = user;
          return accUsers;
        }, acc),
        {}
      )
    );
  }, [splitwise.groups]);
  return (
    <div className="d-flex">
      {profileForm(auth)}
      {groupsCollapseItem(splitwise, params)}
    </div>
  );
}
