import { useState } from "react";
import "./App.css";
import { useAgentsData } from "./hooks/useAgentsData";
import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";

function App() {
  const { data, isLoading } = useAgentsData();
  const [selectedRoleId, setSelectedRoleId] = useState<string>();

  return (
    <div className="app">
      <LeftPanel
        data={data}
        selectedRoleId={selectedRoleId}
        onSelectRole={setSelectedRoleId}
      />
      <RightPanel
        data={data}
        isLoading={isLoading}
        selectedRoleId={selectedRoleId}
      />
    </div>
  );
}

export default App;
