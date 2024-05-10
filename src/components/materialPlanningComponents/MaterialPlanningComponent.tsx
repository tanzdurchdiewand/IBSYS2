import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useMaterialPlanning } from "../../hooks/useMaterialPlanning";
import {} from "../../hooks/useNavigationHandlers";
import { PlanningType } from "../../types/materialPlanningTypes";
import React from "react";

type Props = {
  planningType: PlanningType;
};

export default function MaterialPlanningComponent({
  planningType,
}: Readonly<Props>) {
  const planning = useMaterialPlanning();

  const renderInput = (value: number) => {
    return (
      <input
        value={value}
        disabled
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "4px",
          width: "100%",
        }}
      />
    );
  };

  const renderSpacer = (index: number) => {
    const gapIndices = [0, 2, 5, 8];
    const numberOfCells = 14;
    if (gapIndices.includes(index)) {
      return (
        <TableRow>
          {Array.from({ length: numberOfCells }, (_, i) => (
            <TableCell key={i} />
          ))}
        </TableRow>
      );
    }
    return null;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        overflow: "hidden",
      }}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="material planning table"
        stickyHeader
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Sales Orders</TableCell>
            <TableCell></TableCell>
            <TableCell>Prev. Waiting Queue</TableCell>
            <TableCell></TableCell>
            <TableCell>Safety Stock</TableCell>
            <TableCell></TableCell>
            <TableCell>Warehouse Stock</TableCell>
            <TableCell></TableCell>
            <TableCell>Orders in Waiting Queue</TableCell>
            <TableCell></TableCell>
            <TableCell>Work in Progress</TableCell>
            <TableCell></TableCell>
            <TableCell>Production Orders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planning?.initialPlanning &&
            Object.entries(planning.initialPlanning[planningType]).map(
              ([key, value], index) => (
                <React.Fragment key={key}>
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{renderInput(value.salesOrder)}</TableCell>
                    <TableCell>+</TableCell>
                    <TableCell>
                      {renderInput(value.previousWaitingQueue)}
                    </TableCell>
                    <TableCell>+</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={value.safetyStock}
                        onChange={(e) =>
                          planning.updateAndRecalculate(
                            key,
                            "safetyStock",
                            Number(e.target.value),
                            planningType
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{renderInput(value.stock)}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{renderInput(value.waitingQueue)}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{renderInput(value.workInProgress)}</TableCell>
                    <TableCell>=</TableCell>
                    <TableCell>{renderInput(value.productionOrder)}</TableCell>
                  </TableRow>
                  {renderSpacer(index)}
                </React.Fragment>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
