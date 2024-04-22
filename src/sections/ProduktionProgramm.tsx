import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import { useContext } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { SelectInputXML } from "../pages/StartPage";
import { useNavigate } from "react-router-dom";
import { RootState, useSelector } from "../redux/store";

export default function ProduktionProgramm() {
  const { handleNextStep, handleBack } = useContext(SelectInputXML);
  const navigate = useNavigate();

  const handleOnKlickNextStep = () => {
    handleNextStep();
    navigate("/start/material1");
  };

  const handleOnKlickBack = () => {
    handleBack();
    navigate("/start/upload");
  };
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
      <Button
        variant="contained"
        onClick={handleOnKlickBack}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <ArrowBackIosIcon />
      </Button>
      <StyledCard
        sx={{
          width: { xs: "100%", md: "90%" },
          height: { xs: "100%", md: "90%" },
          minWidth: { xs: "100%", md: "300px" },
          minHeight: { xs: "100%", md: "700px" },
          mx: "auto",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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

      <Button
        variant="contained"
        onClick={handleOnKlickNextStep}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Container>
  );
}
