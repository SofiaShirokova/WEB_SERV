import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

function readableStatus(status: Task["status"]): string {
  switch (status) {
    case "todo":
      return "В планах";
    case "in_progress":
      return "В работе";
    case "done":
      return "Сделано";
    default:
      return status;
  }
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString();
}

export function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  return (
    <tr>
      <td>{task.title}</td>
      <td>
        <span className={`badge ${task.status}`}>{readableStatus(task.status)}</span>
      </td>
      <td>{formatDate(task.created_at)}</td>
      <td style={{ textAlign: "right" }}>
        <div className="row" style={{ justifyContent: "flex-end" }}>
          <button className="btn secondary" onClick={() => onEdit(task)}>
            Редактировать
          </button>
          <button className="btn danger" onClick={() => onDelete(task)}>
            Удалить
          </button>
        </div>
      </td>
    </tr>
  );
}


