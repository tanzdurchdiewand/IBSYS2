import { MaterialPlanningComponent } from "../components/materialPlanningComponents/MaterialPlanningComponent";
import { PlanningType } from "../types/materialPlanningTypes";

export const MaterialPlanningP1 = MaterialPlanningComponent(
  PlanningType.P1, 
  "/start/produktion", // backPath for navigation
  "/start/material2"   // forwardPath for navigation
);

export default MaterialPlanningP1;