import { useAppStore } from "../store/useAppStore";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    points: number;
    completed: boolean;
  };
}

function TaskCard({ task }: TaskCardProps) {
  const completeTask = useAppStore((state) => state.completeTask);

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div>
        <h3 className="task-title">{task.title}</h3>

        <p className="task-meta">+{task.points} Coins & XP</p>
      </div>

      <button
        disabled={task.completed}
        onClick={() => completeTask(task.id)}
        className={`task-btn ${task.completed ? "done" : "active"}`}
      >
        {task.completed ? "Done" : "Complete"}
      </button>
    </div>
  );
}

export default TaskCard;
