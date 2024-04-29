import { useContext } from "react";
import { Container, Button, Typography } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import { SelectInputXML } from "../pages/StartPage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { RootState, useSelector } from "../redux/store";
import { useFileUpload } from "../hooks/useFileUpload";
import { StyledButton } from "../components/styledComponets/styledButton";
import {
  Direction,
  useNavigationHandler,
} from "../hooks/useNavigationHandlers";

export default function UploadResultInputXML() {
  const { setSelectedInputXML } = useContext(SelectInputXML);
  const { fileName, fileSelected } = useSelector(
    (state: RootState) => state.inputXML.list
  );
  const { handleFileChange, validationErrors } =
    useFileUpload(setSelectedInputXML);
  const { goTo } = useNavigationHandler();

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledCard>
        {/* File input and error display logic */}
        <input
          style={{ display: "none" }}
          id="upload-button"
          type="file"
          accept=".xml"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-button">
          {fileSelected ? (
            <Typography variant="h6">
              <CheckCircleIcon
                color="success"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              {fileName}
            </Typography>
          ) : (
            validationErrors.length > 0 && (
              <div style={{ color: "red", marginTop: "20px" }}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Errors in file: {fileName}
                </Typography>
                {validationErrors.map((error, index) => (
                  <Typography key={index} sx={{ textAlign: "center" }}>
                    <ErrorIcon />
                    {typeof error === "string" ? error : error.message}
                  </Typography>
                ))}
              </div>
            )
          )}
          <Button variant="contained" component="span">
            Upload XML
          </Button>
        </label>
        {fileSelected && (
          <StyledButton
            onClick={() => goTo("/start/produktion", Direction.Forward)}
            sx={{ right: 0 }}
          >
            <ArrowForwardIosIcon />
          </StyledButton>
        )}
      </StyledCard>
    </Container>
  );
}
