import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { useState } from "react";

function Calendar() {
  const activity = useAppStore((state) => state.activity);

  const [hovered, setHovered] = useState<{
    date: string;
    points: number;
    x: number;
    y: number;
  } | null>(null);

  const activityMap = activity.reduce(
    (acc, entry) => {
      acc[entry.date] = (acc[entry.date] || 0) + entry.points;
      return acc;
    },
    {} as Record<string, number>,
  );

  const days: string[] = [];

  const endDate = new Date();

  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 364);

  // move start date to previous Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const current = new Date(startDate);

  while (current <= endDate) {
    days.push(current.toLocaleDateString("sv-SE"));

    current.setDate(current.getDate() + 1);
  }

  const today = new Date().toLocaleDateString("sv-SE");

  const monthLabels: {
    label: string;
    weekIndex: number;
  }[] = [];

  days.forEach((dateString, index) => {
    const date = new Date(dateString);

    if (date.getDate() === 1) {
      monthLabels.push({
        label: date.toLocaleString("default", {
          month: "short",
        }),
        weekIndex: Math.floor(index / 7),
      });
    }
  });

  const getColor = (points: number) => {
    if (points === 0) return "bg-slate-800";
    if (points < 25) return "bg-green-900";
    if (points < 50) return "bg-green-700";
    if (points < 100) return "bg-green-500";

    return "bg-green-300";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">Activity Heatmap</h1>

        <Link
          to="/"
          className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition"
        >
          Dashboard
        </Link>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
        <h2 className="text-2xl font-semibold mb-2">Activity</h2>

        <p className="text-slate-400 mb-8">Last 365 Days</p>

        {/* Month Labels */}
        <div
          className="relative h-6 mb-3 ml-8"
          style={{
            width: "1060px",
          }}
        >
          {monthLabels.map((month) => (
            <div
              key={`${month.label}-${month.weekIndex}`}
              className="absolute text-xs text-slate-500"
              style={{
                left: `${month.weekIndex * 20}px`,
              }}
            >
              {month.label}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {/* Weekday Labels */}
          <div className="flex flex-col gap-1 text-xs text-slate-500">
            <div className="w-6 h-4 flex items-center">Sun</div>
            <div className="w-6 h-4 flex items-center">Mon</div>
            <div className="w-6 h-4 flex items-center">Tue</div>
            <div className="w-6 h-4 flex items-center">Wed</div>
            <div className="w-6 h-4 flex items-center">Thu</div>
            <div className="w-6 h-4 flex items-center">Fri</div>
            <div className="w-6 h-4 flex items-center">Sat</div>
          </div>

          {/* Heatmap */}
          <div className="overflow-visible">
            <div className="inline-flex gap-1">
              {Array.from({ length: 53 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const dateIndex = weekIndex * 7 + dayIndex;

                    if (dateIndex >= days.length) {
                      return <div key={dayIndex} className="w-4 h-4" />;
                    }

                    const date = days[dateIndex];
                    const points = activityMap[date] || 0;

                    const isToday = date === today;

                    return (
                      <div
                        key={date}
                        onMouseEnter={(e) =>
                          setHovered({
                            date,
                            points,
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onMouseLeave={() => setHovered(null)}
                        className={`
                          w-4 h-4
                          rounded-[3px]
                          transition-all duration-150
                          cursor-pointer
                          hover:scale-110
                          ${getColor(points)}
                          ${isToday ? "ring-1 ring-slate-300" : ""}
                        `}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-8 text-xs text-slate-500">
          <span>Less</span>

          <div className="w-3 h-3 rounded-sm bg-slate-800" />
          <div className="w-3 h-3 rounded-sm bg-green-900" />
          <div className="w-3 h-3 rounded-sm bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <div className="w-3 h-3 rounded-sm bg-green-300" />

          <span>More</span>
        </div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div
          className="fixed z-50 bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg text-sm shadow-xl pointer-events-none"
          style={{
            left: hovered.x + 12,
            top: hovered.y - 10,
          }}
        >
          <div className="font-medium">{hovered.points} XP</div>

          <div className="text-slate-400 text-xs">{hovered.date}</div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
