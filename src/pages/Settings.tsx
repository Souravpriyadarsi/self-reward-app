import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAppStore } from "../store/useAppStore";
import { useUIStore } from "../store/useUIStore";
import ConfirmModal from "../components/ConfirmModal";
import { Select, Button, FileButton } from "@mantine/core";
import { exportBackup, importBackup } from "../utils/storage";

function Settings() {
  const tasks = useAppStore((state) => state.tasks);
  const rewards = useAppStore((state) => state.rewards);

  const addTask = useAppStore((state) => state.addTask);
  const deleteTask = useAppStore((state) => state.deleteTask);
  const editTask = useAppStore((state) => state.editTask);

  const addReward = useAppStore((state) => state.addReward);
  const deleteReward = useAppStore((state) => state.deleteReward);
  const editReward = useAppStore((state) => state.editReward);

  const resetStore = useAppStore((state) => state.resetStore);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskPoints, setTaskPoints] = useState("");
  const [taskType, setTaskType] = useState<"daily" | "repeatable">("daily");

  const [rewardTitle, setRewardTitle] = useState("");
  const [rewardCost, setRewardCost] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingRewardId, setEditingRewardId] = useState<string | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editType, setEditType] = useState<"daily" | "repeatable">("daily");
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [showDeleteRewardModal, setShowDeleteRewardModal] = useState(false);
  const [rewardToDelete, setRewardToDelete] = useState<string | null>(null);

  const handleAddTask = () => {
    const points = Number(taskPoints);

    if (!taskTitle || points <= 0) return;

    addTask(taskTitle, points, taskType);

    setTaskTitle("");
    setTaskPoints("");
    setTaskType("daily");
  };

  const handleAddReward = () => {
    const cost = Number(rewardCost);

    if (!rewardTitle || cost <= 0) return;

    addReward(rewardTitle, cost);

    setRewardTitle("");
    setRewardCost("");
  };
  const showToast = useUIStore.getState().showToast;
  const handleRestore = async (file: File | null) => {
    if (!file) return;

    try {
      await importBackup(file);

      showToast({
        type: "success",
        title: "Backup Restored",
        description: "LifeXP has been restored successfully.",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Restore Failed",
        description:
          error instanceof Error ? error.message : "Invalid backup file.",
      });
    }
  };

  return (
    <div className="app-shell">
      <Navbar />

      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>

          <p className="page-subtitle">
            Manage tasks, rewards and application data.
          </p>
        </div>
      </div>

      {/* TASK MANAGEMENT */}
      <div className="settings-grid">
        <section className="settings-panel">
          <div className="settings-panel-header">
            <div>
              <h2 className="settings-panel-title">Task Management</h2>
              <p className="settings-panel-subtitle">
                Create and manage your daily and repeatable tasks.
              </p>
            </div>
          </div>

          {/* Add Task */}

          <div className="settings-form-row">
            <input
              type="text"
              placeholder="Task Name"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="settings-input"
            />

            <input
              type="number"
              placeholder="XP"
              value={taskPoints}
              onChange={(e) => setTaskPoints(e.target.value)}
              className="settings-input settings-input-small"
            />

            <Select
              value={taskType}
              onChange={(value) =>
                setTaskType((value ?? "daily") as "daily" | "repeatable")
              }
              data={[
                { value: "daily", label: "📅 Daily" },
                { value: "repeatable", label: "🔁 Repeatable" },
              ]}
              className="task-type-select"
              classNames={{
                input: "lifexp-select-input",
                dropdown: "lifexp-select-dropdown",
                option: "lifexp-select-option",
              }}
            />

            <button
              onClick={handleAddTask}
              className="settings-btn settings-btn-primary"
            >
              + Add Task
            </button>
          </div>

          {/* Existing Tasks */}

          <div className="settings-list">
            {tasks.map((task) => (
              <div key={task.id} className="settings-item">
                {editingTaskId === task.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="settings-input"
                    />

                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="settings-input"
                    />

                    <Select
                      value={editType}
                      onChange={(value) =>
                        setEditType(
                          (value ?? "daily") as "daily" | "repeatable",
                        )
                      }
                      data={[
                        { value: "daily", label: "📅 Daily" },
                        { value: "repeatable", label: "🔁 Repeatable" },
                      ]}
                      className="task-type-select"
                      classNames={{
                        input: "lifexp-select-input",
                        dropdown: "lifexp-select-dropdown",
                        option: "lifexp-select-option",
                      }}
                    />

                    <div className="settings-actions">
                      <button
                        className="settings-btn settings-btn-success"
                        onClick={() => {
                          editTask(
                            task.id,
                            editTitle,
                            Number(editValue),
                            editType,
                          );
                          setEditingTaskId(null);
                        }}
                      >
                        Save
                      </button>

                      <button
                        className="settings-btn settings-btn-secondary"
                        onClick={() => setEditingTaskId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="settings-row">
                    <div className="settings-task-info">
                      <div className="settings-task-title">{task.title}</div>

                      <div className="settings-task-meta">
                        <span className="settings-task-points">
                          ⭐ {task.points} XP
                        </span>

                        {task.type === "repeatable" && (
                          <span className="settings-task-count">
                            Today: {task.completionCount}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="settings-actions">
                      <button
                        className="settings-btn settings-btn-warning"
                        onClick={() => {
                          setEditingTaskId(task.id);
                          setEditTitle(task.title);
                          setEditValue(String(task.points));
                          setEditType(task.type);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="settings-btn settings-btn-danger"
                        onClick={() => {
                          setTaskToDelete(task.id);
                          setShowDeleteTaskModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* REWARD MANAGEMENT */}

        <section className="settings-panel">
          <h2 className="settings-panel-title">Reward Management</h2>

          <div className="settings-form-row">
            <input
              type="text"
              placeholder="Reward Name"
              value={rewardTitle}
              onChange={(e) => setRewardTitle(e.target.value)}
              className="settings-input"
            />

            <input
              type="number"
              placeholder="Cost"
              value={rewardCost}
              onChange={(e) => setRewardCost(e.target.value)}
              className="settings-input settings-input-small"
            />

            <button
              onClick={handleAddReward}
              className="settings-btn settings-btn-primary"
            >
              Add Reward
            </button>
          </div>

          <div className="settings-list">
            {rewards.map((reward) => (
              <div key={reward.id} className="settings-item">
                {editingRewardId === reward.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="settings-input"
                    />

                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="settings-input"
                    />
                    <select
                      value={editType}
                      onChange={(e) =>
                        setEditType(e.target.value as "daily" | "repeatable")
                      }
                      className="settings-input"
                    >
                      <option value="daily">Daily</option>
                      <option value="repeatable">Repeatable</option>
                    </select>
                    <div className="settings-actions">
                      <button
                        className="settings-btn settings-btn-success"
                        onClick={() => {
                          editReward(reward.id, editTitle, Number(editValue));
                          setEditingRewardId(null);
                        }}
                      >
                        Save
                      </button>

                      <button
                        className="settings-btn settings-btn-secondary"
                        onClick={() => setEditingRewardId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="settings-row">
                    <div>
                      <h3>{reward.title}</h3>
                      <p className="muted-text">{reward.cost} Coins</p>
                    </div>

                    <div className="settings-actions">
                      <button
                        className="settings-btn settings-btn-warning"
                        onClick={() => {
                          setEditingRewardId(reward.id);
                          setEditTitle(reward.title);
                          setEditValue(String(reward.cost));
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="settings-btn settings-btn-danger"
                        onClick={() => {
                          setRewardToDelete(reward.id);
                          setShowDeleteRewardModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* {backup and Storage} */}

      <section className="storage-panel">
        <h2 className="settings-panel-title">💾 Storage</h2>

        <p className="storage-description">
          Backup or restore your LifeXP data. Your data stays completely
          offline.
        </p>

        <div className="storage-card">
          <div>
            <h3>💾 Backup Data</h3>
            <p>Create a complete backup of your progress.</p>
          </div>

          <Button
            color="violet"
            radius="xl"
            onClick={() => {
              exportBackup();

              showToast({
                type: "success",
                title: "Backup Created",
                description: "Backup downloaded successfully.",
              });
            }}
          >
            Create Backup
          </Button>
        </div>

        <div className="storage-card">
          <div>
            <h3>📂 Restore Backup</h3>
            <p>Restore your progress from a backup file.</p>
          </div>

          <FileButton onChange={handleRestore} accept="application/json">
            {(props) => (
              <Button {...props} color="grape" radius="xl">
                Choose Backup
              </Button>
            )}
          </FileButton>
        </div>
      </section>

      {/* DANGER ZONE */}

      <section className="danger-zone">
        <h2>Danger Zone</h2>

        <p>Clear all data and reset LifeXP to its default state.</p>

        <button
          className="settings-btn settings-btn-danger"
          onClick={() => setShowResetModal(true)}
        >
          Clear All Data
        </button>
      </section>
      <ConfirmModal
        open={showResetModal}
        title="Clear All Data?"
        description="This will permanently delete all tasks, rewards, achievements, coins, XP and activity. This action cannot be undone."
        confirmText="Reset Everything"
        cancelText="Cancel"
        danger={true}
        onConfirm={() => {
          resetStore();
          setShowResetModal(false);
        }}
        onCancel={() => setShowResetModal(false)}
      />
      <ConfirmModal
        open={showDeleteTaskModal}
        title="Delete Task?"
        description="This task will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={() => {
          if (taskToDelete) {
            deleteTask(taskToDelete);
          }

          setTaskToDelete(null);
          setShowDeleteTaskModal(false);
        }}
        onCancel={() => {
          setTaskToDelete(null);
          setShowDeleteTaskModal(false);
        }}
      />
      <ConfirmModal
        open={showDeleteRewardModal}
        title="Delete Reward?"
        description="This reward will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={() => {
          if (rewardToDelete) {
            deleteReward(rewardToDelete);
          }

          setRewardToDelete(null);
          setShowDeleteRewardModal(false);
        }}
        onCancel={() => {
          setRewardToDelete(null);
          setShowDeleteRewardModal(false);
        }}
      />
    </div>
  );
}

export default Settings;
