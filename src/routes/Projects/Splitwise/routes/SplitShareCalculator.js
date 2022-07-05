import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

const columnList = function (tableContext) {
  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Columns
      </button>

      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {tableContext
          .getAllLeafColumns()
          .filter((x, index) => index >= 1)
          .map((column) => (
            <li className="dropdown-item" key={`column-list-${column.id}`}>
              <input
                className="form-check-input me-1"
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                aria-label="column"
              />
              {column.columnDef.header}
            </li>
          ))}
      </ul>
    </div>
  );
};
const copyAsOptions = function (tableContext) {
  const handleCopyAsExcelFormat = async function () {
    const itemsFormat = tableContext
      .getRowModel()
      .rows.map((row) => row
        .getVisibleCells()
        .filter((x, index) => index >= 1)
        .map((cell) => cell.getContext().getValue()))
      .map((ea) => ea.join("||"))
      .join("\n");
    await navigator.clipboard.writeText(itemsFormat);
  };
  const handleCopyAsWhatAppMsgFormat = async function () {
    const items = tableContext.getRowModel().rows.map((row) => row
      .getVisibleCells()
      .filter((x, index) => index >= 1)
      .map((cell) => [
        cell.getContext().getValue(),
        cell.getContext().column.columnDef.padLength,
      ]));
    const maxDescriptionLen = items.reduce(
      (acc, curr) => (acc.length > curr[0][0].length ? acc : curr[0][0]),
      items[0][0]
    ).length;
    const itemsFormat = items
      .map((ea) => ea.reduce((acc, curr, index) => {
        if (index === 0) {
          acc += curr[0].padEnd(maxDescriptionLen, "-");
        } else {
          acc += `${`${curr[0]}`.padEnd(curr[1], " ")}`;
        }
        return acc;
      }, ""))
      .join("\n");
    await navigator.clipboard.writeText(`\`\`\`${itemsFormat}\`\`\``);
  };
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Copy to clipboard
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={handleCopyAsWhatAppMsgFormat}
          >
            Whatapp Msg Format
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={handleCopyAsExcelFormat}
          >
            Excel Format
          </button>
        </li>
      </ul>
    </div>
  );
};
const shareCalculatorTable = function (totalAndTax, table) {
  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{header.column.columnDef.header}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="text-nowrap"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                title={cell.getValue()}
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, totalAndTax)}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
export default function SplitShareCalculator() {
  const [parsedItems, setParsedItems] = useState([]);
  const [totalAndTax, setTotalAndTax] = useState({});
  const [viewType, setViewType] = useState("textarea_table");
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const handleTextAreaChange = function (eventItem) {
    try {
      const items = JSON.parse(eventItem.target.value);
      setParsedItems(items.slice(0, items.length - 1));
      setTotalAndTax(items[items.length - 1]);
    } catch (err) {
      console.error("provided valid json object");
    }
    // console.log(JSON.parse(eventItem.target.value));
  };
  const handleSetView = function (selectedViewType) {
    setViewType(selectedViewType);
  };
  const columns = [
    {
      id: "#",
      header: "#",
      cell: (info) => info.row.index + 1,
      footer: () => ``,
    },
    {
      id: "description",
      accessorKey: "description",
      header: "Description",
      footer: () => ``,
    },
    {
      id: "quantity",
      accessorKey: "quantity",
      header: "Quantity",
      footer: (footerContext) => `Shipping: ${footerContext.shipping || 0}`,
      padLength: 3,
    },
    {
      id: "unit_price",
      accessorKey: "unitPrice",
      header: "Unit Price",
      footer: (footerContext) => `Tax: ${footerContext.tax || 0}`,
      padLength: 7,
    },
    {
      id: "price",
      accessorKey: "price",
      header: "Price",
      footer: (footerContext) => `Total With Tax: ${footerContext.total || 0}`,
      padLength: 7,
    },
  ];
  const table = useReactTable({
    data: parsedItems,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="row">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${viewType === "textarea_table" && "active"}`}
            onClick={() => handleSetView("textarea_table")}
          >
            Table and JSON Input
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${viewType === "table" && "active"}`}
            onClick={() => handleSetView("table")}
          >
            Table
          </button>
        </li>
      </ul>

      <div
        className={`form col-6 ${
          viewType === "textarea_table" ? "col-6" : "d-none"
        }`}
      >
        <label htmlFor="floatingTextarea">Receipt JSON</label>
        <textarea
          className="form-control"
          placeholder="Paste the JSON of the receipt"
          id="floatingTextarea"
          style={{ height: "200px" }}
          onChange={handleTextAreaChange}
        />
      </div>
      <div
        className={`col-6 ${
          viewType === "textarea_table" ? "col-6" : "col-12"
        }`}
      >
        <div className="table-tools d-flex justify-content-end">
          {copyAsOptions(table)}
          &nbsp;
          {columnList(table)}
        </div>
        {shareCalculatorTable(totalAndTax, table)}
      </div>
    </div>
  );
}
