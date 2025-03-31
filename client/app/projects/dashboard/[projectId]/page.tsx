"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutGrid, List, Plus } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import columnsData from "./cols.json";
import { KanbanColumn } from "@/components/kanban/kanban-column";
import { TaskCardPreview } from "@/components/task/task-preview";
import { createPortal } from "react-dom";

const viewOptions = [
  { label: "Board", icon: LayoutGrid },
  { label: "Table", icon: List },
  { label: "List", icon: List },
];

export type Task = {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  progress?: string;
  assignees: number[];
  comments: number;
  attachments: number;
  checklist: number;
  isDashed?: boolean;
};

export type Column = {
  id: string;
  title: string;
  color: string;
  count: number;
  tasks: Task[];
};

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>(columnsData);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findTaskById = (taskId: string) => {
    for (const column of columns) {
      const task = column.tasks.find((task) => task.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const findColumnByTaskId = (taskId: string) => {
    return columns.find((column) =>
      column.tasks.some((task) => task.id === taskId)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = findTaskById(active.id as string);
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id as string;
    const overTaskId = over.id as string;

    const activeColumn = findColumnByTaskId(activeTaskId);
    const overColumn = columns.find(
      (col) =>
        col.id === overTaskId ||
        col.tasks.some((task) => task.id === overTaskId)
    );

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id !== overColumn.id) {
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          if (column.id === activeColumn.id) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== activeTaskId),
              count: column.count - 1,
            };
          }

          if (column.id === overColumn.id) {
            const activeTask = findTaskById(activeTaskId);
            if (!activeTask) return column;

            const overTaskIndex = column.tasks.findIndex(
              (task) => task.id === overTaskId
            );

            if (overTaskIndex === -1) {
              return {
                ...column,
                tasks: [...column.tasks, activeTask],
                count: column.count + 1,
              };
            }

            const newTasks = [...column.tasks];
            newTasks.splice(overTaskIndex, 0, activeTask);

            return {
              ...column,
              tasks: newTasks,
              count: column.count + 1,
            };
          }

          return column;
        });
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeTaskId = active.id as string;
    const overTaskId = over.id as string;

    const activeColumn = findColumnByTaskId(activeTaskId);
    const overColumn = columns.find(
      (col) =>
        col.id === overTaskId ||
        col.tasks.some((task) => task.id === overTaskId)
    );

    if (!activeColumn || !overColumn) {
      setActiveTask(null);
      return;
    }

    if (activeColumn.id === overColumn.id && activeTaskId !== overTaskId) {
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          if (column.id !== activeColumn.id) return column;

          const oldIndex = column.tasks.findIndex(
            (task) => task.id === activeTaskId
          );
          const newIndex = column.tasks.findIndex(
            (task) => task.id === overTaskId
          );

          if (oldIndex === -1 || newIndex === -1) return column;

          const newTasks = [...column.tasks];
          const [movedTask] = newTasks.splice(oldIndex, 1);
          newTasks.splice(newIndex, 0, movedTask);

          return {
            ...column,
            tasks: newTasks,
          };
        });
      });
    }

    setActiveTask(null);
  };

  return (
    <>
      <div className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2 ">
          <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
          <h1 className="text-xl font-semibold">Superagenda</h1>
        </div>
        <Progress value={13} className="h-1.5 w-64 mx-4" />
        <span className="text-xs text-muted-foreground">13% complete</span>

        <div className="ml-auto flex items-center space-x-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
              +3
            </div>
          </div>

          <Button size="sm" className="h-8 bg-red-500">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Member
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="flex items-center justify-end space-x-2 p-4">
          {viewOptions.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              className="h-8 bg-white"
            >
              <Icon className="h-3.5 w-3.5 mr-1" />
              {label}
            </Button>
          ))}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-4 h-[calc(100dvh-217px)]">
            {columns.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
          </div>

          {typeof window !== "undefined" &&
            createPortal(
              <DragOverlay>
                {activeTask && <TaskCardPreview task={activeTask} />}
              </DragOverlay>,
              document.body
            )}
        </DndContext>
      </div>
    </>
  );
}
