import { useState } from "react";
import { useResult } from "../../hooks/useResult";
import { type MRT_Row } from "material-react-table";
import { Production } from "../../types/resultTypes";
import { MaterialReactTable } from "material-react-table";

export default function ProductionResultComponent() {
  const productionResult = useResult().productionlist;

  const columns = [
    { accessorKey: "article", header: "Article" },
    { accessorKey: "quantity", header: "Quantity" },
  ];

  const initData = productionResult!.production;

  //TODO: Änderungen müssen in der Store geschreiben werden

  const [data, setData] = useState(() => initData);
  console.log(productionResult?.production);

  return (
    <MaterialReactTable
      autoResetPageIndex={false}
      data={data}
      columns={columns}
      enableRowOrdering={true}
      enableSorting={false}
      muiRowDragHandleProps={({ table }) => ({
        onDragEnd: () => {
          const { draggingRow, hoveredRow } = table.getState();
          if (hoveredRow && draggingRow) {
            const dataCopy = [...data];
            dataCopy.splice(
              (hoveredRow as MRT_Row<Production>).index,
              0,
              dataCopy.splice(draggingRow.index, 1)[0]
            );
            setData(dataCopy);
          }
        },
      })}
    ></MaterialReactTable>
  );
}
