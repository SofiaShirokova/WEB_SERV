import { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  loading?: boolean;
}

export function TaskList({ tasks, onEdit, onDelete, loading }: TaskListProps) {
  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (!tasks.length) {
    return <div className="notice">Задачи не найдены</div>;
  }
  return (
    <table className="table" aria-label="Список задач">
      <thead>
        <tr>
          <th>Название</th>
          <th>Статус</th>
          <th>Создана</th>
          <th style={{ textAlign: "right" }}>Действия</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}


