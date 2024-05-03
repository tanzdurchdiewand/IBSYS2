import { Grid, Box, styled, Paper } from "@mui/material";
import {
  ProductProduction,
  ProductionProgramm,
  SalesOrder,
} from "../../types/productionPlanningTypes";
import { useFormContext } from "react-hook-form";
import RHFTextField from "../hookform/RHFTextFlied";
import { useEffect } from "react";

export type BikeType = {
  shortName: string;
  longName: string;
};

type Props = {
  bikeType: BikeType;
  salesOrder: SalesOrder;
  period?: number;
  productProduction: ProductProduction | undefined;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CustomGridBody({
  bikeType,
  salesOrder,
  period,
  productProduction,
}: Readonly<Props>) {
  const { setValue } = useFormContext<ProductionProgramm>();

  useEffect(() => {
    setValue(
      `${bikeType.shortName}.salesOrder.salesWish` as any,
      salesOrder.salesWish
    );
    setValue(`${bikeType.shortName}.forecast[0].period` as any, period! + 2);
    setValue(`${bikeType.shortName}.forecast[1].period` as any, period! + 3);
    setValue(`${bikeType.shortName}.forecast[2].period` as any, period! + 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item xs={1}>
        {" "}
      </Grid>
      <Grid item xs={2}>
        <Item>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "row",
            }}
            noValidate
            autoComplete="off"
          >
            <RHFTextField
              name={`productionProgramm.${bikeType.shortName}`}
              id="outlined-basic"
              label={bikeType.shortName}
              variant="outlined"
              value={bikeType.longName}
              disabled={true}
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "row",
            }}
            noValidate
            autoComplete="off"
          >
            <RHFTextField
              name={`${bikeType.shortName}.salesOrder.salesWish`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={salesOrder.salesWish}
              disabled={true}
              type="number"
            />
            <RHFTextField
              name={`${bikeType.shortName}.salesOrder.productionWish`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
              value={productProduction?.salesOrder.productionWish}
              type="number"
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "row",
            }}
            noValidate
            autoComplete="off"
          >
            <RHFTextField
              name={`${bikeType.shortName}.forecast[0].salesOrder.salesWish.`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={productProduction?.forecast[0].salesOrder.salesWish}
              type="number"
            />
            <RHFTextField
              name={`${bikeType.shortName}.forecast[0].salesOrder.productionWish.`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
              value={productProduction?.forecast[0].salesOrder.productionWish}
              type="number"
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "row",
            }}
            noValidate
            autoComplete="off"
          >
            <RHFTextField
              name={`${bikeType.shortName}.forecast[1].salesOrder.salesWish.`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={productProduction?.forecast[1].salesOrder.salesWish}
              type="number"
            />
            <RHFTextField
              name={`${bikeType.shortName}.forecast[1].salesOrder.productionWish.`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
              value={productProduction?.forecast[1].salesOrder.productionWish}
              type="number"
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "row",
            }}
            noValidate
            autoComplete="off"
          >
            <RHFTextField
              name={`${bikeType.shortName}.forecast[2].salesOrder.salesWish.`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={productProduction?.forecast[2].salesOrder.salesWish}
              type="number"
            />
            <RHFTextField
              name={`${bikeType.shortName}.forecast[2].salesOrder.productionWish.`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
              value={productProduction?.forecast[2].salesOrder.productionWish}
              type="number"
            />
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
