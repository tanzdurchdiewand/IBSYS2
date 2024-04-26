import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledButton } from "../components/styledComponets/styledButton";
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
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import {
  PlanningType,
  useMaterialPlanning,
} from "../hooks/useMaterialPlanning";
import React from "react";
import { MaterialPlanningRow } from "../types/materialPlanningTypes";
import { dispatch } from "../redux/store";
import { updatePlanningField } from "../redux/slices/inputMaterialPlanning";

export default function MaterialPlanningP1() {
  const { goTo } = useNavigationHandler();
  const p1Planning = useMaterialPlanning(PlanningType.P1);

  const handleFieldChange = (
    key: string,
    field: keyof MaterialPlanningRow,
    value: number
  ) => {
    dispatch(updatePlanningField({ key, field, value }));
  };

  const renderInput = (value: number) => {
    return <TextField variant="outlined" size="small" value={value} disabled />;
  };

  const renderSpacer = (index: number) => {
    const gapIndices = [0, 2, 5, 8];
    if (gapIndices.includes(index)) {
      return (
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
      );
    }
    return null;
  };

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo("/start/produktion", Direction.Back)}
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
              {p1Planning &&
                Object.entries(p1Planning).map(([key, value], index) => (
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
                          variant="outlined"
                          size="small"
                          value={value.safetyStock}
                          onChange={(e) =>
                            handleFieldChange(
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
                      <TableCell>{renderInput(value.waitingQueue)}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{renderInput(value.workInProgress)}</TableCell>
                      <TableCell>=</TableCell>
                      <TableCell>
                        {renderInput(value.productionOrder)}
                      </TableCell>
                    </TableRow>
                    {renderSpacer(index)}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCard>
      <StyledButton
        onClick={() => goTo("/start/material2", Direction.Forward)}
        sx={{ right: 0 }}
      >
        <ArrowForwardIosIcon />
      </StyledButton>
    </Container>
  );
}
