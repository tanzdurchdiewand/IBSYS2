export type ProductionProgramm = {
    p1: ProductProduction,
    p2: ProductProduction,
    p3: ProductProduction
}

export type ProductProduction = {
    salesorder: Salesorder,
    forcast: ProductionForcast[]
}

export type Salesorder = {
    salesWish: number,
    productionWish: number
}

export type ProductionForcast = {
    period: number,
    salesorder: Salesorder
}

//Types for weekly planning of workstations
export type PlanningTimeslot = {
    id: number,
    productionOrder: number
}

export type PlanningWorkstation = {
    id: number,
    timeslots: PlanningTimeslot
}

//Constraints for Produktion Order