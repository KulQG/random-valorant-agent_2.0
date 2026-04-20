import { useEffect, useState } from "react";
import type { Agent, ProcessedData, ResponseAgents, Role } from "../types";

const STORE_AGENTS_KEY = "saved_agents_data";
const STORE_ROLES_DATA = "saved_roles_data";

const getSavedAgents = (): Agent[] => {
  try {
    const saved = localStorage.getItem(STORE_AGENTS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const getSavedRoles = (): Role[] => {
  try {
    const saved = localStorage.getItem(STORE_ROLES_DATA);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useAgentsData = () => {
  const [data, setData] = useState<ProcessedData>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const savedAgents = getSavedAgents();
    const savedRoles = getSavedRoles();

    if (savedAgents.length && savedRoles.length) {
      const newData: ProcessedData = {
        agents: new Map(),
        roles: new Map(),
      };
      for (const agent of savedAgents) {
        newData.agents.set(agent.id, agent);
      }
      for (const role of savedRoles) {
        newData.roles.set(role.id, role);
      }
      console.log('Loaded from localStorage:', savedAgents.length, 'agents');
      console.log('newData.agents size:', newData.agents.size);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(newData);
      return;
    }

    setLoading(true);
    fetch(
      "https://valorant-api.com/v1/agents?language=ru-RU&isPlayableCharacter=true",
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка при загрузке агентов");
        }
        return res.json() as Promise<ResponseAgents>;
      })
      .then((rawData) => {
        const newData: ProcessedData = {
          agents: new Map(),
          roles: new Map(),
        };

        const agentsArray: Agent[] = [];
        const rolesArray: Role[] = [];

        for (const agent of rawData.data) {
          console.log('Agent ID:', agent.uuid, 'Name:', agent.displayName);
          const agentData: Agent = {
            id: agent.uuid,
            name: agent.displayName,
            bg: agent.background,
            displayIcon: agent.displayIcon,
            portrait: agent.fullPortrait,
            roleId: agent.role.uuid,
          };
          newData.agents.set(agent.uuid, agentData);
          agentsArray.push(agentData);

          if (!newData.roles.has(agent.role.uuid)) {
            const roleData: Role = {
              id: agent.role.uuid,
              name: agent.role.displayName,
              icon: agent.role.displayIcon,
              agents: [agent.uuid],
            };
            newData.roles.set(agent.role.uuid, roleData);
            rolesArray.push(roleData);
          } else {
            newData.roles.get(agent.role.uuid)?.agents.push(agent.uuid);
          }
        }

        // Save to localStorage
        localStorage.setItem(STORE_AGENTS_KEY, JSON.stringify(agentsArray));
        localStorage.setItem(STORE_ROLES_DATA, JSON.stringify(rolesArray));

        console.log('Loaded from API:', agentsArray.length, 'agents');
        console.log('newData.agents size:', newData.agents.size);
        setData(newData);
      })
      .catch((e) => {
        console.error("Произошла ошибка: ", e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, isLoading };
};
