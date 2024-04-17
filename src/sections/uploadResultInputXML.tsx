import { Button, Container, Typography } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import { useContext, useState } from "react";
import { SelectInputXML } from "../pages/StartPage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import * as xml2js from "xml2js";
import { GameData } from "../types/types";

export default function UploadResultInputXML() {
  const { handleNextStep, setSelectedInputXML } = useContext(SelectInputXML);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");

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
          {fileSelected && <Typography variant="h6">{fileName}</Typography>}
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
                  if (typeof e.target?.result === "string") {
                    xml2js.parseString(
                      e.target.result,
                      { explicitArray: false },
                      (error, result) => {
                        if (error) {
                          console.error("Failed to parse XML:", error);
                        } else {
                          setSelectedInputXML(result as GameData);
                          setFileSelected(true);
                          setFileName(file.name);
                        }
                      }
                    );
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
          onClick={handleNextStep}
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
