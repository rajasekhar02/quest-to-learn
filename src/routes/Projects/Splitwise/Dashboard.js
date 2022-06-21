import get from "lodash.get";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import localStore from "../../../utils/localStore";
import CONSTANTS from "./constants.json";
import { useAuth } from "../AuthContext";
import { getCurrentUserGroups } from "./services";
import { useSplitwise } from "./SplitwiseContext";

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
      <div className="col-3">
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

const expensesTable = function (
  expenses,
  params,
  authContext,
  splitwiseContext
) {
  const properties = [
    "#",
    "created_at",
    "description",
    "users involved",
    "paid_shares",
    "owed_shares",
    "net_balance",
    "cost",
    "comments_count",
    "created_by",
  ];
  const selectedMemberId = params.get("memberId") || authContext.user?.id;

  return (
    <div className="col">
      <pre>
        Trasactions&nbsp;
        <strong>
          {get(
            splitwiseContext.indexOnUsersInGroups,
            `${selectedMemberId}.first_name`
          )}
        </strong>
        &nbsp;is involved
      </pre>

      <table className="table">
        <thead>
          <tr>
            {properties.map((eachProperty, eachPropertyIndex) => (
              <th key={`expense_header_key_${eachPropertyIndex}`}>
                {eachProperty.replace("_", " ").toLocaleUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((eachExpense, indexExpense) => (
            <tr key={`expense_${indexExpense}`}>
              <th scope="row">{indexExpense + 1}</th>
              {[
                "created_at",
                "description",
                // "payment",
                eachExpense.users.map(
                  (x, index) => `users.${index}.user.first_name`
                ),
                eachExpense.users.map(
                  (x, index) => `users.${index}.paid_share`
                ),
                eachExpense.users.map(
                  (x, index) => `users.${index}.owed_share`
                ),
                eachExpense.users.map(
                  (x, index) => `users.${index}.net_balance`
                ),
                // "users",
                "cost",
                "comments_count",
                // "repayments",
                "created_by.first_name",
              ].map((eachKey, eachKeyIndex) => (
                <td key={`expense_key_${eachKeyIndex}`}>
                  {Array.isArray(eachKey)
                    ? eachKey
                      .map((eachNestKey) => get(eachExpense, eachNestKey))
                      .join(",")
                    : get(eachExpense, eachKey)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const groupsCollapseItem = function (splitwiseContext, params) {
  const [selectedCollapse, setSelectedCollapse] = useState(
    params.get("groupId") || 0
  );
  function collapseButtonClick(selectedIndex) {
    setSelectedCollapse(selectedIndex);
  }
  return (
    <div className="col-3 mx-2">
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
  const [expenses] = useState([]);
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
    // <AuthHandler>
    <div className="d-flex">
      {profileForm(auth)}
      {groupsCollapseItem(splitwise, params)}
      {expensesTable(expenses, params, auth, splitwise)}
      {/* </AuthHandler> */}
    </div>
  );
}
