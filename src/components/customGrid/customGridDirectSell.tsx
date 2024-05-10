import { Grid, Box, styled, Paper } from "@mui/material";
import { DirectSellRow } from "../../types/productionPlanningTypes";
import RHFTextField from "../hookform/RHFTextFlied";

export type BikeType = {
  shortName: string;
  longName: string;
};

type Props = {
  bikeType: BikeType;
  directSell: DirectSellRow | undefined;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CustomGridDirectSell({
  bikeType,
  directSell,
}: Readonly<Props>) {
  console.log("directSell", directSell);
  return (
    <Grid container>
      <Grid item xs={3}>
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
      <Grid item xs={3}>
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
              name={`${bikeType.shortName}.amount.`}
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              value={directSell?.amount}
              type="number"
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={3}>
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
              name={`${bikeType.shortName}.price`}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={directSell?.price}
              type="number"
            />
          </Box>
        </Item>
      </Grid>
      <Grid item xs={3}>
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
              name={`${bikeType.shortName}.penalty`}
              id="outlined-basic"
              label="Penalty"
              variant="outlined"
              value={directSell?.penalty}
              type="number"
            />
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
