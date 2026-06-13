import { useAppStore } from "../store/useAppStore";

function History() {
  const activity = useAppStore((state) => state.activity);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Activity History</h1>

      <div className="space-y-3">
        {activity.map((entry) => (
          <div key={entry.id} className="bg-slate-900 rounded-xl p-4">
            <h3>{entry.taskTitle}</h3>

            <p>+{entry.points} XP</p>

            <p className="text-slate-400">{entry.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
