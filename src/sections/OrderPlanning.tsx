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
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledButton } from "../components/styledComponets/styledButton";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import { useOrderPlanning } from "../hooks/useOrderPlanning";
import React from "react";

export default function OrderPlanning() {
  const { goTo } = useNavigationHandler();
  console.log("OrderPlanning rendering");
  const orderPlanning = useOrderPlanning();

  const renderInput = (value: number) => {
    return <TextField variant="outlined" size="small" value={value} disabled />;
  };

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo("/start/material", Direction.Back)}
        sx={{ left: 0 }}
      >
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard>
        <TableContainer
          component={Paper}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
                <TableCell>Delivery time</TableCell>
                <TableCell>Deviation</TableCell>
                <TableCell>Quantity P1</TableCell>
                <TableCell>Quantity P2</TableCell>
                <TableCell>Quantity P3</TableCell>
                <TableCell>Discount quantity</TableCell>
                <TableCell>Warehouse Stock</TableCell>
                <TableCell>Demand for period x</TableCell>
                <TableCell>Demand for period x+1</TableCell>
                <TableCell>Demand for period x+2</TableCell>
                <TableCell>Demand for period x+3</TableCell>
                <TableCell>Order Quantity</TableCell>
                <TableCell>Order type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderPlanning?.initialOrderPlanning &&
                Object.entries(orderPlanning.initialOrderPlanning).map(
                  ([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>
                        {renderInput(value![key].deliveryTime)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].deviation)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].quantityP1)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].quantityP2)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].quantityP3)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].discountQuantity)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].warehouseStock)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].demandForPeriod[0])}
                      </TableCell>
                      {/* <TableCell>
                        {renderInput(value![key].demandForPeriod[1] || 0)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].demandForPeriod[2] || 0)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value![key].demandForPeriod[3] || 0)}
                      </TableCell> */}
                      <TableCell>
                        {renderInput(value![key].orderQuantity)}
                      </TableCell>
                      <TableCell>{value![key].orderType}</TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCard>
      <StyledButton
        onClick={() => goTo("/start/production", Direction.Forward)}
        sx={{ right: 0 }}
      >
        <ArrowForwardIosIcon />
      </StyledButton>
    </Container>
  );
}
