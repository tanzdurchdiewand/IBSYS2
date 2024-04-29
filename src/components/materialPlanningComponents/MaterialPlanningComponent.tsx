import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Container,
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
import {
  Direction,
  useNavigationHandler,
} from "../../hooks/useNavigationHandlers";
import {
  MaterialPlanningRow,
  PlanningType,
} from "../../types/materialPlanningTypes";
import { StyledButton } from "../styledComponets/styledButton";
import { StyledCard } from "../styledComponets/styledCard";
import React from "react";

export const MaterialPlanningComponent = (
  planningType: PlanningType,
  backPath: string,
  forwardPath: string
) => {
  return function MaterialPlanning() {
    const { goTo } = useNavigationHandler();
    const planning = useMaterialPlanning();

    const handleUpdate = (
      key: string,
      field: keyof MaterialPlanningRow,
      value: number
    ) => {
      planning?.updateAndRecalculate(key, field, value, planningType);
    };

    const renderInput = (value: number) => {
      return (
        <TextField variant="outlined" size="small" value={value} disabled />
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
      <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
        <StyledButton
          onClick={() => goTo(backPath, Direction.Back)}
          sx={{ left: 0 }}
        >
          <ArrowBackIosIcon />
        </StyledButton>
        <StyledCard>
          <TableContainer component={Paper} sx={{ width: "90%" }}>
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
                                handleUpdate(
                                  key,
                                  "safetyStock",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>{renderInput(value.stock)}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            {renderInput(value.waitingQueue)}
                          </TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            {renderInput(value.workInProgress)}
                          </TableCell>
                          <TableCell>=</TableCell>
                          <TableCell>
                            {renderInput(value.productionOrder)}
                          </TableCell>
                        </TableRow>
                        {renderSpacer(index)}
                      </React.Fragment>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
        <StyledButton
          onClick={() => goTo(forwardPath, Direction.Forward)}
          sx={{ right: 0 }}
        >
          <ArrowForwardIosIcon />
        </StyledButton>
      </Container>
    );
  };
};
