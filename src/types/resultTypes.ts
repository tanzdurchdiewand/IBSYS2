export type Sellwish = {
  item: SellWishItem[];
};

export type SellWishItem = {
  article: number;
  quantity: number;
};

export type Selldirect = {
  item: SellDirectItem[];
};

export type SellDirectItem = {
  article: number;
  quantity: number;
  price: number;
  penalty: number;
};

export type OrderList = {
  order: Order[];
};

export type Order = {
  article: number;
  quantity: number;
  modus: number;
};

export type ProductionList = {
  production: Production[];
};

export type Production = {
  id: number;
  article: number;
  quantity: number;
};

export type WorkingTimeList = {
  workingTime: WorkingTime[];
};

export type WorkingTime = {
  station: number;
  shift: number;
  overtime: number;
};
