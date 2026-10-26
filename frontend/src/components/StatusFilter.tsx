import { TaskStatus } from "../types/task";

interface StatusFilterProps {
  value: TaskStatus | "all";
  onChange: (value: TaskStatus | "all") => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const options: Array<{ value: TaskStatus | "all"; label: string }> = [
    { value: "all", label: "Все" },
    { value: "todo", label: "В планах" },
    { value: "in_progress", label: "В работе" },
    { value: "done", label: "Сделано" }
  ];
  return (
    <select
      aria-label="Фильтр статуса"
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value as TaskStatus | "all")}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}


