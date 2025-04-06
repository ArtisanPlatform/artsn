import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus } from "lucide-react";
import { Column } from "@/app/artsn/projects/kanban/[projectId]/page";
import { TaskCard } from "@/components/task/task-card";

export function KanbanColumn({ column }: { column: Column }) {
  const { id, title, color, count, tasks } = column;

  const { setNodeRef } = useSortable({
    id: id,
    data: {
      type: "column",
      column,
    },
  });

  return (
    <div ref={setNodeRef} className="rounded-lg p-4">
      <div className="flex items-center mb-3">
        <div className={`w-1.5 h-1.5 rounded-full ${color} mr-2`}></div>
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground ml-2 text-sm">{count}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="text-center bg-white p-3 rounded-lg">
          <button className="text-xs text-primary flex items-center justify-center mx-auto">
            <Plus className="h-3 w-3 mr-1" />
            Add New Task
          </button>
        </div>

        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
