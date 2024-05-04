import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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

// TODO dauert zu lange
export default function OrderPlanning() {
  const { goTo } = useNavigationHandler();
  const { orderPlanning, updateOrder } = useOrderPlanning();

  console.log("OrderPlanning", orderPlanning);

  const renderInput = (value: number) => {
    return <TextField variant="outlined" size="small" value={value} disabled />;
  };

  // TODO Tooltip mit infos zur Berechnung Demand, Quantity
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
              {orderPlanning &&
                Object.entries(orderPlanning).map(
                  ([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>
                        {renderInput(value.deliveryTime)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.deviation)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.quantityP1)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.quantityP2)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.quantityP3)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.discountQuantity)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.warehouseStock)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.demandForPeriod[0])}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.demandForPeriod[1] || 0)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.demandForPeriod[2] || 0)}
                      </TableCell>
                      <TableCell>
                        {renderInput(value.demandForPeriod[3] || 0)}
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          variant="outlined"
                          size="small"
                          value={value.orderQuantity}
                          onChange={(e) =>
                            updateOrder(
                              key,
                              'orderQuantity',
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <InputLabel></InputLabel>
                          <Select
                            value={value.orderType}
                            onChange={(e) => updateOrder(key, 'orderType', Number(e.target.value))}
                          >
                            <MenuItem value={0}>Normal</MenuItem>
                            <MenuItem value={1}>Fast</MenuItem>
                          </Select>
                        </FormControl></TableCell>
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
