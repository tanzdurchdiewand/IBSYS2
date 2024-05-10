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

export default function SellResultComponent() {
  const { data } = useSelector(
    (state: RootState) => state.inputProductionProgramm
  );
  console.log(data);
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
            <TableCell>Article</TableCell>
            <TableCell>Produktionsmenge</TableCell>
            <TableCell>Sell Direkt</TableCell>
            <TableCell>Verkaufsmenge</TableCell>
            <TableCell>Verkaufspreis</TableCell>
            <TableCell>Strafe</TableCell>
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
