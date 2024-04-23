import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SelectInputXML } from '../pages/StartPage';

export enum Direction {
  Forward = "FORWARD",
  Back = "BACK"
}

export const useNavigationHandler = () => {
  const navigate = useNavigate();
  const { handleNextStep, handleBack } = useContext(SelectInputXML);

  const goTo = (path: string, direction: Direction) => {
    if (direction === Direction.Forward) {
      handleNextStep();
    } else {
      handleBack();
    }
    navigate(path);
  };

  return { goTo };
};