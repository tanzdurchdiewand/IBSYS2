export enum OrderType {
  Normal,
  Fast,
}

export interface OrderPlanningRow {
  productName: number;
  deliveryTime: number;
  deviation: number;
  quantityP1: number;
  quantityP2: number;
  quantityP3: number;
  discountQuantity: number;
  warehouseStock: number;
  demandForPeriod: [number, number, number, number];
  orderQuantity: number;
  orderType: OrderType;
  pendingOrderPeriod: number;
  pendingOrderAmount: number;
  pendingOrderType: OrderType;
}

export interface MaterialOrderPlanning {
  [key: string]: OrderPlanningRow;
  k21: OrderPlanningRow;
  k22: OrderPlanningRow;
  k23: OrderPlanningRow;
  k24: OrderPlanningRow;
  k25: OrderPlanningRow;
  k27: OrderPlanningRow;
  k28: OrderPlanningRow;
  k32: OrderPlanningRow;
  k33: OrderPlanningRow;
  k34: OrderPlanningRow;
  k35: OrderPlanningRow;
  k36: OrderPlanningRow;
  k37: OrderPlanningRow;
  k38: OrderPlanningRow;
  k39: OrderPlanningRow;
  k40: OrderPlanningRow;
  k41: OrderPlanningRow;
  k42: OrderPlanningRow;
  k43: OrderPlanningRow;
  k44: OrderPlanningRow;
  k45: OrderPlanningRow;
  k46: OrderPlanningRow;
  k47: OrderPlanningRow;
  k48: OrderPlanningRow;
  k52: OrderPlanningRow;
  k53: OrderPlanningRow;
  k57: OrderPlanningRow;
  k58: OrderPlanningRow;
  k59: OrderPlanningRow;
}

export type ProductionProgramm = {
  P1: ProductProduction;
  P2: ProductProduction;
  P3: ProductProduction;
  directSell: DirectSell;
};

export type ProductProduction = {
  salesOrder: SalesOrder;
  forecast: ProductionForecast[];
};

export type SalesOrder = {
  salesWish: number;
  productionWish: number;
};

export type ProductionForecast = {
  period: number;
  salesOrder: SalesOrder;
};

export type DirectSell = {
  P1: DirectSellRow;
  P2: DirectSellRow;
  P3: DirectSellRow;
};

export type DirectSellRow = {
  amount: number;
  price: number;
  penalty: number;
};

export type Order = {
  orderperiod: number;
  id: number;
  mode: number;
  article?: number;
  amount?: number;
  time?: number;
  materialcosts?: number;
  ordercosts?: number;
  entirecosts?: number;
  piececosts?: number;
};

interface Product {
  productName: number;
  UsedInP1: number;
  UsedInP2: number;
  UsedInP3: number;
  Warenbestand: number;
  BedarfWoche1: number;
  BedarfWoche2: number;
  BedarfWoche3: number;
  Lieferzeit: number;
  Abweichung: number;
  RabattMenge: number;
  Bestellart: string;
  Bestellmenge: number;
  BestandNachLieferung2: number;
  BestandNachLieferung3: number;
  BestandNachLieferung4: number;
  BestandNachLieferung5: number;
}

export const optimalOrderCapacity = (
  materialOrderPlanning: MaterialOrderPlanning,
  produktprogramm: ProductionProgramm,
  ausstehendeBestellungen: Order[],
  currentPeriod: number
): Product[] => {
  let produkte: Product[] = Object.keys(materialOrderPlanning).map((key) => ({
    productName: materialOrderPlanning[key].productName,
    UsedInP1: materialOrderPlanning[key].quantityP1,
    UsedInP2: materialOrderPlanning[key].quantityP2,
    UsedInP3: materialOrderPlanning[key].quantityP3,
    Warenbestand: materialOrderPlanning[key].warehouseStock,
    BedarfWoche1: 0,
    BedarfWoche2: 0,
    BedarfWoche3: 0,
    Lieferzeit: materialOrderPlanning[key].deliveryTime,
    Abweichung: materialOrderPlanning[key].deviation,
    RabattMenge: materialOrderPlanning[key].discountQuantity,
    Bestellart: "",
    Bestellmenge: 0,
    BestandNachLieferung2: 0,
    BestandNachLieferung3: 0,
    BestandNachLieferung4: 0,
    BestandNachLieferung5: 0,
  }));

  produkte.forEach((produkt, i) => {
    produkt.BedarfWoche1 =
      produkt.UsedInP1 *
        produktprogramm.P1.forecast[0].salesOrder.productionWish +
      produkt.UsedInP2 *
        produktprogramm.P2.forecast[0].salesOrder.productionWish +
      produkt.UsedInP3 *
        produktprogramm.P3.forecast[0].salesOrder.productionWish;

    produkt.BedarfWoche2 =
      produkt.UsedInP1 *
        produktprogramm.P1.forecast[1].salesOrder.productionWish +
      produkt.UsedInP2 *
        produktprogramm.P2.forecast[1].salesOrder.productionWish +
      produkt.UsedInP3 *
        produktprogramm.P3.forecast[1].salesOrder.productionWish;

    produkt.BedarfWoche3 =
      produkt.UsedInP1 *
        produktprogramm.P1.forecast[2].salesOrder.productionWish +
      produkt.UsedInP2 *
        produktprogramm.P2.forecast[2].salesOrder.productionWish +
      produkt.UsedInP3 *
        produktprogramm.P3.forecast[2].salesOrder.productionWish;

    let ZeitpunktLeer = 0;

    if (
      produkt.Warenbestand -
        (produkt.BedarfWoche1 + produkt.BedarfWoche2 + produkt.BedarfWoche3) <=
      0
    ) {
      ZeitpunktLeer = 4;
    }
    if (
      produkt.Warenbestand -
        (produkt.BedarfWoche1 + produkt.BedarfWoche2 + produkt.BedarfWoche3) <=
      0
    ) {
      ZeitpunktLeer = 3;
    }
    if (
      produkt.Warenbestand - (produkt.BedarfWoche1 + produkt.BedarfWoche2) <=
      0
    ) {
      ZeitpunktLeer = 2;
    }
    if (produkt.Warenbestand - produkt.BedarfWoche1 <= 0) {
      ZeitpunktLeer = 1;
    }

    if (
      ZeitpunktLeer - (produkt.Lieferzeit + produkt.Abweichung + 1) >= 0 ||
      ZeitpunktLeer === 0
    ) {
      produkt.Bestellart = "No order";
      produkt.Bestellmenge = 0;
    } else {
      if (ZeitpunktLeer - (produkt.Lieferzeit + produkt.Abweichung) < 0) {
        produkt.Bestellart = "Express order";

        if (produkt.RabattMenge - produkt.BedarfWoche1 <= 0) {
          let faktor: number;
          faktor =
            Math.ceil(produkt.BedarfWoche1 / produkt.RabattMenge) < 2
              ? 2
              : Math.ceil(produkt.BedarfWoche1 / produkt.RabattMenge);
          produkt.Bestellmenge = produkt.RabattMenge * faktor;
        } else if (
          produkt.RabattMenge - (produkt.BedarfWoche1 + produkt.BedarfWoche2) <=
            0 &&
          produkt.Lieferzeit >= 2
        ) {
          let faktor: number;
          faktor =
            Math.ceil(
              (produkt.BedarfWoche1 + produkt.BedarfWoche2) /
                produkt.RabattMenge
            ) < 2
              ? 2
              : Math.ceil(
                  (produkt.BedarfWoche1 + produkt.BedarfWoche2) /
                    produkt.RabattMenge
                );
          produkt.Bestellmenge = produkt.RabattMenge * faktor;
        } else if (
          produkt.RabattMenge -
            (produkt.BedarfWoche1 +
              produkt.BedarfWoche2 +
              produkt.BedarfWoche3) <=
            0 &&
          produkt.Lieferzeit >= 3
        ) {
          let faktor: number;
          faktor =
            Math.ceil(
              (produkt.BedarfWoche1 +
                produkt.BedarfWoche2 +
                produkt.BedarfWoche3) /
                produkt.RabattMenge
            ) < 2
              ? 2
              : Math.ceil(
                  (produkt.BedarfWoche1 +
                    produkt.BedarfWoche2 +
                    produkt.BedarfWoche3) /
                    produkt.RabattMenge
                );
          produkt.Bestellmenge = produkt.RabattMenge * faktor;
        } else if (
          produkt.RabattMenge -
            (produkt.BedarfWoche1 +
              produkt.BedarfWoche2 +
              produkt.BedarfWoche3) <=
            0 &&
          produkt.Lieferzeit >= 3
        ) {
          let faktor: number;
          faktor =
            Math.ceil(
              (produkt.BedarfWoche1 +
                produkt.BedarfWoche2 +
                produkt.BedarfWoche3) /
                produkt.RabattMenge
            ) < 2
              ? 2
              : Math.ceil(
                  (produkt.BedarfWoche1 +
                    produkt.BedarfWoche2 +
                    produkt.BedarfWoche3) /
                    produkt.RabattMenge
                );
          produkt.Bestellmenge = produkt.RabattMenge * faktor;
        } else {
          produkt.Bestellmenge = produkt.RabattMenge;
        }
      } else {
        produkt.Bestellart = "Standard order";
        produkt.Bestellmenge = produkt.RabattMenge;
      }
    }

    ausstehendeBestellungen.forEach((order) => {
      if (produkt.productName === order.article) {
        produkt.Bestellart = "No order";
        produkt.Bestellmenge = 0;
      }
    });

    function BestandNachLieferung(
      Bestellart: string,
      Bestellmenge: number,
      Lieferzeit: number,
      Abweichung: number,
      Woche: number
    ): number {
      if (
        Bestellart === "Express order" &&
        Lieferzeit / 2 <= Woche &&
        Lieferzeit / 2 >= Woche - 1
      ) {
        return Bestellmenge;
      } else if (
        Bestellart === "Standard order" &&
        Lieferzeit + Abweichung <= Woche &&
        Lieferzeit + Abweichung >= Woche - 1
      ) {
        return Bestellmenge;
      } else {
        return 0;
      }
    }

    function BestellungVorherigePeriode(Woche: number): number {
      for (let j = 0; j < ausstehendeBestellungen.length; j++) {
        if (produkte[i].productName === ausstehendeBestellungen[j].article) {
          if (currentPeriod - ausstehendeBestellungen[j].orderperiod >= 4) {
            if (
              ausstehendeBestellungen[j].mode === 4 &&
              produkte[i].Lieferzeit / 2 - 4 <= Woche &&
              produkte[i].Lieferzeit / 2 - 4 > Woche - 1
            ) {
              return ausstehendeBestellungen[j].amount ?? 0;
            } else if (
              ausstehendeBestellungen[j].mode === 5 &&
              produkte[i].Lieferzeit + produkte[i].Abweichung - 4 <= Woche &&
              produkte[i].Lieferzeit + produkte[i].Abweichung - 4 > Woche - 1
            ) {
              return ausstehendeBestellungen[j].amount ?? 0;
            } else {
              return 0;
            }
          } else if (
            currentPeriod - ausstehendeBestellungen[j].orderperiod >=
            3
          ) {
            if (
              ausstehendeBestellungen[j].mode === 4 &&
              produkte[i].Lieferzeit / 2 - 3 <= Woche &&
              produkte[i].Lieferzeit / 2 - 3 > Woche - 1
            ) {
              return ausstehendeBestellungen[j].amount ?? 0;
            } else if (
              ausstehendeBestellungen[j].mode === 5 &&
              produkte[i].Lieferzeit + produkte[i].Abweichung - 3 <= Woche &&
              produkte[i].Lieferzeit + produkte[i].Abweichung - 3 > Woche - 1
            ) {
              return ausstehendeBestellungen[j].amount ?? 0;
            } else {
              return 0;
            }
          } else if (
            currentPeriod - ausstehendeBestellungen[j].orderperiod >=
            2
          ) {
            if (
              ausstehendeBestellungen[j].mode === 4 &&
              produkte[i].Lieferzeit / 2 - 2 <= Woche &&
              produkte[i].Lieferzeit / 2 - 2 > Woche - 1
            ) {
              return ausstehendeBestellungen[j].amount ?? 0;
            } else if (
              ausstehendeBestellungen[j].mode === 5 &&
              produkte[i].Lieferzeit + produkte[i].Abweichung - 2 <= Woche &&
              produkte[i].Lieferzeit + produkte[i].Abweichung - 2 > Woche - 1
            ) {
              return ausstehendeBestellungen[j].amount ?? 0;
            } else {
              return 0;
            }
          } else if (
            currentPeriod - ausstehendeBestellungen[j].orderperiod >=
            1
          ) {
            if (
              ausstehendeBestellungen[j].mode === 4 &&
              produkte[i].Lieferzeit / 2 - 1 <= Woche &&
              produkte[i].Lieferzeit / 2 - 1 > Woche - 1
            ) {
              return ausstehendeBestellungen[j].amount ?? 0;
            } else if (
              ausstehendeBestellungen[j].mode === 5 &&
              produkte[i].Lieferzeit + produkte[i].Abweichung - 1 <= Woche &&
              produkte[i].Lieferzeit + produkte[i].Abweichung - 1 > Woche - 1
            ) {
              return ausstehendeBestellungen[j].amount ?? 0;
            } else {
              return 0;
            }
          }
        }
      }
      return 0;
    }

    produkt.BestandNachLieferung2 =
      produkt.Warenbestand -
        produkt.BedarfWoche1 +
        BestellungVorherigePeriode(1) +
        BestandNachLieferung(
          produkt.Bestellart,
          produkt.Bestellmenge,
          produkt.Lieferzeit,
          produkt.Abweichung,
          1
        ) <
      0
        ? 0
        : produkt.Warenbestand -
          produkt.BedarfWoche1 +
          BestellungVorherigePeriode(1) +
          BestandNachLieferung(
            produkt.Bestellart,
            produkt.Bestellmenge,
            produkt.Lieferzeit,
            produkt.Abweichung,
            1
          );

    produkt.BestandNachLieferung3 =
      produkt.BestandNachLieferung2 -
        produkt.BedarfWoche2 +
        BestellungVorherigePeriode(2) +
        BestandNachLieferung(
          produkt.Bestellart,
          produkt.Bestellmenge,
          produkt.Lieferzeit,
          produkt.Abweichung,
          2
        ) <
      0
        ? 0
        : produkt.BestandNachLieferung2 -
          produkt.BedarfWoche2 +
          BestellungVorherigePeriode(2) +
          BestandNachLieferung(
            produkt.Bestellart,
            produkt.Bestellmenge,
            produkt.Lieferzeit,
            produkt.Abweichung,
            2
          );

    produkt.BestandNachLieferung4 =
      produkt.BestandNachLieferung3 -
        produkt.BedarfWoche3 +
        BestellungVorherigePeriode(3) +
        BestandNachLieferung(
          produkt.Bestellart,
          produkt.Bestellmenge,
          produkt.Lieferzeit,
          produkt.Abweichung,
          3
        ) <
      0
        ? 0
        : produkt.BestandNachLieferung3 -
          produkt.BedarfWoche3 +
          BestellungVorherigePeriode(3) +
          BestandNachLieferung(
            produkt.Bestellart,
            produkt.Bestellmenge,
            produkt.Lieferzeit,
            produkt.Abweichung,
            3
          );
    console.log(produkt);
  });

  console.log(produkte);
  return produkte;
};
