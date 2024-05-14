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

  const { sellwish, selldirect, orderlist, productionlist, workingtimelist } =
    useSelector((state: RootState) => state.resultXml);

  const qualitycontrol = {
    type: "no",
    losequantity: "0",
    delay: "0",
  };

  const input = {
    qualitycontrol,
    sellwish,
    selldirect,
    orderlist,
    productionlist,
    workingtimelist,
  };
  console.log(input);

  const jObj = {
    input,
  };

  const handleOnClick = () => {
    const { XMLBuilder } = require("fast-xml-parser");

    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: "",
      arrayMode:
        /waitinglistworkstations|articles|workplace|orders|waitinglist/,
      textNodeName: "#text",
    };

    const builder = new XMLBuilder(options);
    const xmlContent = builder.build(jObj);
    console.log(xmlContent);
    // Create a blob from the XML content
    const blob = new Blob([xmlContent], { type: "application/xml" });

    // Create a link element
    const downloadLink = document.createElement("a");

    // Create a downloadable URL from the blob
    downloadLink.href = URL.createObjectURL(blob);

    // Set the download attribute of the link element
    downloadLink.download = "input.xml";

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Programmatically click the link to start the download
    downloadLink.click();

    // Clean up by removing the link element from the body
    document.body.removeChild(downloadLink);
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
        onClick={handleOnClick}
        sx={{ right: 0 }}
        tooltip="Download XML Input File"
      >
        <DownloadIcon />
      </StyledButton>
    </Container>
  );
}
