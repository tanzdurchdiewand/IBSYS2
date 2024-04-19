import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import { StyledBox } from "../styledComponets/styledBox";
import { RootState, useSelector } from "../../redux/store";

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
          <StepLabel>XML Upload</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Produktions Programm</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Material Planning P1</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Material Planning P2</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Material Planning P3</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Capacity Planning Overview</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Capacity Planning Total</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Order Planning</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Result</StepLabel>
          <StepContent>
            <Typography>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </Typography>
          </StepContent>
        </Step>
      </Stepper>
    </StyledBox>
  );
}
