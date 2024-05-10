export type Sellwish = {
  sellWishItems: SellWishItem[];
};

export type SellWishItem = {
  article: Number;
  quantity: Number;
};

export type Selldirect = {
  sellDirectItems: SellDirectItem[];
};

export type SellDirectItem = {
  article: Number;
  quantity: Number;
  price: Number;
};

export type OrderList = {
  orders: Order[];
};

export type Order = {
  article: Number;
  quantity: Number;
  modus: Number;
};

export type ProductionList = {
  productions: Production[];
};

export type Production = {
  article: Number;
  quantity: Number;
};

export type WorkingTimeList = {
  worrkingTimes: WorkingTime[];
};

export type WorkingTime = {
  station: Number;
  shift: Number;
  overtime: Number;
};
