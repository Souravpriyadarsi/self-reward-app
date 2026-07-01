import { useEffect } from "react";
import BalanceCard from "../components/BalanceCard";
import TaskCard from "../components/TaskCard";
import XPGraph from "../components/XPGraph";
import StreakCard from "../components/StreakCard";
import { useAppStore } from "../store/useAppStore";
import Navbar from "../components/Navbar";

function Dashboard() {
  const tasks = useAppStore((state) => state.tasks);

  const dailyTasks = tasks.filter((task) => task.type === "daily");

  const repeatableTasks = tasks.filter((task) => task.type === "repeatable");
  const checkDailyReset = useAppStore((state) => state.checkDailyReset);

  useEffect(() => {
    checkDailyReset();
  }, [checkDailyReset]);

  return (
    <div className="app-shell">
      <Navbar />

      {/* Top Section */}
      <BalanceCard />
      <div className="xp-section">
        <StreakCard />
        <XPGraph />
      </div>

      {/* Tasks */}
      {/* Daily Tasks */}

      <section className="tasks-section">
        <h2 className="section-title">📅 Daily Tasks</h2>

        <div className="task-list">
          {dailyTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>

      {/* Repeatable */}

      <section className="tasks-section">
        <h2 className="section-title">🔁 Repeatable Tasks</h2>

        <div className="task-list">
          {repeatableTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
