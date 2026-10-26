import { useEffect } from "react";

export type NoticeType = "info" | "success" | "error";

interface NotificationProps {
  message: string;
  type?: NoticeType;
  onClose?: () => void;
  autoHideMs?: number;
}

export function Notification({ message, type = "info", onClose, autoHideMs = 3000 }: NotificationProps) {
  useEffect(() => {
    if (!onClose) return;
    const id = setTimeout(() => onClose(), autoHideMs);
    return () => clearTimeout(id);
  }, [onClose, autoHideMs]);

  return <div className={`notice ${type === "error" ? "error" : type === "success" ? "success" : ""}`}>{message}</div>;
}


