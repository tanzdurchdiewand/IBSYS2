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

export default function MaterialPlanningP1() {
  const { goTo } = useNavigationHandler();
  const p1Planning = useMaterialPlanning(PlanningType.P1);

  const renderSpacer = (index: number) => {
    const gapIndices = [0, 2, 5, 8];
    if (gapIndices.includes(index)) {
      return (
        <TableRow>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
        </TableRow>
      );
    }
    return null;
  };

  // TODO: redux store und Änderung der Felder speichern

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
                      <TableCell>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={value.salesOrder}
                          onChange={(e) =>
                            // handleFieldChange(key, "salesOrders", e.target.value)
                            {}
                          }
                        />
                      </TableCell>
                      <TableCell>+</TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={value.previousWaitingQueue}
                          onChange={(e) =>
                            // handleFieldChange(key,"previousWaitingQueue", e.target.value)
                            {}
                          }
                        />
                      </TableCell>
                      <TableCell>+</TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={value.safetyStock}
                          onChange={(e) =>
                            // handleFieldChange(key, "safetyStock", e.target.value)
                            {}
                          }
                        />
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={value.stock}
                          onChange={(e) =>
                            // handleFieldChange(key, "stock", e.target.value)
                            {}
                          }
                        />
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={value.waitingQueue}
                          onChange={(e) =>
                            // handleFieldChange(key, "waitingQueue", e.target.value)
                            {}
                          }
                        />
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={value.workInProgress}
                          onChange={(e) =>
                            // handleFieldChange(key,"workInProgress", e.target.value)
                            {}
                          }
                        />
                      </TableCell>
                      <TableCell>=</TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={value.productionOrder}
                          onChange={(e) =>
                            // handleFieldChange(key, "productionOrders", e.target.value)
                            {}
                          }
                        />
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
