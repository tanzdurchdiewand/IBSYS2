import { useResult } from "../../hooks/useResult";
import { Production } from "../../types/resultTypes";
import i18n from "../../locals/i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ProductionResultComponent() {
  const productionResult = useResult().productionlist;
  const data = productionResult!.production;

  return (
    <TableContainer style={{ maxHeight: 800, overflow: "auto", width: 700 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>{i18n.t("productionResult.article")}</TableCell>
            <TableCell>{i18n.t("productionResult.quantity")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Production, index: number) => (
            <TableRow key={index}>
              <TableCell>{row.article}</TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
