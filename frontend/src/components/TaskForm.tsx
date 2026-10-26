import { FormEvent, useEffect, useState } from "react";
import { Task, TaskCreatePayload, TaskStatus, TaskUpdatePayload } from "../types/task";

interface TaskFormProps {
  mode: "create" | "edit";
  initial?: Task | null;
  onSubmit: (payload: TaskCreatePayload | TaskUpdatePayload) => Promise<void> | void;
  onCancel?: () => void;
}

type Errors = Partial<Record<"title" | "description" | "status" | "root", string>>;

function validate(values: { title: string; description: string; status: TaskStatus }): Errors {
  const errors: Errors = {};
  if (!values.title || values.title.trim().length < 1 || values.title.length > 255) {
    errors.title = "Название обязательно (1–255 символов)";
  }
  if (values.description && values.description.length > 2000) {
    errors.description = "Описание до 2000 символов";
  }
  if (!["todo", "in_progress", "done"].includes(values.status)) {
    errors.status = "Некорректный статус";
  }
  return errors;
}

export function TaskForm({ mode, initial, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>((initial?.status as TaskStatus) ?? "todo");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description ?? "");
      setStatus(initial.status as TaskStatus);
    }
  }, [initial]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate({ title: title.trim(), description, status });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setSubmitting(true);
      if (mode === "create") {
        await onSubmit({ title: title.trim(), description: description || undefined, status });
        setTitle("");
        setDescription("");
        setStatus("todo");
      } else {
        await onSubmit({
          title: title.trim(),
          description: description || null,
          status
        });
      }
    } catch (err: any) {
      setErrors({ root: err?.message ?? "Ошибка отправки" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid">
      {errors.root && <div className="notice error">{errors.root}</div>}
      <div>
        <label>
          Название
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название задачи" />
        </label>
        {errors.title && <div className="notice error" style={{ marginTop: 6 }}>{errors.title}</div>}
      </div>
      <div>
        <label>
          Описание
          <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Опционально" />
        </label>
        {errors.description && <div className="notice error" style={{ marginTop: 6 }}>{errors.description}</div>}
      </div>
      <div>
        <label>
          Статус
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            <option value="todo">todo</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
          </select>
        </label>
        {errors.status && <div className="notice error" style={{ marginTop: 6 }}>{errors.status}</div>}
      </div>
      <div className="row" style={{ justifyContent: "flex-end" }}>
        {onCancel && (
          <button type="button" className="btn secondary" onClick={onCancel}>
            Отмена
          </button>
        )}
        <button className="btn" type="submit" disabled={submitting}>
          {mode === "create" ? "Создать" : "Сохранить"}
        </button>
      </div>
    </form>
  );
}


