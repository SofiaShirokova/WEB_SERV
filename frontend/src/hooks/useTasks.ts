import { useCallback, useEffect, useState } from "react";
import { Task, TaskCreatePayload, TaskStatus, TaskUpdatePayload } from "../types/task";
import * as api from "../api/tasksApi";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (status?: TaskStatus | "all") => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks(status && status !== "all" ? status : undefined);
      setTasks(data);
    } catch (e: any) {
      setError(e?.message ?? "Не удалось загрузить задачи");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(statusFilter);
  }, [load, statusFilter]);

  const create = useCallback(async (payload: TaskCreatePayload) => {
    await api.createTask(payload);
    await load(statusFilter);
  }, [load, statusFilter]);

  const update = useCallback(async (id: number, payload: TaskUpdatePayload) => {
    await api.updateTask(id, payload);
    await load(statusFilter);
  }, [load, statusFilter]);

  const remove = useCallback(async (id: number) => {
    await api.deleteTask(id);
    await load(statusFilter);
  }, [load, statusFilter]);

  return {
    tasks,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    create,
    update,
    remove,
    reload: () => load(statusFilter)
  };
}


