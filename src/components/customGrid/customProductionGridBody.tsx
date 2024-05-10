import { Grid, Box, styled, Paper, TextField } from "@mui/material";
import { ProductionProgramm } from "../../types/productionPlanningTypes";
import { BikeType } from "./customGridDirectSell";
import { useProductionProgramm } from "../../hooks/useProductionProgramm";

type Props = {
  bikeType: BikeType;
  productionProgramm: ProductionProgramm;
  period: number;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CustomProductionGridBody({
  bikeType,
  productionProgramm,
  period,
}: Readonly<Props>) {
  const { handleValueChange, handleForecastChange } = useProductionProgramm();
  const type =
    bikeType.shortName === "P1"
      ? "P1"
      : bikeType.shortName === "P2"
      ? "P2"
      : bikeType.shortName === "P3"
      ? "P3"
      : "P1";

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
            <TextField
              name={`${bikeType.shortName}`}
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
            <TextField
              name={`${bikeType.shortName}.salesOrder.salesWish`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={productionProgramm[type].salesOrder.salesWish}
              disabled={true}
              type="number"
            />
            <TextField
              name={`${bikeType.shortName}.salesOrder.productionWish`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
              value={productionProgramm[type].salesOrder.productionWish}
              type="number"
              onChange={handleValueChange}
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
            <TextField
              name={`${bikeType.shortName}.forecast[0].salesOrder.salesWish.`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={productionProgramm[type].forecast[0].salesOrder.salesWish}
              type="number"
              onChange={(event) =>
                handleForecastChange(event, bikeType.shortName, 0, "salesWish")
              }
            />
            <TextField
              name={`${bikeType.shortName}.forecast[0].salesOrder.productionWish.`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
              value={
                productionProgramm[type].forecast[0].salesOrder.productionWish
              }
              type="number"
              onChange={(event) =>
                handleForecastChange(
                  event,
                  bikeType.shortName,
                  0,
                  "productionWish"
                )
              }
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
            <TextField
              name={`${bikeType.shortName}.forecast[1].salesOrder.salesWish.`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={productionProgramm[type].forecast[1].salesOrder.salesWish}
              type="number"
              onChange={(event) =>
                handleForecastChange(event, bikeType.shortName, 1, "salesWish")
              }
            />
            <TextField
              name={`${bikeType.shortName}.forecast[1].salesOrder.productionWish.`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
              value={
                productionProgramm[type].forecast[1].salesOrder.productionWish
              }
              type="number"
              onChange={(event) =>
                handleForecastChange(
                  event,
                  bikeType.shortName,
                  1,
                  "productionWish"
                )
              }
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
            <TextField
              name={`${bikeType.shortName}.forecast[2].salesOrder.salesWish.`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={productionProgramm[type].forecast[2].salesOrder.salesWish}
              type="number"
              onChange={(event) =>
                handleForecastChange(event, bikeType.shortName, 2, "salesWish")
              }
            />
            <TextField
              name={`${bikeType.shortName}.forecast[2].salesOrder.productionWish.`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
              value={
                productionProgramm[type].forecast[2].salesOrder.productionWish
              }
              type="number"
              onChange={(event) =>
                handleForecastChange(
                  event,
                  bikeType.shortName,
                  2,
                  "productionWish"
                )
              }
            />
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
