import RewardCard from "../components/RewardCard";
import { useAppStore } from "../store/useAppStore";
import Navbar from "../components/Navbar";

function Rewards() {
  const rewards = useAppStore((state) => state.rewards);

  return (
    <div className="app-shell">
      <Navbar />
      <header className="page-header">
        <div>
          <h1 className="page-title">Rewards Store</h1>
          <p className="page-subtitle">Spend your hard-earned LifeXP coins.</p>
        </div>
      </header>

      <section className="rewards-section">
        <h2 className="section-title">Available Rewards</h2>

        <div className="reward-list">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Rewards;
