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
import { Outlet, useNavigate } from "react-router-dom";
import { PATH_PAGE } from "../routes/paths";
import { GameData } from "../types/inputXMLTypes";
import NavBar from "../components/navBar/NavBar";
import { resetStepper, setStepper, uploadInputXML } from "../redux/slices/inputXML";
import { useDispatch } from "../redux/store";

type InputNewXMLContext = {
  setSelectedInputXML: Dispatch<SetStateAction<GameData | undefined>>;
  selectedInputXML: GameData | undefined;
  handleNextStep: (step: number) => void;
  handleBack: () => void;
  handleAbort: () => void;
};

export const SelectInputXML = createContext<InputNewXMLContext>(
  {} as InputNewXMLContext
);

export default function StartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(true);
  const [selectedInputXML, setSelectedInputXML] = useState<
    GameData | undefined
  >(undefined);
  
  const handleNextStep = (step: number) => {
    dispatch(setStepper(step));
  };

  const handleBack = () => {
    dispatch(setStepper(-1));
  };

  const handleAbort = () => {
    navigate(PATH_PAGE.start.root);
    dispatch(resetStepper());
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
      handleAbort,
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

        <Outlet />
      </Box>
    </SelectInputXML.Provider>
  );
}
