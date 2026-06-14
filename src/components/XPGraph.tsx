import { useAppStore } from "../store/useAppStore";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="xp-tooltip">
      <p className="xp-tooltip-label">{label}</p>
      <p className="xp-tooltip-value">{payload[0].value} XP</p>
    </div>
  );
};

function XPGraph() {
  const activity = useAppStore((state) => state.activity);

  const data = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dateString = date.toLocaleDateString("sv-SE");

    const points = activity
      .filter((entry) => entry.date === dateString)
      .reduce((sum, entry) => sum + entry.points, 0);

    data.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      xp: points,
    });
  }

  return (
    <div className="xp-graph-card">
      <h2 className="xp-title">XP Activity</h2>

      <div className="xp-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="day" />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="xp"
              stroke="#a855f7"
              strokeWidth={3}
              fill="url(#xpGradient)"
              fillOpacity={1}
              activeDot={{
                r: 6,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />

            {/* gradient definition */}
            <defs>
              <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default XPGraph;
