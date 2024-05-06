import { ElementType, Suspense, lazy } from "react";
import { Navigate, BrowserRouter as Router, useRoutes } from "react-router-dom";

import { PATH_PAGE } from "./paths";

// ----------------------------------------------------------------------------

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

// Pages
// ----------------------------------------------------------------------------
const StartPage = Loadable(lazy(() => import("../pages/StartPage")));
const UploadResultInputXML = Loadable(
  lazy(() => import("../sections/UploadResultInputXML"))
);
const ProduktionProgramm = Loadable(
  lazy(() => import("../sections/ProduktionProgramm"))
);
const MaterialPlanning = Loadable(
  lazy(() => import("../sections/MaterialPlanning"))
);
const OrderPlanning = Loadable(lazy(() => import("../sections/OrderPlanning")));
const ProductionPlanning = Loadable(
  lazy(() => import("../sections/DisplayProductionPlanning"))
);
const CapacityPlanning = Loadable(
  lazy(() => import("../sections/CapacityPlanning"))
);
const Result = Loadable(lazy(() => import("../sections/Result")));

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
        children: [
          { path: "upload", element: <UploadResultInputXML /> },
          { path: "produktion", element: <ProduktionProgramm /> },
          { path: "material", element: <MaterialPlanning /> },
          { path: "order", element: <OrderPlanning /> },
          { path: "production", element: <ProductionPlanning /> },
          { path: "capacity", element: <CapacityPlanning /> },
          { path: "result", element: <Result /> },
        ],
      },
      // Add a catch-all child route under the root
      {
        path: "*",
        element: <Navigate to="/" replace />,
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
