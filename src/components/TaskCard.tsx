import { useAppStore } from "../store/useAppStore";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    points: number;
    completed: boolean;
    type: "daily" | "repeatable";
    completionCount: number;
  };
}

function TaskCard({ task }: TaskCardProps) {
  const completeTask = useAppStore((state) => state.completeTask);

  const isDaily = task.type === "daily";
  const isDisabled = isDaily && task.completed;

  return (
    <div
      className={`task-card ${task.completed && isDaily ? "completed" : ""}`}
    >
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>

          <span
            className={`task-type-badge ${isDaily ? "daily" : "repeatable"}`}
          >
            {isDaily ? "📅 Daily" : "🔁 Repeatable"}
          </span>
        </div>

        <div className="task-meta">
          <span className="task-points">⭐ +{task.points} Coins & XP</span>

          {!isDaily && (
            <span className="task-count">🔥 ×{task.completionCount} Today</span>
          )}
        </div>
      </div>

      <button
        disabled={isDisabled}
        onClick={() => completeTask(task.id)}
        className={`task-btn ${isDisabled ? "done" : "active"}`}
      >
        {isDaily ? (task.completed ? "Done" : "Complete") : "+ Complete"}
      </button>
    </div>
  );
}

export default TaskCard;
