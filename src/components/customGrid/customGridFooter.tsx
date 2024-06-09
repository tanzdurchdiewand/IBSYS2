import { Grid, Box, styled, Paper, TextField } from "@mui/material";
import { ProductionProgramm } from "../../types/productionPlanningTypes";
import i18n from "../../locals/i18n";

type Props = {
  productionProgramm: ProductionProgramm;
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
  productionProgramm,
}: Readonly<Props>) {
  const sumSalesWish =
    Number(productionProgramm["P1"].salesOrder.salesWish || 0) +
    Number(productionProgramm["P2"].salesOrder.salesWish || 0) +
    Number(productionProgramm["P3"].salesOrder.salesWish || 0);

  const sumProductionWish =
    Number(productionProgramm["P1"].salesOrder.productionWish || 0) +
    Number(productionProgramm["P2"].salesOrder.productionWish || 0) +
    Number(productionProgramm["P3"].salesOrder.productionWish || 0);

  const sumSalesWishf0 =
    (productionProgramm["P1"].forecast[0].salesOrder.salesWish || 0) +
    (productionProgramm["P2"].forecast[0].salesOrder.salesWish || 0) +
    (productionProgramm["P3"].forecast[0].salesOrder.salesWish || 0);

  const sumProductionWishf0 =
    (productionProgramm["P1"].forecast[0].salesOrder.productionWish || 0) +
    (productionProgramm["P2"].forecast[0].salesOrder.productionWish || 0) +
    (productionProgramm["P3"].forecast[0].salesOrder.productionWish || 0);

  const sumSalesWishf1 =
    (productionProgramm["P1"].forecast[1].salesOrder.salesWish || 0) +
    (productionProgramm["P2"].forecast[1].salesOrder.salesWish || 0) +
    (productionProgramm["P3"].forecast[1].salesOrder.salesWish || 0);

  const sumProductionWishf1 =
    (productionProgramm["P1"].forecast[1].salesOrder.productionWish || 0) +
    (productionProgramm["P2"].forecast[1].salesOrder.productionWish || 0) +
    (productionProgramm["P3"].forecast[1].salesOrder.productionWish || 0);

  const sumSalesWishf2 =
    (productionProgramm["P1"].forecast[2].salesOrder.salesWish || 0) +
    (productionProgramm["P2"].forecast[2].salesOrder.salesWish || 0) +
    (productionProgramm["P3"].forecast[2].salesOrder.salesWish || 0);

  const sumProductionWishf2 =
    (productionProgramm["P1"].forecast[2].salesOrder.productionWish || 0) +
    (productionProgramm["P2"].forecast[2].salesOrder.productionWish || 0) +
    (productionProgramm["P3"].forecast[2].salesOrder.productionWish || 0);

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
              id="outlined-basic"
              label={i18n.t("productionProgramm.total")}
              variant="outlined"
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
              id="outlined-basic"
              label={i18n.t("productionProgramm.salesWish")}
              variant="outlined"
              value={sumSalesWish}
              disabled={true}
            />
            <TextField
              id="outlined-basic"
              label={i18n.t("productionProgramm.productionWish")}
              variant="outlined"
              value={sumProductionWish}
              disabled={true}
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
              id="outlined-basic"
              label={i18n.t("productionProgramm.salesWish")}
              variant="outlined"
              value={sumSalesWishf0}
              disabled={true}
            />
            <TextField
              id="outlined-basic"
              label={i18n.t("productionProgramm.productionWish")}
              variant="outlined"
              value={sumProductionWishf0}
              disabled={true}
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
              id="outlined-basic"
              label={i18n.t("productionProgramm.salesWish")}
              variant="outlined"
              value={sumSalesWishf1}
              disabled={true}
            />
            <TextField
              id="outlined-basic"
              label={i18n.t("productionProgramm.productionWish")}
              variant="outlined"
              value={sumProductionWishf1}
              disabled={true}
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
              id="outlined-basic"
              label={i18n.t("productionProgramm.salesWish")}
              variant="outlined"
              value={sumSalesWishf2}
              disabled={true}
            />
            <TextField
              id="outlined-basic"
              label={i18n.t("productionProgramm.productionWish")}
              variant="outlined"
              value={sumProductionWishf2}
              disabled={true}
            />
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
