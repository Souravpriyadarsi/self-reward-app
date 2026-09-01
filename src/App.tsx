import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { useThemeStore } from "./store/useThemeStore";

import Dashboard from "./pages/Dashboard";
import Rewards from "./pages/Rewards";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Achievements from "./pages/Achievements";

import ToastContainer from "./components/ToastContainer";

import "./App.css";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <MantineProvider forceColorScheme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
