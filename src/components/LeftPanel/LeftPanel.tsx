import styles from "./LeftPanel.module.css";
import { RoleSelector } from "../RoleSelectror/RoleSelector";
import { AgentGrid } from "../AgentGrid/AgentGrid";
import type { ProcessedData } from "../../types";

interface LeftPanelProps {
  data?: ProcessedData;
  selectedRoleId?: string;
  onSelectRole: (roleId?: string) => void;
}

export const LeftPanel = ({
  data,
  selectedRoleId,
  onSelectRole,
}: LeftPanelProps) => {
  return (
    <div className={styles.container}>
      <RoleSelector
        data={data}
        selectedRoleId={selectedRoleId}
        onSelectRole={onSelectRole}
      />
      <AgentGrid data={data} selectedRoleId={selectedRoleId} />
    </div>
  );
};
