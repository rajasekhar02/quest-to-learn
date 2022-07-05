import React, { useEffect, useState } from "react";
import { useAuth } from "routes/Projects/AuthContext";
import get from "lodash.get";
import { format as formatDate } from "date-fns";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { getExpensesWithFriendId } from "../services";

const callGetExpensesWithFriendId = async function (setExpenses, authContext) {
  const userId = get(authContext, "user.id");
  if (!userId) return;
  const response = await getExpensesWithFriendId(userId, {
    limit: 0,
    offset: 0,
  });
  setExpenses(
    response.data.expenses
      .filter((eachExpense) => !eachExpense.deleted_at)
      .map((eachExpense) => [
        "description",
        "payment",
        "users",
        "cost",
        "comments_count",
        "repayments",
        "date",
        "created_by",
      ].reduce((acc, property) => {
        if (property === "date") {
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

export default function ExpensesTable() {
  const authContext = useAuth();
  const [expenses, setExpenses] = useState([]);
  const columns = [
    {
      id: "#",
      header: "#",
      cell: (info) => info.row.index + 1,
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: (info) => info.getValue(),
    },
    {
      id: "description",
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "user_involved",
      header: "Users Involved",
      cell: (info) => info.row.original.users
        .map((x) => get(x, "user.first_name"))
        .join(", "),
    },
    {
      id: "owner_shares",
      header: "Paid By Member Share",
      cell: (info) => info.row.original.users.map((x) => get(x, "owed_share")).join(", "),
    },
    {
      id: "net_amount",
      header: "Amount to be paid",
      cell: (info) => info.row.original.users.map((x) => get(x, "net_balance")).join(", "),
    },
    {
      id: "cost",
      accessorKey: "cost",
      header: "Total Cost",
    },
    {
      id: "comments_count",
      accessorKey: "comments_count",
      header: "Comments Count",
    },
    {
      id: "paid_by",
      cell: (info) => info.row.original.users
        .filter((x) => +get(x, "paid_share") > 0)
        .map((x) => get(x, "user.first_name"))
        .join(","),
      header: "Paid By",
    },
  ];
  const table = useReactTable({
    data: expenses,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  useEffect(() => {
    (() => callGetExpensesWithFriendId(setExpenses, authContext))();
    table.setPageSize(30);
  }, [authContext.user]);

  return (
    <div className="col">
      <pre>
        Trasactions&nbsp;
        <strong>{get(authContext.user, `first_name`)}</strong>
        &nbsp;is involved.
        <span>
          Total Records:
          {expenses.length}
        </span>
      </pre>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={`page-item ${!table.getCanPreviousPage() && "disabled"}`}
          >
            <button
              type="button"
              className="page-link"
              aria-label="Previous"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {new Array(table.getPageCount()).fill(1).map((page, pageIndex) => (
            <li className="page-item" key={`page-index ${pageIndex}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => table.setPageIndex(pageIndex)}
              >
                {pageIndex + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${!table.getCanNextPage() && "disabled"}`}>
            <button
              type="button"
              className="page-link"
              aria-label="Next"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      <table className="table">
        <thead>
          <tr>
            {table.getAllColumns().map((column) => (
              <th key={column.id}>{column.columnDef.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
