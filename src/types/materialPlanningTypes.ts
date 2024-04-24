
export interface P1Planning {
    [key: string]: MaterialPlanningRow;
    p1: MaterialPlanningRow;
    e26: MaterialPlanningRow;
    e51: MaterialPlanningRow;
    e16: MaterialPlanningRow;
    e17: MaterialPlanningRow;
    e50: MaterialPlanningRow;
    e4: MaterialPlanningRow;
    e10: MaterialPlanningRow;
    e49: MaterialPlanningRow;
    e7: MaterialPlanningRow;
    e13: MaterialPlanningRow;
    e18: MaterialPlanningRow;
  }
  
  export interface P2Planning {
    [key: string]: MaterialPlanningRow;
    p2: MaterialPlanningRow;
    e26: MaterialPlanningRow;
    e56: MaterialPlanningRow;
    e16: MaterialPlanningRow;
    e17: MaterialPlanningRow;
    e55: MaterialPlanningRow;
    e5: MaterialPlanningRow;
    e11: MaterialPlanningRow;
    e54: MaterialPlanningRow;
    e8: MaterialPlanningRow;
    e14: MaterialPlanningRow;
    e19: MaterialPlanningRow;
  }
  
  export interface P3Planning {
    [key: string]: MaterialPlanningRow;
    p3: MaterialPlanningRow;
    e26: MaterialPlanningRow;
    e31: MaterialPlanningRow;
    e16: MaterialPlanningRow;
    e17: MaterialPlanningRow;
    e30: MaterialPlanningRow;
    e6: MaterialPlanningRow;
    e12: MaterialPlanningRow;
    e29: MaterialPlanningRow;
    e9: MaterialPlanningRow;
    e15: MaterialPlanningRow;
    e20: MaterialPlanningRow;
  }
  
  export interface MaterialPlanningRow {
    productName: number;
    salesOrder: number;
    previousWaitingQueue: number;
    safetyStock: number;
    stock: number;
    waitingQueue: number;
    workInProgress: number;
    productionOrder: number;
  }
