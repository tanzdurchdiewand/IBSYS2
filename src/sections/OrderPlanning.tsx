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
  Tooltip,
  useTheme,
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
import { useDispatch } from "../redux/store";
import { useEffect } from "react";
import { setStepper } from "../redux/slices/inputXML";
import InfoIcon from "@mui/icons-material/Info";
import i18n from "../locals/i18n";
import { useLocales } from "../locals";

export default function OrderPlanning() {
  useLocales();
  const { goTo } = useNavigationHandler();
  const { orderPlanning, updateOrder } = useOrderPlanning();
  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    dispatch(setStepper(4));
  }, [dispatch]);

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo("/start/capacity", Direction.Back)}
        sx={{ left: 0 }}
        tooltip="Previous Step"
      >
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{i18n.t("orderPlanning.columnProduct")}</TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnDeliveryTime")}
                </TableCell>
                <TableCell>{i18n.t("orderPlanning.columnDeviation")}</TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnQuantityP1")}
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnQuantityP2")}
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnQuantityP3")}
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnDiscountQuantity")}
                </TableCell>
                <TableCell>{i18n.t("orderPlanning.columnStock")}</TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnDemandForPeriod0")}
                  <Tooltip
                    title={
                      "Demand for Period = Production Wish P1 * Quantity P1 + Production Wish P2 * Quantity P2 + Production Wish P3 * Quantity P3"
                    }
                  >
                    <InfoIcon
                      style={{
                        cursor: "pointer",
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnDemandForPeriod1")}
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnDemandForPeriod2")}
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnDemandForPeriod3")}
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnOrderQuantity")}
                </TableCell>
                <TableCell>{i18n.t("orderPlanning.columnOrderType")}</TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnPendingOrderPeriod")}
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnPendingOrderAmaunt")}
                </TableCell>
                <TableCell>
                  {i18n.t("orderPlanning.columnPendingOrderType")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderPlanning &&
                Object.entries(orderPlanning).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.deliveryTime}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.deviation}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.quantityP1}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.quantityP2}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.quantityP3}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.discountQuantity}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.warehouseStock}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.demandForPeriod[0]}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.demandForPeriod[1]}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.demandForPeriod[2]}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={value.demandForPeriod[3]}
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
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
                            "orderQuantity",
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
                          onChange={(e) =>
                            updateOrder(
                              key,
                              "orderType",
                              Number(e.target.value)
                            )
                          }
                        >
                          <MenuItem value={0}>Normal</MenuItem>
                          <MenuItem value={1}>Fast</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={
                          value.pendingOrderAmount === 0
                            ? "-"
                            : value.pendingOrderPeriod
                        }
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={
                          value.pendingOrderAmount === 0
                            ? "-"
                            : value.pendingOrderAmount
                        }
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={
                          value.pendingOrderType === 0
                            ? "-"
                            : value.pendingOrderType.toString() === "5"
                            ? "normal"
                            : "fast"
                        }
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCard>
      <StyledButton
        onClick={() => goTo("/start/production", Direction.Forward)}
        sx={{ right: 0 }}
        tooltip="Next Step"
      >
        <ArrowForwardIosIcon />
      </StyledButton>
    </Container>
  );
}
