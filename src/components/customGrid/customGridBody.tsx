import { Grid, Box, styled, Paper, TextField } from "@mui/material";
import {
  ProductionProgramm,
  Salesorder,
} from "../../types/productionPlanningTypes";
import { useFormContext } from "react-hook-form";
import RHFTextField from "../hookform/RHFTextFlied";
import { RootState, useSelector } from "../../redux/store";

export type BikeType = {
  shortName: string;
  longName: string;
};

type Props = {
  bikeType: BikeType;
  salesOrder: Salesorder;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CustomGridBody({ bikeType, salesOrder }: Props) {
  const { XML } = useSelector((state: RootState) => state.inputXML.list);

  const { watch, setValue } = useFormContext<ProductionProgramm>();

  const productionProgramm = watch();
  console.log(productionProgramm);

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
              name={`productionProgramm.${bikeType.shortName}.salesWish`}
              id="outlined-basic"
              label="Sales Wish"
              variant="outlined"
              value={salesOrder.salesWish}
              disabled={true}
            />
            <RHFTextField
              name={`productionProgramm.${bikeType.shortName}.productionWish`}
              id="outlined-basic"
              label="Production Wish"
              variant="outlined"
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
              name={`productionProgramm.${bikeType.shortName}.forecast.salesOrder.`}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField
              name={`productionProgramm.${bikeType.shortName}.forecast.productionWish.`}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
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
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
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
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
