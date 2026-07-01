import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUIStore } from "./useUIStore";

export interface Task {
  id: string;
  title: string;
  points: number;

  type: "daily" | "repeatable";

  completed: boolean;

  completionCount: number;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
}

export interface Activity {
  id: string;
  taskTitle: string;
  points: number;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface AppState {
  balance: number;
  xp: number;

  currentStreak: number;
  bestStreak: number;
  lastCompletedDate: string | null;
  lastResetDate: string | null;

  tasks: Task[];
  rewards: Reward[];
  activity: Activity[];
  achievements: Achievement[];

  completeTask: (id: string) => void;
  resetTasks: () => void;
  buyReward: (id: string) => void;
  addTask: (
    title: string,
    points: number,
    type: "daily" | "repeatable",
  ) => void;
  deleteTask: (id: string) => void;
  addReward: (title: string, cost: number) => void;
  deleteReward: (id: string) => void;
  editTask: (
    id: string,
    title: string,
    points: number,
    type: "daily" | "repeatable",
  ) => void;
  editReward: (id: string, title: string, cost: number) => void;
  unlockAchievement: (id: string) => void;
  checkDailyReset: () => void;
  resetStore: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      balance: 0,
      xp: 0,

      currentStreak: 0,
      bestStreak: 0,
      lastCompletedDate: null,
      lastResetDate: null,

      tasks: [
        {
          id: "1",
          title: "Workout",
          points: 25,
          completed: false,
          type: "daily",
          completionCount: 0,
        },
        {
          id: "2",
          title: "Read 30 Minutes",
          points: 15,
          completed: false,
          type: "repeatable",
          completionCount: 0,
        },
        {
          id: "3",
          title: "Clean Room",
          points: 10,
          completed: false,
          type: "daily",
          completionCount: 0,
        },
        {
          id: "4",
          title: "Push-ups",
          points: 15,
          completed: false,
          type: "repeatable",
          completionCount: 0,
        },
      ],

      rewards: [
        {
          id: "r1",
          title: "1 Hour Gaming",
          cost: 50,
        },
        {
          id: "r2",
          title: "Pizza Night",
          cost: 300,
        },
        {
          id: "r3",
          title: "New Keyboard",
          cost: 5000,
        },
      ],
      activity: [],
      achievements: [
        {
          id: "first-task",
          title: "First Steps",
          description: "Complete your first task",
          unlocked: false,
        },
        {
          id: "level-5",
          title: "Level 5",
          description: "Reach Level 5",
          unlocked: false,
        },
        {
          id: "streak-7",
          title: "7 Day Streak",
          description: "Maintain a 7 day streak",
          unlocked: false,
        },
        {
          id: "coins-1000",
          title: "Wealthy",
          description: "Earn 1000 coins",
          unlocked: false,
        },
        {
          id: "reward-buyer",
          title: "Reward Hunter",
          description: "Buy your first reward",
          unlocked: false,
        },
      ],

      completeTask: (id) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);

          if (!task) return state;

          if (task.type === "daily" && task.completed) {
            return state;
          }

          const today = new Date().toLocaleDateString("en-CA");
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          const yesterdayString = yesterday.toLocaleDateString("en-CA");

          let newStreak: number;

          if (state.lastCompletedDate === today) {
            newStreak = state.currentStreak;
          } else if (state.lastCompletedDate === yesterdayString) {
            newStreak = state.currentStreak + 1;
          } else {
            newStreak = 1;
          }
          const newBalance = state.balance + task.points;
          const oldLevel = Math.floor(state.xp / 100) + 1;
          const newXP = state.xp + task.points;
          const newLevel = Math.floor(newXP / 100) + 1;

          const updatedAchievements = state.achievements.map((achievement) => {
            switch (achievement.id) {
              case "first-task":
                return {
                  ...achievement,
                  unlocked: true,
                };

              case "level-5":
                return {
                  ...achievement,
                  unlocked: newLevel >= 5,
                };

              case "streak-7":
                return {
                  ...achievement,
                  unlocked: newStreak >= 7,
                };

              case "coins-1000":
                return {
                  ...achievement,
                  unlocked: newBalance >= 1000,
                };

              default:
                return achievement;
            }
          });
          const showToast = useUIStore.getState().showToast;

          showToast({
            type: "success",
            title: "Task Completed",
            description: `${task.title} • +${task.points} XP`,
          });
          if (newLevel > oldLevel) {
            showToast({
              type: "achievement",
              title: "Level Up!",
              description: `Reached Level ${newLevel}`,
            });
          }

          return {
            currentStreak: newStreak,
            bestStreak: Math.max(state.bestStreak, newStreak),
            lastCompletedDate: today,
            balance: state.balance + task.points,
            xp: newXP,
            achievements: updatedAchievements,

            tasks: state.tasks.map((t) =>
              t.id === id
                ? {
                    ...t,
                    completed: t.type === "daily" ? true : false,
                    completionCount: t.completionCount + 1,
                  }
                : t,
            ),

            activity: [
              ...state.activity,
              {
                id: Date.now().toString(),
                taskTitle: task.title,
                points: task.points,
                date: today,
              },
            ],
          };
        }),

      resetTasks: () =>
        set((state) => ({
          tasks: state.tasks.map((task) => ({
            ...task,
            completed: false,
            completionCount: 0,
          })),
        })),

      buyReward: (id) =>
        set((state) => {
          const reward = state.rewards.find((r) => r.id === id);

          if (!reward) return state;

          if (state.balance < reward.cost) return state;

          const updatedAchievements = state.achievements.map((achievement) =>
            achievement.id === "reward-buyer"
              ? {
                  ...achievement,
                  unlocked: true,
                }
              : achievement,
          );
          const showToast = useUIStore.getState().showToast;

          showToast({
            type: "reward",
            title: "Reward Purchased",
            description: reward.title,
          });

          return {
            balance: state.balance - reward.cost,
            achievements: updatedAchievements,
          };
        }),
      addTask: (title, points, type) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              title,
              points,
              type,
              completed: false,
              completionCount: 0,
            },
          ],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      editTask: (id, title, points, type) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  title,
                  points,
                  type,
                }
              : task,
          ),
        })),
      addReward: (title, cost) =>
        set((state) => ({
          rewards: [
            ...state.rewards,
            {
              id: Date.now().toString(),
              title,
              cost,
            },
          ],
        })),
      deleteReward: (id) =>
        set((state) => ({
          rewards: state.rewards.filter((reward) => reward.id !== id),
        })),
      editReward: (id, title, cost) =>
        set((state) => ({
          rewards: state.rewards.map((reward) =>
            reward.id === id ? { ...reward, title, cost } : reward,
          ),
        })),
      unlockAchievement: (id) =>
        set((state) => {
          const showToast = useUIStore.getState().showToast;

          const achievements = state.achievements.map((achievement) => {
            if (achievement.id !== id) return achievement;

            // Already unlocked? Don't show another toast.
            if (achievement.unlocked) return achievement;

            showToast({
              type: "achievement",
              title: "Achievement Unlocked!",
              description: achievement.title,
            });

            return {
              ...achievement,
              unlocked: true,
            };
          });

          return { achievements };
        }),

      checkDailyReset: () =>
        set((state) => {
          const today = new Date().toLocaleDateString("en-CA");

          if (state.lastResetDate === today) return state;

          return {
            lastResetDate: today,

            tasks: state.tasks.map((task) => ({
              ...task,
              completed: false,
              completionCount: 0,
            })),
          };
        }),
      resetStore: () => {
        localStorage.removeItem("lifexp-storage");
        window.location.reload();
      },
    }),
    {
      name: "lifexp-storage",
    },
  ),
);
