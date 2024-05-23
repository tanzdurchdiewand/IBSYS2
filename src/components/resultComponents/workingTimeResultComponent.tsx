import TableContainer from "@mui/material/TableContainer/TableContainer";
import { useResult } from "../../hooks/useResult";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody/TableBody";
import i18n from "../../locals/i18n";

export default function WorkingTimeResultComponent() {
  const workingTimes = useResult().workingtimelist;

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
            <TableCell>{i18n.t("workingTimeResult.station")}</TableCell>
            <TableCell>{i18n.t("workingTimeResult.overtime")}</TableCell>
            <TableCell>{i18n.t("workingTimeResult.shift")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workingTimes &&
            workingTimes?.worrkingTime.map((workingTimeItem) => (
              <TableRow key={workingTimeItem.station.toString()}>
                <TableCell>{workingTimeItem.station.toString()}</TableCell>
                <TableCell>{workingTimeItem.overtime.toString()}</TableCell>
                <TableCell>{workingTimeItem.shift.toString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
