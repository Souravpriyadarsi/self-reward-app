import { useAppStore } from "../store/useAppStore";
import { Link } from "react-router-dom";

function Achievements() {
  const achievements = useAppStore((state) => state.achievements);

  const unlockedCount = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold mb-2">Achievements</h1>
        <Link to="/" className="bg-slate-700 px-4 py-2 rounded-lg">
          Dashboard
        </Link>{" "}
      </div>

      <p className="text-slate-400 mb-8">
        {unlockedCount} / {achievements.length} unlocked
      </p>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`rounded-xl p-5 border ${
              achievement.unlocked
                ? "bg-green-900 border-green-600"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {achievement.unlocked ? "🏆" : "🔒"}
              </span>

              <div>
                <h2 className="text-xl font-semibold">{achievement.title}</h2>

                <p className="text-slate-300">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
