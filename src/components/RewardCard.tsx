import { useAppStore } from "../store/useAppStore";

interface RewardCardProps {
  reward: {
    id: string;
    title: string;
    cost: number;
  };
}

function RewardCard({ reward }: RewardCardProps) {
  const balance = useAppStore((state) => state.balance);
  const buyReward = useAppStore((state) => state.buyReward);

  const canAfford = balance >= reward.cost;

  return (
    <div className="reward-card">
      <div>
        <h3 className="reward-title">{reward.title}</h3>
        <p className="reward-cost">{reward.cost} Coins</p>
      </div>

      <button
        onClick={() => buyReward(reward.id)}
        disabled={!canAfford}
        className={`reward-btn ${canAfford ? "active" : "disabled"}`}
      >
        Buy
      </button>
    </div>
  );
}

export default RewardCard;
