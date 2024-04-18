import { Box } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RootState, useDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { PATH_PAGE } from "../routes/paths";
import UploadResultInputXML from "../sections/uploadResultInputXML";
import { uploadInputXML } from "../redux/slices/inputXML";
import { GameData } from "../types/types";
import ProduktionProgramm from "../sections/produktionProgramm";
import MaterialPlanningP1 from "../sections/MaterialPlanningP1";
import MaterialPlanningP3 from "../sections/MaterialPlanningP3";
import MaterialPlanningP2 from "../sections/MaterialPlanningP2";
import CapacityPlanningOverview from "../sections/CapacityPlanningOverview";
import CapacityPlanningTotal from "../sections/CapacityPlanningTotal";
import OrderPlanning from "../sections/OrderPlanning";
import Result from "../sections/Result";
import NavBar from "../components/navBar/NavBar";
import { setStepper } from "../redux/slices/inputXML";
import { useSelector } from "react-redux";

type InputNewXMLContext = {
  setSelectedInputXML: Dispatch<SetStateAction<GameData | undefined>>;
  selectedInputXML: GameData | undefined;
  handleNextStep: () => void;
  handleBack: () => void;
};

export const SelectInputXML = createContext<InputNewXMLContext>(
  {} as InputNewXMLContext
);

export default function StartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(true);
  const { step } = useSelector((state: RootState) => state.inputXML.list);
  const [selectedInputXML, setSelectedInputXML] = useState<
    GameData | undefined
  >(undefined);
  const handleNextStep = () => {
    dispatch(setStepper(1));
  };

  const handleBack = () => {
    dispatch(setStepper(-1));
  };

  const handleAbort = () => {
    navigate(PATH_PAGE.start.root);
  };
  const handleOpenNav = useCallback(() => {
    setOpenNav(true);
  }, []);

  const handleCloseNav = useCallback(() => {
    setOpenNav(false);
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedInputXML]
  );

  return (
    <SelectInputXML.Provider value={contextValue}>
      <Box
        sx={{
          display: "flex",
          minHeight: 1,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/BikesBackground.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <NavBar
          open={openNav}
          onOpen={handleOpenNav}
          onClose={handleCloseNav}
        />

        {step === 0 && <UploadResultInputXML />}
        {step === 1 && <ProduktionProgramm />}
        {step === 2 && <MaterialPlanningP1 />}
        {step === 3 && <MaterialPlanningP2 />}
        {step === 4 && <MaterialPlanningP3 />}
        {step === 5 && <CapacityPlanningOverview />}
        {step === 6 && <CapacityPlanningTotal />}
        {step === 7 && <OrderPlanning />}
        {step === 8 && <Result />}
      </Box>
    </SelectInputXML.Provider>
  );
}
