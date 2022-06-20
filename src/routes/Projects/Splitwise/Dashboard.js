import get from "lodash.get";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import localStore from "../../../utils/localStore";
import CONSTANTS from "./constants.json";
import { useAuth } from "../AuthContext";
import {
  getCurrentUser,
  getCurrentUserGroups,
  getExpensesWithFriendId
} from "./services";
import { useSplitwise } from "./SplitwiseContext";
import { format as formatDate, parse as parseDate } from "date-fns";
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
const callGetExpensesWithFriendId = async function (
  searchParams,
  setExpenses,
  splitwiseContext
) {
  let response;
  const dateAfter = get(
    splitwiseContext,
    `groups.${searchParams.get("groupId")}.created_at`
  );
  if (!dateAfter) return;
  response = await getExpensesWithFriendId(searchParams.get("memberId"), {
    limit: 0,
    offset: 0,
    dated_after: dateAfter
  });
  setExpenses(
    response.data.expenses.map((eachExpense) =>
      [
        "description",
        "payment",
        "users",
        "cost",
        "comments_count",
        "repayments",
        "created_at",
        "created_by"
      ].reduce((acc, property) => {
        if (property === "created_at") {
          acc[property] = formatDate(
            new Date(eachExpense[property]),
            "dd-MMM-yyyy"
          );
        } else {
          acc[property] = eachExpense[property];
        }
        return acc;
      }, {})
    )
  );
};
const profileForm = function (authContext) {
  let profileForm = <div>Profile</div>;
  if (authContext.user) {
    profileForm = (
      <div className="col-3">
        <h3>Profile</h3>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={authContext.user?.email}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={authContext.user?.first_name}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={authContext.user?.last_name}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Currency</label>
          <input
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
  return profileForm;
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
    "created_by"
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
            {properties.map((eachProperty, eachPropertyIndex) => {
              return (
                <th key={`expense_header_key_${eachPropertyIndex}`}>
                  {eachProperty.replace("_", " ").toLocaleUpperCase()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {expenses.map((eachExpense, indexExpense) => {
            return (
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
                  //"users",
                  "cost",
                  "comments_count",
                  // "repayments",
                  "created_by.first_name"
                ].map((eachKey, eachKeyIndex) => {
                  return (
                    <td key={`expense_key_${eachKeyIndex}`}>
                      {Array.isArray(eachKey)
                        ? eachKey
                            .map((eachNestKey) => get(eachExpense, eachNestKey))
                            .join(",")
                        : get(eachExpense, eachKey)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
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
        {splitwiseContext.groups?.map((group, index) => {
          return (
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
          );
        })}
      </div>

      <div key={`collapse_body`}>
        <div style={{ minHeight: "120px" }}>
          <div className={`collapse ${selectedCollapse >= 0 && "show"}`}>
            <div className="card card-body" style={{ width: "300px" }}>
              {(splitwiseContext.groups || []).length > 0
                ? splitwiseContext.groups[selectedCollapse]?.members.map(
                    (user, userIndex) => {
                      return (
                        <a
                          key={userIndex}
                          href={`/projects/splitwise/dashboard?groupId=${selectedCollapse}&panels=["show_expenses"]&memberId=${user.id}`}
                        >{`${user.first_name} ${user.last_name}`}</a>
                      );
                    }
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
  const [params, setParams] = useSearchParams();
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    (async () => {
      await callGetCurrentUserGroups(splitwise);
    })();
  }, []);
  useEffect(() => {
    (async () =>
      await callGetExpensesWithFriendId(params, setExpenses, splitwise))();
  }, [splitwise.groups]);
  useEffect(() => {
    splitwise.setIndexOnUsersInGroups(
      splitwise.groups?.reduce((acc, eachGroup) => {
        return eachGroup.members.reduce((accUsers, user) => {
          accUsers[user.id] = user;
          return accUsers;
        }, acc);
      }, {})
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
