import { useEffect } from "react";
import BalanceCard from "../components/BalanceCard";
import TaskCard from "../components/TaskCard";
import XPGraph from "../components/XPGraph";
import StreakCard from "../components/StreakCard";
import { useAppStore } from "../store/useAppStore";
import { Link } from "react-router-dom";

function Dashboard() {
  const tasks = useAppStore((state) => state.tasks);
  const checkDailyReset = useAppStore((state) => state.checkDailyReset);

  useEffect(() => {
    checkDailyReset();
  }, [checkDailyReset]);

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="app-title">LifeXP</h1>

        <nav className="nav-links">
          <Link to="/rewards" className="nav-btn purple">
            Rewards
          </Link>
          <Link to="/settings" className="nav-btn slate">
            Settings
          </Link>
          <Link to="/calendar" className="nav-btn blue">
            Calendar
          </Link>
          <Link to="/achievements" className="nav-btn yellow">
            Achievements
          </Link>
        </nav>
      </header>

      {/* Top Section */}
      <BalanceCard />
      <div className="xp-section">
        <StreakCard />
        <XPGraph />
      </div>

      {/* Tasks */}
      <section className="tasks-section">
        <h2 className="section-title">Daily Tasks</h2>

        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
