import TableContainer from "@mui/material/TableContainer/TableContainer";
import { useResult } from "../../hooks/useResult";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody/TableBody";

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
            <TableCell>Station</TableCell>
            <TableCell>Overtime</TableCell>
            <TableCell>Shift</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workingTimes &&
            workingTimes?.worrkingTimes.map((workingTime) => (
              <TableRow key={workingTime.station.toString()}>
                <TableCell>{workingTime.station.toString()}</TableCell>
                <TableCell>{workingTime.overtime.toString()}</TableCell>
                <TableCell>{workingTime.shift.toString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
