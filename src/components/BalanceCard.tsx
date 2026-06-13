import { useAppStore } from "../store/useAppStore";

function BalanceCard() {
  const balance = useAppStore((state) => state.balance);
  const xp = useAppStore((state) => state.xp);

  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <div className="rounded-xl bg-slate-900 p-6">
        <h2 className="text-2xl font-semibold">{balance} Coins</h2>

        <p className="text-slate-400">Available Balance</p>
      </div>

      <div className="rounded-xl bg-slate-900 p-6">
        <h2 className="text-2xl font-semibold">Level {level}</h2>

        <p className="text-slate-400 mb-3">{xp} XP</p>

        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="text-xs text-slate-500 mt-2">
          {progress}/100 XP to next level
        </p>
      </div>
    </div>
  );
}

export default BalanceCard;
