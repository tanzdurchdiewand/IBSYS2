import { Container, Step, StepLabel, Stepper } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyledBox } from "../components/styledComponets/styledBox";
import { useDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { PATH_PAGE } from "../routes/paths";
import UploadResultInputXML from "../sections/uploadResultInputXML";
import { uploadInputXML } from "../redux/slices/InputXML";
import { GameData } from "../types/types";

type InputNewXMLContext = {
  setSelectedInputXML: Dispatch<SetStateAction<GameData | undefined>>;
  selectedInputXML: GameData | undefined;
  handleNextStep: () => void;
  handleBack: () => void;
};

export const SelectInputXML = createContext<InputNewXMLContext>(
  {} as InputNewXMLContext
);

export default function ListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedInputXML, setSelectedInputXML] = useState<
    GameData | undefined
  >(undefined);
  console.log(selectedInputXML);
  const handleNextStep = () => {
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const handleAbort = () => {
    navigate(PATH_PAGE.start.root);
  };
  useEffect(() => {
    selectedInputXML !== undefined &&
      dispatch(uploadInputXML(selectedInputXML));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInputXML]);

  const contextValue: InputNewXMLContext = useMemo(
    () => ({
      selectedInputXML,
      setSelectedInputXML,
      handleNextStep,
      handleBack,
    }),
    [selectedInputXML]
  );

  return (
    <SelectInputXML.Provider value={contextValue}>
      <Container maxWidth={"xl"} sx={{ p: 3 }}>
        <StyledBox
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0)", // leichter Hintergrund
          }}
        >
          <Stepper
            sx={{ width: { xs: "100%", md: "90%" }, mx: "auto" }}
            activeStep={step}
          >
            <Step>
              <StepLabel>XML Upload</StepLabel>
            </Step>
            <Step>
              <StepLabel>Produktions Programm</StepLabel>
            </Step>
            <Step>
              <StepLabel>Material Planning P1</StepLabel>
            </Step>
            <Step>
              <StepLabel>Material Planning P2</StepLabel>
            </Step>
            <Step>
              <StepLabel>Material Planning P3</StepLabel>
            </Step>
            <Step>
              <StepLabel>Capacity Planning Overview</StepLabel>
            </Step>
            <Step>
              <StepLabel>Capacity Planning Total</StepLabel>
            </Step>
            <Step>
              <StepLabel>Order Planning</StepLabel>
            </Step>
            <Step>
              <StepLabel>Result</StepLabel>
            </Step>
          </Stepper>
          {/* Hier Burger Menu einfügen für Sprache DarkMode und Abbrechen */}
        </StyledBox>
        {step === 0 && <UploadResultInputXML />}
      </Container>
    </SelectInputXML.Provider>
  );
}
