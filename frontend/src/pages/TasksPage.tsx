import { useState } from "react";
import { Notification } from "../components/Notification";
import { StatusFilter } from "../components/StatusFilter";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task";

export function TasksPage() {
  const { tasks, statusFilter, setStatusFilter, loading, error, create, update, remove } = useTasks();
  const [notice, setNotice] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
  const [editing, setEditing] = useState<Task | null>(null);
  const [creating, setCreating] = useState<boolean>(false);

  const handleDelete = async (task: Task) => {
    if (!confirm(`Удалить задачу "${task.title}"?`)) return;
    try {
      await remove(task.id);
      setNotice({ type: "success", message: "Задача удалена" });
    } catch (e: any) {
      setNotice({ type: "error", message: e?.message ?? "Ошибка удаления" });
    }
  };

  const handleCreate = async (payload: any) => {
    try {
      await create(payload);
      setNotice({ type: "success", message: "Задача создана" });
      setCreating(false);
    } catch (e: any) {
      setNotice({ type: "error", message: e?.message ?? "Ошибка создания" });
      throw e;
    }
  };

  const handleUpdate = async (payload: any) => {
    if (!editing) return;
    try {
      await update(editing.id, payload);
      setEditing(null);
      setNotice({ type: "success", message: "Задача обновлена" });
    } catch (e: any) {
      setNotice({ type: "error", message: e?.message ?? "Ошибка обновления" });
      throw e;
    }
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      {notice && <Notification type={notice.type} message={notice.message} onClose={() => setNotice(null)} />}
      {error && <div className="notice error">{error}</div>}
      <div className="row" style={{ justifyContent: "space-between" }}>
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        <button className="btn" onClick={() => setCreating((v) => !v)}>
          {creating ? "Скрыть" : "Создать задачу"}
        </button>
      </div>

      {creating && (
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Новая задача</h3>
          <TaskForm mode="create" onSubmit={handleCreate} onCancel={() => setCreating(false)} />
        </div>
      )}

      <TaskList tasks={tasks} loading={loading} onEdit={(t) => setEditing(t)} onDelete={handleDelete} />

      {editing && (
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Редактирование</h3>
          <TaskForm mode="edit" initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        </div>
      )}
    </div>
  );
}


