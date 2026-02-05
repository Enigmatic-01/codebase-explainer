
import * as d3 from 'd3';

export type Role = 'user' | 'model';

export interface Message {
  msg_id: string;
  role: Role;
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  url: string;
  branch: string;
  messages: Message[];
  structure?: RepoNode;
}

export interface RepoNode {
   name: string;
  type: 'directory' | 'file';
  children?: RepoNode[];
}

// Fixed: Added d3 import above to satisfy the namespace requirement
export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'directory' | 'file';

}

// Fixed: Added d3 import above to satisfy the namespace requirement
export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string;
  target: string;
}

