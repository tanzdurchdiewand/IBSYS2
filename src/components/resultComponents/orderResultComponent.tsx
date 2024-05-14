import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import { useResult } from "../../hooks/useResult";

export default function OrderResultComponent() {
  const orderResult = useResult().orderlist;

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
            <TableCell>Quantity</TableCell>
            <TableCell>Modus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderResult && orderResult.order.length > 0 ? (
            orderResult?.order.map((orderItem) => (
              <TableRow key={orderItem.article.toString()}>
                <TableCell>{orderItem.article.toString()}</TableCell>
                <TableCell>{orderItem.quantity.toString()}</TableCell>
                <TableCell>
                  {orderItem.modus === 4
                    ? "Normal"
                    : orderItem.modus === 5
                    ? "Fast"
                    : ""}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>Nothing to order</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
