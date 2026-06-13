import { useEffect } from "react";
import BalanceCard from "../components/BalanceCard";
import TaskCard from "../components/TaskCard";
import { useAppStore } from "../store/useAppStore";
import { Link } from "react-router-dom";

function Dashboard() {
  const tasks = useAppStore((state) => state.tasks);
  const currentStreak = useAppStore((state) => state.currentStreak);
  const bestStreak = useAppStore((state) => state.bestStreak);
  const checkDailyReset = useAppStore((state) => state.checkDailyReset);

  useEffect(() => {
    checkDailyReset();
  }, [checkDailyReset]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold">LifeXP</h1>

        <div className="flex gap-2">
          <Link to="/rewards" className="bg-purple-600 px-4 py-2 rounded-lg">
            Rewards
          </Link>
          <Link to="/settings" className="bg-slate-700 px-4 py-2 rounded-lg">
            Settings
          </Link>
          <Link to="/calendar" className="bg-blue-600 px-4 py-2 rounded-lg">
            Calendar
          </Link>
          <Link
            to="/achievements"
            className="bg-yellow-600 px-4 py-2 rounded-lg"
          >
            Achievements
          </Link>
        </div>
      </div>

      <BalanceCard />

      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold">
          🔥 {currentStreak} Day Streak
        </h2>

        <p className="text-slate-400">Best Streak: {bestStreak}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Daily Tasks</h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
