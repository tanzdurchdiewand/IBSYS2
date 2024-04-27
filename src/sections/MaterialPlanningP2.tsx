import { MaterialPlanningComponent } from "../components/materialPlanningComponents/MaterialPlanningComponent";
import { PlanningType } from "../types/materialPlanningTypes";

export const MaterialPlanningP2 = MaterialPlanningComponent(
  PlanningType.P2, 
  "/start/material1", // backPath for navigation
  "/start/material3"   // forwardPath for navigation
);

export default MaterialPlanningP2;