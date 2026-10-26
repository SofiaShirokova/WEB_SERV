from typing import List, Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


def get(db: Session, task_id: int) -> Optional[Task]:
    return db.get(Task, task_id)


def list_tasks(db: Session, status: Optional[str] = None) -> List[Task]:
    stmt = select(Task)
    if status:
        stmt = stmt.where(Task.status == status)
    return list(db.scalars(stmt).all())


def create(db: Session, task_in: TaskCreate) -> Task:
    task = Task(
        title=task_in.title,
        description=task_in.description,
        status=task_in.status or "todo",
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def update(db: Session, task_id: int, task_in: TaskUpdate) -> Optional[Task]:
    task = db.get(Task, task_id)
    if task is None:
        return None
    if task_in.title is not None:
        task.title = task_in.title
    if task_in.description is not None:
        task.description = task_in.description
    if task_in.status is not None:
        task.status = task_in.status
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def delete(db: Session, task_id: int) -> bool:
    task = db.get(Task, task_id)
    if task is None:
        return False
    db.delete(task)
    db.commit()
    return True


