import { Grid, Box, Typography, styled, Paper } from "@mui/material";

export default function CustomGridHeader() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container>
      <Grid item xs={1}>
        {" "}
      </Grid>
      <Grid item xs={4}>
        <Item>
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
            <Typography variant="h6">Sales Order</Typography>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
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
            <Typography variant="h6">Forecast</Typography>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
