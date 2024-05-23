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
import CustomProductionGridFooter from "../components/customGrid/customGridFooter";
import CustomGridProductPeriod from "../components/customGrid/customGridProductPeriod";
import { DirectSell } from "../types/productionPlanningTypes";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { setStepper } from "../redux/slices/inputXML";
import CustomGridDirectSell, {
  BikeType,
} from "../components/customGrid/customGridDirectSell";
import { useProductionProgramm } from "../hooks/useProductionProgramm";
import CustomProductionGridBody from "../components/customGrid/customProductionGridBody";
import { setDirectSell } from "../redux/slices/inputProductionProgramm";
import i18n from "../locals/i18n";
import { useLocales } from "../locals";

export const directSellStart: DirectSell = {
  P1: { amount: 0, price: 0, penalty: 0 },
  P2: { amount: 0, price: 0, penalty: 0 },
  P3: { amount: 0, price: 0, penalty: 0 },
};

export default function ProduktionProgramm() {
  useLocales();
  const directSellFromStore = useSelector(
    (state: RootState) => state.inputProductionProgramm.data?.directSell
  );
  const methods = useForm<DirectSell>({
    defaultValues: directSellFromStore || directSellStart,
    mode: "onChange",
  });
  const { handleSubmit } = methods;

  const { productionProgramm } = useProductionProgramm();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStepper(1));
  }, [dispatch]);

  const handleNextPage = () => {
    handleSubmit(onSubmit)();
    goTo("/start/material", Direction.Forward);
  };
  const onSubmit = (data: DirectSell) => {
    dispatch(setDirectSell(data));
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

  const sellDirect = methods.watch();

  useEffect(() => {
    dispatch(setDirectSell(sellDirect));
  }, [dispatch]);

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
              <CustomProductionGridFooter
                productionProgramm={productionProgramm!}
              />

              <Accordion style={{ marginTop: "20px", width: "84%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {i18n.t("productionProgramm.directSellTable")}
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
                      directSell={sellDirect.P1}
                    />
                    <CustomGridDirectSell
                      bikeType={WommenBike}
                      directSell={sellDirect.P2}
                    />
                    <CustomGridDirectSell
                      bikeType={ManBike}
                      directSell={sellDirect.P3}
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
