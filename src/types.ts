export interface ResponseAgents {
  status: number;
  data: {
    uuid: string;
    displayName: string;
    displayIcon: string;
    fullPortrait: string;
    background: string;
    role: { uuid: string; displayName: string; displayIcon: string };
  }[];
}

export interface ProcessedData {
  agents: Map<Agent['id'], Agent>;
  roles: Map<Role['id'], Role>;
}

export interface Agent {
  id: string;
  name: string;
  displayIcon: string;
  portrait: string;
  roleId: string;
  bg: string;
}

export interface Role {
  id: string;
  name: string;
  icon: string;
  agents: string[];
}
