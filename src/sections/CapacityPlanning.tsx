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
import { useDispatch } from "../redux/store";
import { useEffect } from "react";
import { setStepper } from "../redux/slices/inputXML";
import { useCapacityPlanning } from "../hooks/useCapacityPlanning";

export default function CapacityPlanning() {
  const { goTo } = useNavigationHandler();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStepper(5));
  }, [dispatch]);
  const { capacityRows, summaryRows, handleValueChange } =
    useCapacityPlanning();

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo("/start/production", Direction.Back)}
        sx={{ left: 0 }}
      >
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Designation</TableCell>
                <TableCell>Final product</TableCell>
                <TableCell>Article number</TableCell>
                <TableCell>Order Quantity</TableCell>
                {Array.from({ length: 15 }, (_, i) => (
                  <TableCell key={i}>Workstation {i + 1}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Capacity Planning Rows */}
              {capacityRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>{row.modelType}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.orderQuantity}</TableCell>
                  {row.workstationResults.map((result, idx) => (
                    <TableCell key={idx}>{result}</TableCell>
                  ))}
                </TableRow>
              ))}
              {/* Spacer Row */}
              <TableRow style={{ height: 20 }}>
                <TableCell colSpan={20} style={{ padding: 0 }} />{" "}
              </TableRow>
              {/* Summary Rows */}
              {summaryRows.map((row, index) => (
                <TableRow key={`summary-${index}`}>
                  <TableCell>{row.label}</TableCell>
                  <TableCell
                    colSpan={3}
                    style={{ textAlign: "center" }}
                  ></TableCell>
                  {row.values?.map((value, valueIndex) => (
                    <TableCell key={valueIndex}>
                      {row.editable ? (
                        <TextField
                          size="small"
                          type="number"
                          value={value}
                          onChange={(e) =>
                            handleValueChange(
                              index,
                              valueIndex,
                              Number(e.target.value)
                            )
                          }
                          variant="outlined"
                        />
                      ) : (
                        <span>{value}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCard>
      <StyledButton
        onClick={() => goTo("/start/result", Direction.Forward)}
        sx={{ right: 0 }}
      >
        <ArrowForwardIosIcon />
      </StyledButton>
    </Container>
  );
}
