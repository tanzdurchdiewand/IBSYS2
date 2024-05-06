import { useNavigate } from 'react-router-dom';

export enum Direction {
  Forward = "FORWARD",
  Back = "BACK"
}

export const useNavigationHandler = () => {
  const navigate = useNavigate();
  const goTo = (path: string, direction: Direction) => {
    navigate(path);
  };

  return { goTo };
};