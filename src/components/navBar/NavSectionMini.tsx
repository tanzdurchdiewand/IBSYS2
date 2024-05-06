/* eslint-disable react/no-multi-comp */
import { Step, StepLabel, Stepper } from "@mui/material";
import { memo } from "react";
import { RootState, useSelector } from "../../redux/store";
import { StyledBox } from "../styledComponets/styledBox";

// ----------------------------------------------------------------------

function NavSectionMini() {
  const { step } = useSelector((state: RootState) => state.inputXML.list);
  return (
    <StyledBox>
      <Stepper
        sx={{ width: { xs: "90%", md: "90%" }, mx: "auto", paddingLeft: 3.5 }}
        orientation="vertical"
        activeStep={step}
      >
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
      </Stepper>
    </StyledBox>
  );
}

export default memo(NavSectionMini);
