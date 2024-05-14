import { Box, Container, Tab, Tabs } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledButton } from "../components/styledComponets/styledButton";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import { RootState, useDispatch, useSelector } from "../redux/store";
import { useEffect, useState } from "react";
import { setStepper } from "../redux/slices/inputXML";
import DownloadIcon from "@mui/icons-material/Download";
import SellResultComponent from "../components/resultComponents/sellResultComponent";
import OrderResultComponent from "../components/resultComponents/orderResultComponent";
import ProductionResultComponent from "../components/resultComponents/productionResultComponent";
import WorkingTimeResultComponent from "../components/resultComponents/workingTimeResultComponent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const { sellwish, selldirect, orderlist, productionlist, workingtimelist } =
    useSelector((state: RootState) => state.resultXml);

  const input = {
    sellwish,
    selldirect,
    orderlist,
    productionlist,
    workingtimelist,
  };
  console.log(input);

  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Container>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Result() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStepper(6));
  }, [dispatch]);
  const { goTo } = useNavigationHandler();
  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo("/start/capacity", Direction.Back)}
        sx={{ left: 0 }}
        tooltip="Previous Step"
      >
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Sell Wish & Sell Dirket" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
            <Tab label="Production" {...a11yProps(2)} />
            <Tab label="Workingtime" {...a11yProps(3)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <SellResultComponent />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <OrderResultComponent />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ProductionResultComponent />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <WorkingTimeResultComponent />
          </CustomTabPanel>
        </Box>
      </StyledCard>
      <StyledButton
        onClick={() => console.log("Download")}
        sx={{ right: 0 }}
        tooltip="Download XML Input File"
      >
        <DownloadIcon />
      </StyledButton>
    </Container>
  );
}
