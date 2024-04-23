import { Box, BoxProps } from "@mui/material";
import { useContext } from "react";
import { SelectInputXML } from "../../pages/StartPage";

// ----------------------------------------------------------------------

export default function Logo({sx}: BoxProps) {
    const { handleAbort } = useContext(SelectInputXML);
    return (
      <Box
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: "inline-flex",
          ...sx,
        }}
        onClick={handleAbort}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src="/logoBike.jpg"
          alt="logoBike"
        />
      </Box>
    );
  };