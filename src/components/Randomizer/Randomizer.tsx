import { useEffect, useState } from "react";
import styles from "./Randomizer.module.css";
import type { ProcessedData } from "../../types";
import { useRandomizer } from "../../hooks/useRandomizer";

interface RandomizerProps {
  data?: ProcessedData;
  selectedRoleId?: string;
}

export const Randomizer = ({ data, selectedRoleId }: RandomizerProps) => {
  const {
    isSpinning,
    displayedAgents,
    selectedAgent,
    startRandom,
    filteredAgentsCount,
  } = useRandomizer(data, selectedRoleId);

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (isSpinning && displayedAgents.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScrollOffset(0);
      console.log(">>> back to start");

      const timer = setTimeout(() => {
        const targetOffset = (displayedAgents.length - 1) * 100 - 5;
        setScrollOffset(targetOffset);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [displayedAgents, isSpinning]);

  return (
    <div className={styles.container}>
      {selectedAgent && !isSpinning && (
        <div
          className={styles.selectedAgent}
          style={{ background: `url(${selectedAgent.bg})` }}
        >
          <img
            src={selectedAgent.portrait}
            alt={selectedAgent.name}
            className={styles.portrait}
          />
        </div>
      )}

      <div className={styles.scrollContainer}>
        <div
          className={styles.scrollTrack}
          style={{
            transform: `translateY(-${scrollOffset}px)`,
            transition:
              scrollOffset > 0
                ? `transform 3000ms cubic-bezier(0.15, 0.85, 0.35, 1)`
                : "none",
          }}
        >
          {displayedAgents.map((agent, idx) => (
            <div key={`${idx}-${agent.id}`} className={styles.scrollItem}>
              <img
                src={agent.displayIcon}
                alt={agent.name}
                className={styles.agentIcon}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.randomButton} ${isSpinning ? styles.spinning : ""}`}
        onClick={startRandom}
        disabled={isSpinning || filteredAgentsCount === 0}
      >
        {isSpinning ? "Выбираю..." : "РАНДОМ"}
      </button>
    </div>
  );
};
