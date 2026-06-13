import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

function Settings() {
  const tasks = useAppStore((state) => state.tasks);
  const rewards = useAppStore((state) => state.rewards);
  const resetStore = useAppStore((state) => state.resetStore);

  const addTask = useAppStore((state) => state.addTask);
  const deleteTask = useAppStore((state) => state.deleteTask);

  const addReward = useAppStore((state) => state.addReward);

  const deleteReward = useAppStore((state) => state.deleteReward);

  const editTask = useAppStore((state) => state.editTask);

  const editReward = useAppStore((state) => state.editReward);

  const [taskTitle, setTaskTitle] = useState("");

  const [taskPoints, setTaskPoints] = useState("");

  const [rewardTitle, setRewardTitle] = useState("");

  const [rewardCost, setRewardCost] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [editingRewardId, setEditingRewardId] = useState<string | null>(null);

  const [editTitle, setEditTitle] = useState("");

  const [editValue, setEditValue] = useState("");

  const handleAddTask = () => {
    const points = Number(taskPoints);

    if (!taskTitle || points <= 0) return;

    addTask(taskTitle, points);

    setTaskTitle("");
    setTaskPoints("");
  };

  const handleAddReward = () => {
    const cost = Number(rewardCost);

    if (!rewardTitle || cost <= 0) return;

    addReward(rewardTitle, cost);

    setRewardTitle("");
    setRewardCost("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-5xl font-bold">Settings</h1>

        <Link to="/" className="bg-slate-700 px-4 py-2 rounded-lg">
          Dashboard
        </Link>
      </div>

      {/* TASKS */}

      <div className="bg-slate-900 rounded-xl p-6 mb-10">
        <h2 className="text-2xl mb-4">Add Task</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Task Name"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="bg-slate-800 px-4 py-2 rounded-lg flex-1"
          />

          <input
            type="number"
            placeholder="Points"
            value={taskPoints}
            onChange={(e) => setTaskPoints(e.target.value)}
            className="bg-slate-800 px-4 py-2 rounded-lg w-32"
          />

          <button
            onClick={handleAddTask}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      <h2 className="text-2xl mb-4">Existing Tasks</h2>

      <div className="space-y-3 mb-12">
        {tasks.map((task) => (
          <div key={task.id} className="bg-slate-900 rounded-xl p-4">
            {editingTaskId === task.id ? (
              <div className="space-y-3">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="bg-slate-800 px-4 py-2 rounded-lg w-full"
                />

                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-slate-800 px-4 py-2 rounded-lg w-full"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      editTask(task.id, editTitle, Number(editValue));

                      setEditingTaskId(null);
                    }}
                    className="bg-green-600 px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="bg-gray-600 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.points} Points</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditTitle(task.title);
                      setEditValue(String(task.points));
                    }}
                    className="bg-yellow-600 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (confirm("Delete this task?")) {
                        deleteTask(task.id);
                      }
                    }}
                    className="bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* REWARDS */}

      <div className="bg-slate-900 rounded-xl p-6 mb-10">
        <h2 className="text-2xl mb-4">Add Reward</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Reward Name"
            value={rewardTitle}
            onChange={(e) => setRewardTitle(e.target.value)}
            className="bg-slate-800 px-4 py-2 rounded-lg flex-1"
          />

          <input
            type="number"
            placeholder="Cost"
            value={rewardCost}
            onChange={(e) => setRewardCost(e.target.value)}
            className="bg-slate-800 px-4 py-2 rounded-lg w-32"
          />

          <button
            onClick={handleAddReward}
            className="bg-purple-600 px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      <h2 className="text-2xl mb-4">Existing Rewards</h2>

      <div className="space-y-3">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-slate-900 rounded-xl p-4">
            {editingRewardId === reward.id ? (
              <div className="space-y-3">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="bg-slate-800 px-4 py-2 rounded-lg w-full"
                />

                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-slate-800 px-4 py-2 rounded-lg w-full"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      editReward(reward.id, editTitle, Number(editValue));

                      setEditingRewardId(null);
                    }}
                    className="bg-green-600 px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingRewardId(null)}
                    className="bg-gray-600 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3>{reward.title}</h3>
                  <p>{reward.cost} Coins</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingRewardId(reward.id);

                      setEditTitle(reward.title);

                      setEditValue(String(reward.cost));
                    }}
                    className="bg-yellow-600 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (confirm("Delete this reward?")) {
                        deleteReward(reward.id);
                      }
                    }}
                    className="bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RESET STORAGE */}
      <div className="bg-slate-900 rounded-xl p-6 mt-12 border border-red-600">
        <h2 className="text-2xl mb-4 text-red-500">Danger Zone</h2>
        <p className="text-slate-400 mb-4">
          Clear all data and reset the app to default state.
        </p>
        <button
          onClick={() => {
            if (
              confirm(
                "Are you sure? This will delete all tasks, rewards, and progress. This action cannot be undone.",
              )
            ) {
              resetStore();
            }
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
}

export default Settings;
