import React, { useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AgentsPage from "./pages/agents/AgentsPage";
import AgentChatPage from "./pages/agents/AgentChatPage";
import MarineMapPage from "./pages/marine/MarineMapPage";
import OceanIntelligencePage from "./pages/marine/OceanIntelligencePage";
import PFZPage from "./pages/marine/PFZPage";
import AlertsPage from "./pages/operations/AlertsPage";
import RoutesPage from "./pages/operations/RoutesPage";
import GeofencePage from "./pages/operations/GeofencePage";
import ReportsPage from "./pages/reports/ReportsPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [activeAgent, setActiveAgent] = useState(null);

  const navigate = (page) => setCurrentPage(page);

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage navigate={navigate} />;
      case "agents":
        return (
          <AgentsPage
            openAgent={(agent) => {
              setActiveAgent(agent);
              navigate("agent-chat");
            }}
          />
        );
      case "agent-chat":
        return activeAgent ? (
          <AgentChatPage
            agent={activeAgent}
            back={() => navigate("agents")}
          />
        ) : (
          <AgentsPage
            openAgent={(agent) => {
              setActiveAgent(agent);
              navigate("agent-chat");
            }}
          />
        );
      case "map":
        return <MarineMapPage />;
      case "alerts":
        return <AlertsPage navigate={navigate} />;
      case "ocean":
        return <OceanIntelligencePage />;
      case "pfz":
        return <PFZPage navigate={navigate} />;
      case "routes":
        return <RoutesPage navigate={navigate} />;
      case "geofence":
        return <GeofencePage />;
      case "reports":
        return <ReportsPage />;
      default:
        return (
          <div className="p-8 text-center mt-20">
            <h2 className="text-3xl font-bold text-[#0a1b35] mb-2">
              Page Under Construction
            </h2>
            <p className="text-gray-500">You selected: {currentPage}</p>
          </div>
        );
    }
  };

  return (
    <AppLayout
      currentPage={currentPage}
      navigate={navigate}
      onLogout={() => setIsAuthenticated(false)}
    >
      {renderView()}
    </AppLayout>
  );
}