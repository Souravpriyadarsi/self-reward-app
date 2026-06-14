import { useAppStore } from "../store/useAppStore";

function StreakCard() {
  const currentStreak = useAppStore((state) => state.currentStreak);
  const bestStreak = useAppStore((state) => state.bestStreak);

  return (
    <div className="streak-card">
      <div className="streak-icon">🔥</div>

      <div>
        <h2 className="streak-title">{currentStreak} Day Streak</h2>

        <p className="streak-sub">Best Streak: {bestStreak}</p>
      </div>
    </div>
  );
}

export default StreakCard;
