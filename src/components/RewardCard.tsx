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

  return (
    <div className="bg-slate-900 rounded-xl p-4 flex justify-between items-center">
      <div>
        <h3 className="font-medium">{reward.title}</h3>

        <p className="text-slate-400">{reward.cost} Coins</p>
      </div>

      <button
        onClick={() => buyReward(reward.id)}
        disabled={balance < reward.cost}
        className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition"
      >
        Buy
      </button>
    </div>
  );
}

export default RewardCard;
