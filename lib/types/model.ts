export type BodyStyle = {
  type: string;
};

export type Engine = {
  name: string;
  fuelType: "petrol" | "diesel" | "hybrid" | "phev" | "electric";
  power?: number;
};

export type FacelifChanges = {
  releaseDate: string;
  addedEngines?: Engine[];
  removedEngines?: string[];
};

export type Model = {
  id: string;
  name: string;
  generation?: number;
  facelift?: boolean;
  releaseDate: string;
  endDate?: string;
  imagePath: string;
  bodyStyles?: BodyStyle[];
  engines?: Engine[];
  facelifts?: FacelifChanges[];
};
