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
import { Outlet, useNavigate } from "react-router-dom";
import { PATH_PAGE } from "../routes/paths";
import { GameData } from "../types/types";
import NavBar from "../components/navBar/NavBar";
import { setStepper, uploadInputXML } from "../redux/slices/inputXML";
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
    switch (step) {
      case 0:
        navigate("/start/upload");
        break;
      case 1:
        navigate("/start/produktion");
        break;
      case 2:
        navigate("/start/material1");
        break;
      case 3:
        navigate("/start/material2");
        break;
      case 4:
        navigate("/start/material3");
        break;
      case 5:
        navigate("/start/capacity-overview");
        break;
      case 6:
        navigate("/start/capacity-total");
        break;
      case 7:
        navigate("/start/order");
        break;
      case 8:
        navigate("/start/result");
        break;
      default:
        break;
    }
  }, [step, navigate]);

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

        <Outlet />
      </Box>
    </SelectInputXML.Provider>
  );
}
