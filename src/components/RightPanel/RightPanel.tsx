import styles from "./RightPanel.module.css";
import { Randomizer } from "../Randomizer/Randomizer";
import type { ProcessedData } from "../../types";

interface RightPanelProps {
  data?: ProcessedData;
  selectedRoleId?: string;
  isLoading: boolean;
}

export const RightPanel = ({ data, isLoading, selectedRoleId }: RightPanelProps) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загружаю агентов...</p>
        </div>
      ) : (
        <Randomizer data={data} selectedRoleId={selectedRoleId} />
      )}
    </div>
  );
};
