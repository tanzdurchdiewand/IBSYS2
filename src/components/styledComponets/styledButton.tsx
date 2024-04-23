import { Button, SxProps, Theme } from "@mui/material";

interface StyledButtonProps {
  onClick: () => void;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}

export const StyledButton = ({ onClick, sx, children }: StyledButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        ...sx
      }}
    >
      {children}
    </Button>
  );
};