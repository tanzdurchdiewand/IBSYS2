import { Button, SxProps, Theme, Tooltip } from "@mui/material";

interface StyledButtonProps {
  onClick: () => void;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  tooltip: string;
}

export const StyledButton = ({
  onClick,
  sx,
  children,
  tooltip,
}: StyledButtonProps) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          ...sx,
        }}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
