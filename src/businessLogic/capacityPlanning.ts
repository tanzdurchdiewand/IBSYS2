import {
  CapacityPlanningTable,
  SummaryTable,
} from "../types/capacityPlanningTypes";

export const generateCapacityPlanningRows = (): CapacityPlanningTable => [
  {
    designation: "Hinterad",
    modelType: "K",
    id: "E4",
    orderQuantity: 150,
    workstationResults: new Array(15).fill(150),
  },
  {
    designation: "Vorderrad",
    modelType: "D",
    id: "E5",
    orderQuantity: 100,
    workstationResults: new Array(15).fill(100),
  },
  // Additional rows can be added similarly
];

export const generateSummaryRows = (): SummaryTable => {
  const data = [
    {
      label: "Kapazitätsbedarf",
      values: new Array(15)
        .fill(0)
        .map(() => Math.floor(Math.random() * 2000 + 1000)),
      editable: false,
    },
    {
      label: "Rüstzeit",
      values: new Array(15)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100 + 50)),
      editable: false,
    },
    {
      label: "Gesamt-Kapazitätsbedarf",
      values: new Array(15)
        .fill(0)
        .map(() => Math.floor(Math.random() * 3000 + 1500)),
      editable: false,
    },
    {
      label: "Schichten und Überstunden",
      values: new Array(15)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10 - 5)),
      editable: true,
    },
    {
      label: "Schichten und Überstunden pro Tag",
      values: new Array(15).fill(0).map(() => Math.floor(Math.random() * 3)),
      editable: true,
    },
  ];
  return data;
};
