import { ChangeEvent, useEffect } from "react";
import { RootState, useDispatch, useSelector } from "../redux/store";
import { initializeProductionProgramm } from "../businessLogic/productionProgramm";
import {
  setProductionProgramm,
  updateForecastProductionProgramm,
  updateProductionProgramm,
} from "../redux/slices/inputProductionProgramm";
import { ProductionProgramm } from "../types/productionPlanningTypes";

export const useProductionProgramm = () => {
  const dispatch = useDispatch();

  const { XML } = useSelector((state: RootState) => state.inputXML.list);

  const productionProgramm = useSelector(
    (state: RootState) => state.inputProductionProgramm.data
  );

  useEffect(() => {
    console.log("useeffect", productionProgramm);
    if (!productionProgramm && XML) {
      dispatch(setProductionProgramm(initializeProductionProgramm(XML)));
    }
  }, [dispatch, productionProgramm, XML]);

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parts = name.split(".");
    if (parts.length === 3) {
      const [part, category, key] = parts;
      if (part in { P1: true, P2: true, P3: true, directSell: true }) {
        dispatch(
          updateProductionProgramm({
            part: part as keyof ProductionProgramm,
            category,
            key,
            value: Number(value),
          })
        );
      }
    }
  };

  const handleDirectSellChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parts = name.split(".");
    console.log("parts", parts);
    if (parts.length === 4) {
      const [part, key] = parts;
      if (part === "directSell") {
        console.log("directSell", part, key, value);
        dispatch(
          updateProductionProgramm({
            part: part as keyof ProductionProgramm,
            category: "null",
            key,
            value: Number(value),
          })
        );
      }
    }
  };

  const handleForecastChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    bikeType: string,
    periodIndex: number,
    field: string
  ) => {
    const { value } = event.target;
    const type =
      bikeType === "P1"
        ? "P1"
        : bikeType === "P2"
        ? "P2"
        : bikeType === "P3"
        ? "P3"
        : "P1";

    dispatch(
      updateForecastProductionProgramm({
        ...productionProgramm!,
        [bikeType]: {
          ...productionProgramm![type],
          forecast: productionProgramm?.[type].forecast.map(
            (forecast: { salesOrder: any }, index: number) => {
              if (index === periodIndex) {
                return {
                  ...forecast,
                  salesOrder: {
                    ...forecast.salesOrder,
                    [field]: parseInt(value),
                  },
                };
              }
              return forecast;
            }
          ),
        },
      })
    );
  };

  return {
    productionProgramm,
    handleValueChange,
    handleForecastChange,
    handleDirectSellChange,
  };
};
