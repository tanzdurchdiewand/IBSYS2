import { ElementType, Suspense, lazy } from "react";
import { Navigate, BrowserRouter as Router, useRoutes } from "react-router-dom";

import LoadingScreen from "../components/loading-screen/LoadingScreen";
import { PATH_PAGE } from "./paths";

// ----------------------------------------------------------------------------

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
// ----------------------------------------------------------------------------
const StartPage = Loadable(lazy(() => import("../pages/StartPage")));

// Router
// ----------------------------------------------------------------------------
const routes = [
  {
    path: "/",
    children: [
      { element: <Navigate to={PATH_PAGE.start.root} replace />, index: true },
      {
        path: "start",
        element: <StartPage />,
        children: [],
      },
    ],
  },
];

const RoutesComponent = () => {
  let element = useRoutes(routes);
  return element;
};

const AppRouter = () => (
  <Router>
    <RoutesComponent />
  </Router>
);

export default AppRouter;
