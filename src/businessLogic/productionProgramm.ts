import { GameData } from "../types/inputXMLTypes";
import { ProductionProgramm, SalesOrder } from "../types/productionPlanningTypes";

export function initializeProductionProgramm(XML: GameData): ProductionProgramm {

    const ChildrenSalesOrder: SalesOrder = {
        salesWish: XML?.results.forecast.p1 ?? 0,
        productionWish: XML?.results.forecast.p1 ?? 0,
    };

    const WommenSalesOrder: SalesOrder = {
        salesWish: XML?.results.forecast.p2 ?? 0,
        productionWish: XML?.results.forecast.p2 ?? 0,
    };

    const ManSalesOrder: SalesOrder = {
        salesWish: XML?.results.forecast.p3 ?? 0,
        productionWish: XML?.results.forecast.p3 ?? 0,
    };

    const period = XML?.results.period ?? 0;

    const initialProductionProgramm: ProductionProgramm = {
        P1: {
            salesOrder: ChildrenSalesOrder,
            forecast: returnEmptyForcast(period).forecast,
        },
        P2: {
            salesOrder: WommenSalesOrder,
            forecast: returnEmptyForcast(period).forecast,
        },
        P3: {
            salesOrder: ManSalesOrder,
            forecast: returnEmptyForcast(period).forecast,
        },
        directSell: {
            P1: {
                amount: 0,
                price: 0,
                penalty: 0,
            },
            P2: {
                amount: 0,
                price: 0,
                penalty: 0,
            },
            P3: {
                amount: 0,
                price: 0,
                penalty: 0,
            },
        },
    };

    return initialProductionProgramm;
}


function returnEmptyForcast(period: number) {
    return {
        forecast: [
            { period: period + 1, salesOrder: { salesWish: 0, productionWish: 0 } },
            { period: period + 2, salesOrder: { salesWish: 0, productionWish: 0 } },
            { period: period + 3, salesOrder: { salesWish: 0, productionWish: 0 } },
        ]
    }
}