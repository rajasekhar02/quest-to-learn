import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "routes/Projects/AuthContext";
import get from "lodash.get";
import { format as formatDate } from "date-fns";
import { useSplitwise } from "../SplitwiseContext";
import { getExpensesWithFriendId } from "../services";

const callGetExpensesWithFriendId = async function (
  searchParams,
  setExpenses,
  splitwiseContext
) {
  const dateAfter = get(
    splitwiseContext,
    `groups.${searchParams.get("groupId")}.created_at`
  );
  if (!dateAfter) return;
  const response = await getExpensesWithFriendId(searchParams.get("memberId"), {
    limit: 0,
    offset: 0,
    dated_after: dateAfter,
  });
  setExpenses(
    response.data.expenses.map((eachExpense) => [
      "description",
      "payment",
      "users",
      "cost",
      "comments_count",
      "repayments",
      "created_at",
      "created_by",
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
    }, {}))
  );
};

export default function ExepensesTable() {
  const authContext = useAuth();
  const splitwiseContext = useSplitwise();
  const [params] = useSearchParams();
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    (() => callGetExpensesWithFriendId(params, setExpenses, splitwiseContext))();
  }, [splitwiseContext.groups]);
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
}
