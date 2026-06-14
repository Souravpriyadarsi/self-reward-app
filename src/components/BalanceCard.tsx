import { useAppStore } from "../store/useAppStore";

function BalanceCard() {
  const balance = useAppStore((state) => state.balance);
  const xp = useAppStore((state) => state.xp);

  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <div className="balance-grid">
      {/* Wallet Card */}
      <div className="glass-card wallet-card">
        <p className="card-label">Wallet</p>
        <h2 className="balance-value">{balance}</h2>
        <p className="muted-text">Coins available</p>
      </div>

      {/* XP Card */}
      <div className="glass-card xp-card">
        <p className="card-label">Level</p>
        <h2 className="level-value">Level {level}</h2>

        <p className="muted-text xp-text">{xp} XP Total</p>

        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="xp-footer">{progress}/100 XP to next level</p>
      </div>
    </div>
  );
}

export default BalanceCard;
