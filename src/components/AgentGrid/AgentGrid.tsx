import styles from "./AgentGrid.module.css";
import type { ProcessedData } from "../../types";

interface AgentGridProps {
  data?: ProcessedData;
  selectedRoleId?: string;
}

export const AgentGrid = ({ data, selectedRoleId }: AgentGridProps) => {
  if (!data) return null;

  let agents = Array.from(data.agents.values());
  console.log('AgentGrid - total agents:', agents.length);

  if (selectedRoleId && selectedRoleId !== "all") {
    agents = agents.filter((agent) => agent.roleId === selectedRoleId);
    console.log('AgentGrid - filtered agents:', agents.length);
  }

  return (
    <div className={styles.grid}>
      {agents.map((agent) => (
        <div key={agent.id} className={styles.agentItem}>
          <img
            src={agent.displayIcon}
            alt={agent.name}
            className={styles.icon}
          />
          <div className={styles.tooltip}>{agent.name}</div>
        </div>
      ))}
    </div>
  );
};
