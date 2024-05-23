import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RootState, useSelector } from "../../redux/store";
import i18n from "../../locals/i18n";

export default function SellResultComponent() {
  const { data } = useSelector(
    (state: RootState) => state.inputProductionProgramm
  );
  return (
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
            <TableCell>{i18n.t("productionProgrammResult.article")}</TableCell>
            <TableCell>
              {i18n.t("productionProgrammResult.productionQuantity")}
            </TableCell>
            <TableCell>
              {i18n.t("productionProgrammResult.sellDirect")}
            </TableCell>
            <TableCell>
              {i18n.t("productionProgrammResult.salesQuantity")}
            </TableCell>
            <TableCell>
              {i18n.t("productionProgrammResult.salesPrice")}
            </TableCell>
            <TableCell>{i18n.t("productionProgrammResult.penalty")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            Object.keys(data).map((key) => {
              const item = (data as { [key: string]: any })[key];
              const directSellItem = (
                data.directSell as { [key: string]: any }
              )[key];

              if (key !== "directSell") {
                return (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{item.salesOrder.productionWish}</TableCell>
                    <TableCell>{item.sellDirect}</TableCell>
                    <TableCell>{directSellItem.amount}</TableCell>
                    <TableCell>{directSellItem.price}</TableCell>
                    <TableCell>{directSellItem.penalty}</TableCell>
                  </TableRow>
                );
              } else {
                return null;
              }
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
