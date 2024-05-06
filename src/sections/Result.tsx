import { Container } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledButton } from "../components/styledComponets/styledButton";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import { useDispatch } from "../redux/store";
import { useEffect } from "react";
import { setStepper } from "../redux/slices/inputXML";

export default function Result() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStepper(6))
  }, [dispatch])
  const { goTo } = useNavigationHandler();
  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo("/start/capacity", Direction.Back)}
        sx={{ left: 0 }}
      >
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard />
    </Container>
  );
}
