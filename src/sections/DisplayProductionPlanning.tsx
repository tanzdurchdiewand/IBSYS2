import { Container } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledButton } from "../components/styledComponets/styledButton";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import ProductionPlanning from "../businessLogic/productionPlanning";
import { useDispatch } from "../redux/store";
import { useEffect } from "react";
import { setStepper } from "../redux/slices/inputXML";

export default function DisplayProductionPlanning() {
  const { goTo } = useNavigationHandler();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStepper(4));
  }, [dispatch]);
  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo("/start/order", Direction.Back)}
        sx={{ left: 0 }}
        tooltip="Previous Step"
      >
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard  style={{  justifyContent: "flex-start" }}>
        <ProductionPlanning />
      </StyledCard>
      <StyledButton
        onClick={() => goTo("/start/capacity", Direction.Forward)}
        sx={{ right: 0 }}
        tooltip="Next Step"
      >
        <ArrowForwardIosIcon />
      </StyledButton>
    </Container>
  );
}

// TODO Row Ordering benutzen
// https://mui.com/x/react-data-grid/row-ordering/
