import { Grid, Box, Typography, styled, Paper } from "@mui/material";
import i18n from "../../locals/i18n";

export default function CustomGridHeader() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    borderRadius: 0,
  }));

  return (
    <Grid
      container
      sx={{
        paddingTop: "60px",
      }}
    >
      <Grid item xs={1}>
        {" "}
      </Grid>
      <Grid item xs={2}></Grid>
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
            alignItems="center"
            justifyContent="center"
            autoComplete="off"
          >
            <Typography variant="h6">
              {i18n.t("productionProgramm.salesorder")}
            </Typography>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item sx={{ backgroundColor: "rgba(255, 165, 0, 0.05)" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "row",
            }}
            noValidate
            alignItems="center"
            justifyContent="center"
            autoComplete="off"
          >
            <Typography variant="h6">
              {i18n.t("productionProgramm.forcast")}
            </Typography>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
