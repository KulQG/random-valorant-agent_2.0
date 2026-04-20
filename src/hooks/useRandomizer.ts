import { useMemo, useState } from "react";
import type { Agent, ProcessedData } from "../types";

const SCROLL_DURATION = 3000;
const TARGET_ITEMS_COUNT = 40;

export const useRandomizer = (
  data?: ProcessedData,
  selectedRoleId?: string,
) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedAgents, setDisplayedAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = useMemo(() => {
    if (!data) return [];

    if (!selectedRoleId || selectedRoleId === "all") {
      return Array.from(data.agents.values()) as Agent[];
    }

    const agentIds = data.roles.get(selectedRoleId)?.agents;
    const agents: Agent[] = [];

    agentIds?.forEach((id) => {
      const agent = data.agents.get(id);
      if (agent) agents.push(agent);
    });

    return agents;
  }, [data, selectedRoleId]);

  const getRandomAgent = () =>
    filteredAgents[Math.floor(Math.random() * filteredAgents.length)];

  const startRandom = () => {
    if (filteredAgents.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setSelectedAgent(null);

    const finalAgent = getRandomAgent();
    setSelectedAgent(finalAgent)

    const fullCycles = Math.max(
      1,
      Math.ceil(TARGET_ITEMS_COUNT / filteredAgents.length),
    );
    const itemsCount = filteredAgents.length * fullCycles + 1;

    const agentSequence = Array.from({ length: itemsCount }, (_, idx) =>
      idx === itemsCount - 1 ? finalAgent : getRandomAgent(),
    );

    setDisplayedAgents(agentSequence);

    setTimeout(() => {
      setIsSpinning(false);
    }, SCROLL_DURATION + 50);
  };

  return {
    isSpinning,
    displayedAgents,
    selectedAgent,
    startRandom,
    filteredAgentsCount: filteredAgents.length,
  };
};
