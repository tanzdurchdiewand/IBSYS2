import { Grid, Box, styled, Paper, TextField } from "@mui/material";
import { ProductionProgramm } from "../../types/productionPlanningTypes";
import { BikeType } from "./customGridDirectSell";
import { useProductionProgramm } from "../../hooks/useProductionProgramm";
import i18n from "../../locals/i18n";

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
  borderRadius: 0,
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

  const bikeTranslation =
    bikeType.shortName === "P1"
      ? i18n.t("productionProgramm.p1")
      : bikeType.shortName === "P2"
      ? i18n.t("productionProgramm.p2")
      : bikeType.shortName === "P3"
      ? i18n.t("productionProgramm.p3")
      : i18n.t("productionProgramm.p1");

  return (
    <Grid container>
      <Grid item xs={1}>
        {" "}
      </Grid>
      <Grid item xs={2}>
        <Item sx={{ backgroundColor: "rgba(255, 165, 0, 0.09)" }}>
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
              value={bikeTranslation}
              disabled={true}
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item sx={{ backgroundColor: "rgba(173, 255, 0, 0.1)" }}>
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
              label={i18n.t("productionProgramm.salesWish")}
              variant="outlined"
              value={Number(productionProgramm[type].salesOrder.salesWish)}
              disabled={true}
            />
            <TextField
              name={`${bikeType.shortName}.salesOrder.productionWish`}
              id="outlined-basic"
              label={i18n.t("productionProgramm.productionWish")}
              variant="outlined"
              value={Number(productionProgramm[type].salesOrder.productionWish)}
              type="number"
              onChange={handleValueChange}
              sx={{ backgroundColor: "white" }}
              inputProps={{ min: 0 }}
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item sx={{ backgroundColor: "rgba(255, 165, 0, 0.05)" }}>
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
              label={i18n.t("productionProgramm.salesWish")}
              variant="outlined"
              value={productionProgramm[type].forecast[0].salesOrder.salesWish}
              type="number"
              onChange={(event) =>
                handleForecastChange(event, bikeType.shortName, 0, "salesWish")
              }
              sx={{ backgroundColor: "white" }}
              inputProps={{ min: 0 }}
            />

            <TextField
              name={`${bikeType.shortName}.forecast[0].salesOrder.productionWish.`}
              id="outlined-basic"
              label={i18n.t("productionProgramm.productionWish")}
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
              sx={{ backgroundColor: "white" }}
              inputProps={{ min: 0 }}
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item sx={{ backgroundColor: "rgba(255, 165, 0, 0.05)" }}>
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
              label={i18n.t("productionProgramm.salesWish")}
              variant="outlined"
              value={productionProgramm[type].forecast[1].salesOrder.salesWish}
              type="number"
              onChange={(event) =>
                handleForecastChange(event, bikeType.shortName, 1, "salesWish")
              }
              sx={{ backgroundColor: "white" }}
              inputProps={{ min: 0 }}
            />
            <TextField
              name={`${bikeType.shortName}.forecast[1].salesOrder.productionWish.`}
              id="outlined-basic"
              label={i18n.t("productionProgramm.productionWish")}
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
              sx={{ backgroundColor: "white" }}
              inputProps={{ min: 0 }}
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item sx={{ backgroundColor: "rgba(255, 165, 0, 0.05)" }}>
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
              label={i18n.t("productionProgramm.salesWish")}
              variant="outlined"
              value={productionProgramm[type].forecast[2].salesOrder.salesWish}
              type="number"
              onChange={(event) =>
                handleForecastChange(event, bikeType.shortName, 2, "salesWish")
              }
              sx={{ backgroundColor: "white" }}
              inputProps={{ min: 0 }}
            />
            <TextField
              name={`${bikeType.shortName}.forecast[2].salesOrder.productionWish.`}
              id="outlined-basic"
              label={i18n.t("productionProgramm.productionWish")}
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
              sx={{ backgroundColor: "white" }}
              inputProps={{ min: 0 }}
            />
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
