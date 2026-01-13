export interface ServiceNode {
  id: string;
  name: string;
  icon: string;
  description: string;
  x: number;
  y: number;
  type: 'gateway' | 'service' | 'database' | 'queue' | 'external';
}

export interface Connection {
  from: string;
  to: string;
  label?: string;
}

export interface FlowStep {
  serviceId: string;
  action: string;
  data: Record<string, unknown>;
  duration: number;
}

export interface MicroserviceFlow {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
  connections: string[][];
}

export type ServiceStatus = 'idle' | 'processing' | 'success' | 'error';
