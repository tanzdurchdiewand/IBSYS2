import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RootState, useSelector } from "../redux/store";
import { StyledButton } from "../components/styledComponets/styledButton";
import { Direction, useNavigationHandler } from "../hooks/useNavigationHandlers";

export default function ProduktionProgramm() {
  const { goTo } = useNavigationHandler();

  const { XML } = useSelector((state: RootState) => state.inputXML.list);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton onClick={() => goTo("/start/upload", Direction.Back)} sx={{ left: 0 }}>
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
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
                  alignItems="center"
                  justifyContent="center"
                  autoComplete="off"
                >
                  <Typography variant="h6">Product \ Periode</Typography>
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
                  alignItems="center"
                  justifyContent="center"
                  autoComplete="off"
                >
                  <Typography variant="h6">{XML?.results.period}</Typography>
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
                  alignItems="center"
                  justifyContent="center"
                  autoComplete="off"
                >
                  <Typography variant="h6">
                    {(Number(XML?.results.period) || 0) + 1}
                  </Typography>
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
                  alignItems="center"
                  justifyContent="center"
                  autoComplete="off"
                >
                  <Typography variant="h6">
                    {(Number(XML?.results.period) || 0) + 2}
                  </Typography>
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
                  alignItems="center"
                  justifyContent="center"
                  autoComplete="off"
                >
                  <Typography variant="h6">
                    {(Number(XML?.results.period) || 0) + 3}
                  </Typography>
                </Box>
              </Item>
            </Grid>
          </Grid>
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
                    id="outlined-basic"
                    label="P1"
                    variant="outlined"
                    value="Cildren´s Bicycle"
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
                    id="outlined-basic"
                    label="Sales Wish"
                    variant="outlined"
                    value={XML?.results.forecast.p1}
                    disabled={true}
                  />
                  <TextField
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
        </Grid>
      </StyledCard>

      <StyledButton onClick={() => goTo("/start/material1", Direction.Forward)} sx={{ right: 0 }}>
        <ArrowForwardIosIcon/>
      </StyledButton>
    </Container>
  );
}
