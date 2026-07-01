import Navbar from "../components/Navbar";
import { useAppStore } from "../store/useAppStore";

function Achievements() {
  const achievements = useAppStore((state) => state.achievements);

  const unlockedCount = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  const progress =
    achievements.length > 0
      ? Math.round((unlockedCount / achievements.length) * 100)
      : 0;

  return (
    <div className="app-shell">
      <Navbar />

      <div className="page-header">
        <div>
          <h1 className="page-title">Achievements</h1>

          <p className="page-subtitle">
            Unlock milestones and build your LifeXP legacy.
          </p>
        </div>
      </div>

      {/* Progress Card */}

      <div className="achievement-summary">
        <div>
          <h2 className="achievement-summary-title">
            {unlockedCount} / {achievements.length}
          </h2>

          <p className="muted-text">Achievements Unlocked</p>
        </div>

        <div className="achievement-progress">
          <div
            className="achievement-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="achievement-progress-text">{progress}% Complete</p>
      </div>

      {/* Achievement Grid */}

      <div className="achievement-grid">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`achievement-card ${
              achievement.unlocked
                ? "achievement-unlocked"
                : "achievement-locked"
            }`}
          >
            <div className="achievement-icon">
              {achievement.unlocked ? "🏆" : "🔒"}
            </div>

            <div className="achievement-content">
              <h2 className="achievement-title">{achievement.title}</h2>

              <p className="achievement-description">
                {achievement.description}
              </p>

              <span
                className={`achievement-badge ${
                  achievement.unlocked ? "badge-unlocked" : "badge-locked"
                }`}
              >
                {achievement.unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
