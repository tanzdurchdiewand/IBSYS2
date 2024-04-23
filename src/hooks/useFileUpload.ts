import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFileName, setFileSelected } from '../redux/slices/inputXML';
import { XMLParser } from 'fast-xml-parser';
import { validate } from '../schema/xmlSchema';
import { GameData, ValidationError } from '../types/inputXMLTypes';

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: "",
  arrayMode: /articles|workplaces|orders|waitinglist/,
  textNodeName: "#text"
};

const parser = new XMLParser(options);

export function useFileUpload(handleSelectedInputXML: (data: GameData) => void) {
  const [validationErrors, setValidationErrors] = useState<(string | ValidationError)[]>([]);
  const dispatch = useDispatch();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) {
      setValidationErrors(['No file selected.']);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
      dispatch(setFileName(file.name));
      setValidationErrors(['Failed to read file. Please try again or use a different file.']);
    };

    reader.onload = () => {
      const result = reader.result as string;
      try {
        const jsonObj = parser.parse(result);
        dispatch(setFileName(file.name));
        if (validate(jsonObj)) {
          handleSelectedInputXML(jsonObj as GameData);
          dispatch(setFileSelected(true)); 
          setValidationErrors([]);
        } else {
          console.error("Validation errors:", validate.errors);
          dispatch(setFileSelected(false));
          setValidationErrors(validate.errors?.map(err => err.message || "Unknown error") || ['Validation failed with unknown error']);
        }
      } catch (error) {
        console.error("Error parsing XML:", error);
        dispatch(setFileName(file.name));
        setValidationErrors(['Error parsing XML file. Ensure the file is correctly formatted.']);
      }
    };

    reader.readAsText(file);
  }

  return { handleFileChange, validationErrors };
}
