import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
} from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RootState, useDispatch, useSelector } from "../redux/store";
import { StyledButton } from "../components/styledComponets/styledButton";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import CustomGridHeader from "../components/customGrid/customGridHeader";
import CustomGridProductPeriod from "../components/customGrid/customGridProductPeriod";
import {
  DirectSellRow,
  ProductionProgramm,
} from "../types/productionPlanningTypes";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { setStepper } from "../redux/slices/inputXML";
import CustomGridDirectSell, {
  BikeType,
} from "../components/customGrid/customGridDirectSell";
import { useProductionProgramm } from "../hooks/useProductionProgramm";
import CustomProductionGridBody from "../components/customGrid/customProductionGridBody";

export default function ProduktionProgramm() {
  const methods = useForm<ProductionProgramm>({
    // resolver: yupResolver(productionProgrammSchema),
    mode: "onChange",
  });

  const { productionProgramm } = useProductionProgramm();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStepper(1));
  }, [dispatch]);

  const handleNextPage = () => {
    goTo("/start/material", Direction.Forward);
  };

  const { goTo } = useNavigationHandler();

  const { XML } = useSelector((state: RootState) => state.inputXML.list);

  const ChildrenBike: BikeType = {
    shortName: "P1",
    longName: "Children's Bicycle",
  };

  const WommenBike: BikeType = {
    shortName: "P2",
    longName: "Wommen's Bicycle",
  };

  const ManBike: BikeType = {
    shortName: "P3",
    longName: "Man's Bicycle",
  };

  const MockSell: DirectSellRow = {
    amount: 0,
    price: 0,
    penalty: 0,
  };

  console.log("asaaaaa");

  return (
    <FormProvider {...methods}>
      <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
        <StyledButton
          onClick={() => goTo("/start/upload", Direction.Back)}
          sx={{ left: 0 }}
          tooltip="Previous Step"
        >
          <ArrowBackIosIcon />
        </StyledButton>
        <StyledCard>
          {productionProgramm && (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <CustomGridHeader />
              <CustomGridProductPeriod period={XML?.results.period} />
              <CustomProductionGridBody
                bikeType={ChildrenBike}
                productionProgramm={productionProgramm!}
                period={XML?.results.period ?? 0}
              />
              <CustomProductionGridBody
                bikeType={WommenBike}
                productionProgramm={productionProgramm!}
                period={XML?.results.period ?? 0}
              />
              <CustomProductionGridBody
                bikeType={ManBike}
                productionProgramm={productionProgramm!}
                period={XML?.results.period ?? 0}
              />

              <Accordion style={{ marginTop: "20px", width: "84%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Direkt Verkauf
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CustomGridDirectSell
                      bikeType={ChildrenBike}
                      directSell={MockSell}
                    />
                    <CustomGridDirectSell
                      bikeType={WommenBike}
                      directSell={MockSell}
                    />
                    <CustomGridDirectSell
                      bikeType={ManBike}
                      directSell={MockSell}
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
        </StyledCard>

        <StyledButton
          onClick={() => handleNextPage()}
          sx={{ right: 0 }}
          tooltip="Next Step"
        >
          <ArrowForwardIosIcon />
        </StyledButton>
      </Container>
    </FormProvider>
  );
}
