import { Container, Grid } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RootState, useDispatch, useSelector } from "../redux/store";
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
import {
  ProductionProgramm,
  SalesOrder,
} from "../types/productionPlanningTypes";
import { FormProvider, useForm } from "react-hook-form";
import { setProductionProgramm } from "../redux/slices/inputProduction";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    resolver: yupResolver(productionProgrammSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
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
            <CustomGridBody
              bikeType={ChildrenBike}
              salesOrder={ChildrenSalesOrder}
              period={XML?.results.period}
              productProduction={productionProgramm?.P1}
            />
            <CustomGridBody
              bikeType={WommenBike}
              salesOrder={WommenSalesOrder}
              period={XML?.results.period}
              productProduction={productionProgramm?.P2}
            />
            <CustomGridBody
              bikeType={ManBike}
              salesOrder={ManSalesOrder}
              period={XML?.results.period}
              productProduction={productionProgramm?.P3}
            />
          </Grid>
        </StyledCard>

        <StyledButton onClick={() => handleNextPage()} sx={{ right: 0 }}>
          <ArrowForwardIosIcon />
        </StyledButton>
      </Container>
    </FormProvider>
  );
}
