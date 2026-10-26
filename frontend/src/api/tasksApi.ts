import { apiClient } from "./client";
import { Task, TaskCreatePayload, TaskUpdatePayload, TaskStatus } from "../types/task";

export async function getTasks(status?: TaskStatus): Promise<Task[]> {
  const resp = await apiClient.get<Task[]>("/api/tasks", {
    params: status ? { status } : undefined
  });
  return resp.data;
}

export async function getTaskById(id: number): Promise<Task> {
  const resp = await apiClient.get<Task>(`/api/tasks/${id}`);
  return resp.data;
}

export async function createTask(payload: TaskCreatePayload): Promise<Task> {
  const resp = await apiClient.post<Task>("/api/tasks", payload);
  return resp.data;
}

export async function updateTask(id: number, payload: TaskUpdatePayload): Promise<Task> {
  const resp = await apiClient.put<Task>(`/api/tasks/${id}`, payload);
  return resp.data;
}

export async function deleteTask(id: number): Promise<void> {
  await apiClient.delete(`/api/tasks/${id}`);
}


