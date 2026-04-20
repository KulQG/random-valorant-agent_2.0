import styles from "./RoleSelector.module.css";
import type { ProcessedData } from "../types";

interface RoleSelectorProps {
  data?: ProcessedData;
  selectedRoleId?: string;
  onSelectRole: (roleId?: string) => void;
}

export const RoleSelector = ({
  data,
  selectedRoleId,
  onSelectRole,
}: RoleSelectorProps) => {
  if (!data) return null;

  const roles = Array.from(data.roles.values());

  return (
    <div className={styles.container}>
      <button
        className={`${styles.roleButton} ${!selectedRoleId || selectedRoleId === "all" ? styles.active : ""}`}
        onClick={() => onSelectRole()}
        title="Все агенты"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.icon}
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </button>

      {roles.map((role) => (
        <button
          key={role.id}
          className={`${styles.roleButton} ${selectedRoleId === role.id ? styles.active : ""}`}
          onClick={() => onSelectRole(role.id)}
          title={role.name}
        >
          <img src={role.icon} alt={role.name} className={styles.icon} />
        </button>
      ))}
    </div>
  );
};
