import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { Link } from "react-router-dom";

function Calendar() {
  const activity = useAppStore((state) => state.activity);
  const currentStreak = useAppStore((state) => state.currentStreak);
  const bestStreak = useAppStore((state) => state.bestStreak);

  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const activityMap = activity.reduce(
    (acc, entry) => {
      acc[entry.date] = (acc[entry.date] || 0) + entry.points;
      return acc;
    },
    {} as Record<string, number>,
  );

  const currentMonthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;

  const monthlyActivities = activity.filter((entry) =>
    entry.date.startsWith(currentMonthPrefix),
  );

  const monthlyXP = monthlyActivities.reduce(
    (sum, entry) => sum + entry.points,
    0,
  );

  const monthlyTasks = monthlyActivities.length;

  const days = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const getIntensity = (points: number) => {
    if (points === 0) return "bg-slate-800";

    if (points < 25) return "bg-green-900";

    if (points < 50) return "bg-green-700";

    if (points < 100) return "bg-green-500";

    return "bg-green-300 text-black";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold mb-8">Activity Calendar</h1>
        <Link to="/" className="bg-slate-700 px-4 py-2 rounded-lg">
          Dashboard
        </Link>{" "}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="text-lg">🔥 Current Streak</h3>
          <p className="text-2xl font-bold">{currentStreak}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="text-lg">🏆 Best Streak</h3>
          <p className="text-2xl font-bold">{bestStreak}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="text-lg">📈 XP This Month</h3>
          <p className="text-2xl font-bold">{monthlyXP}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="text-lg">✅ Tasks Completed</h3>
          <p className="text-2xl font-bold">{monthlyTasks}</p>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700"
        >
          ← Previous
        </button>

        <h2 className="text-xl text-slate-400">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700"
        >
          Next →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="aspect-square" />;
          }

          const dateString = `${year}-${String(month + 1).padStart(
            2,
            "0",
          )}-${String(day).padStart(2, "0")}`;

          const points = activityMap[dateString] || 0;

          const isToday = dateString === new Date().toISOString().split("T")[0];

          return (
            <div
              key={dateString}
              title={`${dateString} • ${points} XP`}
              className={`aspect-square rounded-lg p-2 flex flex-col justify-between border transition ${
                isToday ? "border-yellow-400" : "border-transparent"
              } ${getIntensity(points)}`}
            >
              <span className="text-sm">{day}</span>

              {points > 0 && <span className="text-xs">{points} XP</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
