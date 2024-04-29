import { MaterialPlanningComponent } from "../components/materialPlanningComponents/MaterialPlanningComponent";
import { PlanningType } from "../types/materialPlanningTypes";

export const MaterialPlanningP2 = MaterialPlanningComponent(
  PlanningType.P3, 
  "/start/material2", // backPath for navigation
  "/start/capacity-overview"   // forwardPath for navigation
);

export default MaterialPlanningP2;