import TableContainer from "@mui/material/TableContainer/TableContainer";
import { useResult } from "../../hooks/useResult";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody/TableBody";

export default function ProductionResultComponent() {
  const productionResult = useResult().productionlist;

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
          </TableRow>
        </TableHead>
        <TableBody>
          {productionResult &&
            productionResult?.production.map((productionItem) => (
              <TableRow key={productionItem.article.toString()}>
                <TableCell>{productionItem.article.toString()}</TableCell>
                <TableCell>{productionItem.quantity.toString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
