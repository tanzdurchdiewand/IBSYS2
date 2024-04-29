import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Container,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { StyledButton } from "../components/styledComponets/styledButton";
import { StyledCard } from "../components/styledComponets/styledCard";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import { PlanningType } from "../types/materialPlanningTypes";
import { MaterialPlanningComponent } from "../components/materialPlanningComponents/MaterialPlanningComponent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { goTo } = useNavigationHandler();

  const backPath = "/start/produktion";
  const forwardPath = "/start/capacity-overview";

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton
        onClick={() => goTo(backPath, Direction.Back)}
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
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <MaterialPlanningComponent planningType={PlanningType.P1} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MaterialPlanningComponent planningType={PlanningType.P2} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <MaterialPlanningComponent planningType={PlanningType.P3} />
          </CustomTabPanel>
        </Box>
      </StyledCard>
      <StyledButton
        onClick={() => goTo(forwardPath, Direction.Forward)}
        sx={{ right: 0 }}
      >
        <ArrowForwardIosIcon />
      </StyledButton>
    </Container>
  );
}
