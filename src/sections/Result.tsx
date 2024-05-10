import { Box, Container, Tab, Tabs } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledButton } from "../components/styledComponets/styledButton";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import { useDispatch } from "../redux/store";
import { useEffect, useState } from "react";
import { setStepper } from "../redux/slices/inputXML";
import MaterialPlanningComponent from "../components/materialPlanningComponents/MaterialPlanningComponent";
import { PlanningType } from "../types/materialPlanningTypes";

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
            sellwish
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            orders
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            production
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            workingtime
          </CustomTabPanel>
        </Box>
      </StyledCard>
    </Container>
  );
}
