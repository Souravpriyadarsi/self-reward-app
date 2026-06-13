import { Link } from "react-router-dom";
import RewardCard from "../components/RewardCard";
import { useAppStore } from "../store/useAppStore";

function Rewards() {
  const rewards = useAppStore((state) => state.rewards);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-5xl font-bold">Rewards Store</h1>

        <Link to="/" className="bg-slate-700 px-4 py-2 rounded-lg">
          Dashboard
        </Link>
      </div>

      <div className="space-y-3">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
}

export default Rewards;
