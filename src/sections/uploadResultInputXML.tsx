import { StyledCard } from "../components/styledComponets/styledCard";
import { useContext } from "react";
import { SelectInputXML } from "../pages/StartPage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Container, Typography } from "@mui/material";
import { XMLParser } from "fast-xml-parser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setFileName, setFileSelected } from "../redux/slices/inputXML";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { validate } from "../schema/xmlSchema";
import { GameData } from "../types/types";

export default function UploadResultInputXML() {
  const dispatch = useDispatch();
  const { fileName, fileSelected } = useSelector((state: RootState) => state.inputXML.list);
  const { handleNextStep, setSelectedInputXML } = useContext(SelectInputXML);
  const navigate = useNavigate();

  const handleOnKlickNextStep = () => {
    handleNextStep();
    navigate("/start/produktion");
  };

  const options = {
    ignoreAttributes: false, // Don't ignore attributes
    attributeNamePrefix: "", // Use empty string if you don't want prefixes
    arrayMode: /articles|workplaces|orders|waitinglist/, // Specify which tags should always be treated as arrays
    textNodeName: "#text" // Use if you want to capture the text of nodes specifically
  };

  const parser = new XMLParser(options);

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledCard
        sx={{
          width: { xs: "100%", md: "90%" },
          height: { xs: "100%", md: "90%" },
          minWidth: { xs: "100%", md: "300px" },
          minHeight: { xs: "100%", md: "700px" },
          mx: "auto",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="upload-button">
          {fileSelected && (<Typography variant="h6">
            <CheckCircleIcon color="success" sx={{ verticalAlign: "middle", mr: 1 }} />{fileName}
          </Typography>)}
          <input
            style={{ display: "none" }}
            id="upload-button"
            name="upload-button"
            type="file"
            accept=".xml"
            onChange={(event) => {
              if (event.target.files) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = function (e) {
                  if (typeof e.target!.result === "string") {
                    console.log("xml", e.target!.result);
                    let jsonObj = parser.parse(e.target!.result);
                    console.log("Parsed JSON:", JSON.stringify(jsonObj, null, 2));

                    // Validate the parsed JSON against the schema
                    if (validate(jsonObj)) {
                      console.log("Validation succeeded:", jsonObj);

                      setSelectedInputXML(jsonObj as GameData);
                      dispatch(setFileSelected(true));
                      dispatch(setFileName(file.name));
                    } else {
                      
                      console.error("Validation errors:", validate.errors);
                      // Handle the error scenario, e.g., showing an error message to the user
                    }
                  }
                };
                reader.readAsText(file);
              }
            }}
          />
          <Button variant="contained" component="span">
            Upload XML
          </Button>
        </label>
      </StyledCard>
      {fileSelected && (
        <Button
          variant="contained"
          onClick={handleOnKlickNextStep}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      )}
    </Container>
  );
}
