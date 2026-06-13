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
    <div className="bg-slate-900 rounded-xl p-4 flex justify-between items-center">
      <div>
        <h3 className="font-medium">{task.title}</h3>

        <p className="text-slate-400">+{task.points} Coins & XP</p>
      </div>

      <button
        disabled={task.completed}
        onClick={() => completeTask(task.id)}
        className={`px-4 py-2 rounded-lg transition ${
          task.completed ? "bg-gray-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {task.completed ? "Completed" : "Complete"}
      </button>
    </div>
  );
}

export default TaskCard;
