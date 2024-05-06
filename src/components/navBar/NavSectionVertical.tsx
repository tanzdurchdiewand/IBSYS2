import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import { StyledBox } from "../styledComponets/styledBox";
import { RootState, useSelector } from "../../redux/store";
import { i18n } from "../../locals";

// ----------------------------------------------------------------------

export default function NavSectionVertical() {
  const { step } = useSelector((state: RootState) => state.inputXML.list);
  return (
    <StyledBox>
      <Stepper
        sx={{
          width: { xs: "100%", md: "90%" },
          height: { xs: "100%", md: "90%" },
          mx: "auto",
          paddingLeft: 3.5,
        }}
        orientation="vertical"
        activeStep={step}
      >
        <Step>
          <StepLabel>{`${i18n.t("navBar.xmlUpload")}`}</StepLabel>
          <StepContent>
            <Typography>{`${i18n.t("navBarText.xmlUploadText")}`}</Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{`${i18n.t("navBar.productionProgramm")}`}</StepLabel>
          <StepContent>
            <Typography>{`${i18n.t(
              "navBarText.productionProgrammText"
            )}`}</Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{`${i18n.t("navBar.materialPlanning")}`}</StepLabel>
          <StepContent>
            <Typography>{`${i18n.t(
              "navBarText.materialPlanningText"
            )}`}</Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{`${i18n.t("navBar.orderPlanning")}`}</StepLabel>
          <StepContent>
            <Typography>{`${i18n.t(
              "navBarText.orderPlanningText"
            )}`}</Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{`${i18n.t("navBar.productionPlanning")}`}</StepLabel>
          <StepContent>
            <Typography>{`${i18n.t(
              "navBarText.productionPlanningText"
            )}`}</Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{`${i18n.t("navBar.capacityPlanning")}`}</StepLabel>
          <StepContent>
            <Typography>{`${i18n.t(
              "navBarText.capacityPlanningText"
            )}`}</Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{`${i18n.t("navBar.result")}`}</StepLabel>
          <StepContent>
            <Typography>{`${i18n.t("navBarText.resultText")}`}</Typography>
          </StepContent>
        </Step>
      </Stepper>
    </StyledBox>
  );
}
