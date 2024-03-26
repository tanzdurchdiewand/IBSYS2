import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  text: {
    marginTop: theme.spacing(2),
  },
}));

const LoadingScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <Typography variant="h6" className={classes.text}>
        Loading...
      </Typography>
    </div>
  );
};

export default LoadingScreen;
