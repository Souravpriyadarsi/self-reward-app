import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAppStore } from "../store/useAppStore";

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

  // Move to previous Sunday
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
    if (points === 0) return "heat-0";
    if (points < 25) return "heat-1";
    if (points < 50) return "heat-2";
    if (points < 100) return "heat-3";

    return "heat-4";
  };

  return (
    <div className="app-shell">
      <Navbar />

      <div className="page-header">
        <div>
          <h1 className="page-title">Activity Heatmap</h1>

          <p className="page-subtitle">
            Your LifeXP journey over the last 365 days.
          </p>
        </div>
      </div>

      <div className="calendar-panel">
        <h2 className="section-title">Activity</h2>

        <p className="muted-text" style={{ marginBottom: "24px" }}>
          Last 365 Days
        </p>

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
                          heat-cell
                          ${getColor(points)}
                          ${isToday ? "today-cell" : ""}
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

          <div className="legend-box heat-0" />
          <div className="legend-box heat-1" />
          <div className="legend-box heat-2" />
          <div className="legend-box heat-3" />
          <div className="legend-box heat-4" />

          <span>More</span>
        </div>
      </div>

      {/* Tooltip */}

      {hovered && (
        <div
          className="calendar-tooltip"
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
