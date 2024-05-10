import {
  OrderList,
  ProductionList,
  Selldirect,
  Sellwish,
  WorkingTimeList,
} from "../types/resultTypes";

export function initializeSellWishResult(): Sellwish {
  return mockSellwish;
}

export function initializeSellDirectResult(): Selldirect {
  return mockSelldirect;
}

export function initializeOrderListResult(): OrderList {
  return mockOrderList;
}

export function initializeProductionListResult(): ProductionList {
  return mockProductionList;
}

export function initializeWorkingTimeListResult(): WorkingTimeList {
  return mockWorkingTimeList;
}

// Mock data for Sellwish
const mockSellwish: Sellwish = {
  sellWishItems: [
    { article: 1, quantity: 100 },
    { article: 2, quantity: 150 },
    { article: 3, quantity: 200 },
  ],
};

// Mock data for Selldirect
const mockSelldirect: Selldirect = {
  sellDirectItems: [
    { article: 1, quantity: 50, price: 120.0 },
    { article: 2, quantity: 60, price: 150.0 },
    { article: 3, quantity: 70, price: 200.0 },
  ],
};

// Mock data for OrderList
const mockOrderList: OrderList = {
  orders: [
    { article: 1, quantity: 30, modus: 1 },
    { article: 2, quantity: 40, modus: 1 },
    { article: 3, quantity: 50, modus: 1 },
  ],
};

// Mock data for WorkingTimeList
const mockWorkingTimeList: WorkingTimeList = {
  worrkingTimes: [
    { station: 1, shift: 1, overtime: 2 },
    { station: 2, shift: 2, overtime: 1 },
    { station: 3, shift: 1, overtime: 3 },
  ],
};

// Mock data for ProductionList
const mockProductionList: ProductionList = {
  productions: [
    { article: 1, quantity: 1000 },
    { article: 2, quantity: 1200 },
    { article: 3, quantity: 1400 },
  ],
};
