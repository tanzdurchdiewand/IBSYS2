import { Container, Grid } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RootState, useSelector } from "../redux/store";
import { StyledButton } from "../components/styledComponets/styledButton";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import CustomGridHeader from "../components/customGrid/customGridHeader";
import CustomGridProductPeriod from "../components/customGrid/customGridProductPeriod";
import CustomGridBody, {
  BikeType,
} from "../components/customGrid/customGridBody";
import { Salesorder } from "../types/productionPlanningTypes";

export default function ProduktionProgramm() {
  const { goTo } = useNavigationHandler();

  const { XML } = useSelector((state: RootState) => state.inputXML.list);

  const ChildrenBike: BikeType = {
    shortName: "P1",
    longName: "Children's Bicycle",
  };

  const ChildrenSalesOrder: Salesorder = {
    salesWish: XML?.results.forecast.p1 || 0,
    productionWish: XML?.results.forecast.p1 || 0,
  };

  const WommenBike: BikeType = {
    shortName: "P2",
    longName: "Wommen's Bicycle",
  };

  const WommenSalesOrder: Salesorder = {
    salesWish: XML?.results.forecast.p2 || 0,
    productionWish: XML?.results.forecast.p2 || 0,
  };

  const ManBike: BikeType = {
    shortName: "P3",
    longName: "Man's Bicycle",
  };

  const ManSalesOrder: Salesorder = {
    salesWish: XML?.results.forecast.p3 || 0,
    productionWish: XML?.results.forecast.p3 || 0,
  };

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo("/start/upload", Direction.Back)}
        sx={{ left: 0 }}
      >
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CustomGridHeader />
          <CustomGridProductPeriod period={XML?.results.period} />
          <CustomGridBody
            bikeType={ChildrenBike}
            salesOrder={ChildrenSalesOrder}
          />
          <CustomGridBody bikeType={WommenBike} salesOrder={WommenSalesOrder} />
          <CustomGridBody bikeType={ManBike} salesOrder={ManSalesOrder} />
        </Grid>
      </StyledCard>

      <StyledButton
        onClick={() => goTo("/start/material1", Direction.Forward)}
        sx={{ right: 0 }}
      >
        <ArrowForwardIosIcon />
      </StyledButton>
    </Container>
  );
}
