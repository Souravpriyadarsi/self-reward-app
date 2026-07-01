import { useAppStore } from "../store/useAppStore";

const STORAGE_KEY = "lifexp-storage";
const BACKUP_VERSION = 1;

export interface LifeXPBackup {
  version: number;
  app: string;
  exportedAt: string;
  data: unknown;
}

/**
 * Downloads a JSON backup of the entire app.
 */
export function exportBackup() {
  const persistedData = localStorage.getItem(STORAGE_KEY);

  if (!persistedData) {
    throw new Error("No data available to back up.");
  }

  const backup: LifeXPBackup = {
    version: BACKUP_VERSION,
    app: "LifeXP",
    exportedAt: new Date().toISOString(),
    data: JSON.parse(persistedData),
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const today = new Date().toISOString().split("T")[0];

  link.href = url;
  link.download = `LifeXP-${today}.json`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

/**
 * Restores a backup.
 */
export async function importBackup(file: File) {
  try {
    const text = await file.text();

    const backup = JSON.parse(text) as LifeXPBackup;

    if (!backup.app) {
      throw new Error("Invalid backup.");
    }

    if (backup.app !== "LifeXP") {
      throw new Error("This backup does not belong to LifeXP.");
    }

    if (backup.version !== BACKUP_VERSION) {
      throw new Error(`Unsupported backup version (${backup.version}).`);
    }

    if (!backup.data) {
      throw new Error("Backup contains no data.");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(backup.data));

    window.location.reload();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to restore backup.", { cause: error });
  }
}

/**
 * Returns backup information without importing it.
 */
export async function inspectBackup(file: File) {
  const text = await file.text();

  const backup = JSON.parse(text) as LifeXPBackup;

  return {
    app: backup.app,
    version: backup.version,
    exportedAt: backup.exportedAt,
  };
}

/**
 * Deletes every piece of stored LifeXP data.
 */
export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);

  useAppStore.persist.clearStorage();

  window.location.reload();
}
