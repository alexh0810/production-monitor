export interface ProductionLine {
  id: string;
  name: string;
  targetWeight: number;
  tolerance: number;
}

export interface WeightData {
  time: string;
  weight: number;
}

export interface Alert {
  id: number;
  type: 'warning' | 'error';
  message: string;
  time: string;
}

export interface ProductionStatus {
  status: 'success' | 'warning' | 'error';
  message: string;
}
