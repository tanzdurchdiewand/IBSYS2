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
import CustomProductionGridBody, {
  BikeType,
} from "../components/customGrid/customProductionGridBody";
import {
  DirectSellRow,
  ProductionProgramm,
  SalesOrder,
} from "../types/productionPlanningTypes";
import { FormProvider, useForm } from "react-hook-form";
import { setProductionProgramm } from "../redux/slices/inputProduction";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { setStepper } from "../redux/slices/inputXML";
import CustomGridDirectSell from "../components/customGrid/customGridDirectSell";

const salesOrderSchema = yup.object().shape({
  salesWish: yup.number().required(),
  productionWish: yup.number().required(),
});

const productionForecastSchema = yup.object().shape({
  period: yup.number().required(),
  salesOrder: salesOrderSchema.required(),
});

const productProductionSchema = yup.object().shape({
  salesOrder: salesOrderSchema.required(),
  forecast: yup.array().of(productionForecastSchema).required(),
});

const productionProgrammSchema = yup.object().shape({
  P1: productProductionSchema.required(),
  P2: productProductionSchema.required(),
  P3: productProductionSchema.required(),
});

export default function ProduktionProgramm() {
  const methods = useForm<ProductionProgramm>({
    // resolver: yupResolver(productionProgrammSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStepper(1));
  }, [dispatch]);
  const {
    handleSubmit,
    // formState: { isSubmitting, isDirty },
  } = methods;

  const handleNextPage = () => {
    goTo("/start/material", Direction.Forward);
    handleSubmit(handleSetProductionProgramm)();
  };
  const handleSetProductionProgramm = (data: ProductionProgramm) => {
    console.log(data);
    dispatch(setProductionProgramm(data));
  };

  const { goTo } = useNavigationHandler();

  const { XML } = useSelector((state: RootState) => state.inputXML.list);

  const { productionProgramm } = useSelector(
    (state: RootState) => state.inputProduction.list
  );

  const ChildrenBike: BikeType = {
    shortName: "P1",
    longName: "Children's Bicycle",
  };

  const ChildrenSalesOrder: SalesOrder = {
    salesWish: XML?.results.forecast.p1 ?? 0,
    productionWish: XML?.results.forecast.p1 ?? 0,
  };

  const WommenBike: BikeType = {
    shortName: "P2",
    longName: "Wommen's Bicycle",
  };

  const WommenSalesOrder: SalesOrder = {
    salesWish: XML?.results.forecast.p2 ?? 0,
    productionWish: XML?.results.forecast.p2 ?? 0,
  };

  const ManBike: BikeType = {
    shortName: "P3",
    longName: "Man's Bicycle",
  };

  const ManSalesOrder: SalesOrder = {
    salesWish: XML?.results.forecast.p3 ?? 0,
    productionWish: XML?.results.forecast.p3 ?? 0,
  };

  const MockSell: DirectSellRow = {
    amount: 0,
    price: 0,
    penalty: 0,
  };

  return (
    <FormProvider {...methods}>
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
            <CustomProductionGridBody
              bikeType={ChildrenBike}
              salesOrder={ChildrenSalesOrder}
              period={XML?.results.period}
              productProduction={productionProgramm?.P1}
            />
            <CustomProductionGridBody
              bikeType={WommenBike}
              salesOrder={WommenSalesOrder}
              period={XML?.results.period}
              productProduction={productionProgramm?.P2}
            />
            <CustomProductionGridBody
              bikeType={ManBike}
              salesOrder={ManSalesOrder}
              period={XML?.results.period}
              productProduction={productionProgramm?.P3}
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
        </StyledCard>

        <StyledButton onClick={() => handleNextPage()} sx={{ right: 0 }}>
          <ArrowForwardIosIcon />
        </StyledButton>
      </Container>
    </FormProvider>
  );
}
