import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

export default function SplitShareCalculator() {
  const [parsedItems, setParsedItems] = useState([]);
  const [totalAndTax, setTotalAndTax] = useState({});
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
      footer: (footerContext) => `Shipping: ${footerContext.shipping || 0}`,
    },
    {
      id: "quantity",
      accessorKey: "quantity",
      header: "Quantity",
      footer: (footerContext) => `Tax: ${footerContext.tax || 0}`,
    },
    {
      id: "unit_price",
      accessorKey: "unitPrice",
      header: "Unit Price",
      footer: () => ``,
    },
    {
      id: "price",
      accessorKey: "price",
      header: "Price",
      footer: (footerContext) => `Tax: ${footerContext.total || 0}`,
    },
  ];
  const table = useReactTable({
    data: parsedItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="row">
      <div className="form col-6">
        <label htmlFor="floatingTextarea">Receipt JSON</label>
        <textarea
          className="form-control"
          placeholder="Paste the JSON of the receipt"
          id="floatingTextarea"
          style={{ height: "200px" }}
          onChange={handleTextAreaChange}
        />
      </div>
      <div className="col-6">
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
          <tfoot>
            <tr>
              {table.getAllColumns().map((column) => (
                <th key={column.id}>
                  {flexRender(column.columnDef.footer, totalAndTax)}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
