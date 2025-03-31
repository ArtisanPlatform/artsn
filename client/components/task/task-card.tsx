import { Task } from "@/app/projects/dashboard/[projectId]/page";
import { useSortable } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";
import {
  CheckSquare,
  MessageCircle,
  MoreVertical,
  Paperclip,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const colorMap: Record<string, string> = {
  amber: "bg-amber-50 text-amber-800",
  violet: "bg-violet-50 text-violet-800",
  red: "bg-red-50 text-red-800",
  blue: "bg-blue-50 text-blue-800",
  yellow: "bg-yellow-50 text-yellow-800",
  green: "bg-green-50 text-green-800",
  rose: "bg-rose-50 text-rose-800",
  gray: "bg-gray-50 text-gray-800",
};

export function TaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`overflow-hidden border ${
        task.isDashed ? "border-dashed border-muted" : "border-muted/30"
      } cursor-move`}
    >
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              colorMap[task.categoryColor] || "bg-gray-50 text-gray-500"
            )}
          >
            {task.category}
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreVertical className="h-3 w-3" />
          </Button>
        </div>
        <h4 className="font-medium text-sm">{task.title}</h4>
        <p className="text-xs text-muted-foreground">{task.description}</p>
      </div>
      <div
        className={`px-3 py-2 ${
          task.isDashed
            ? "border-t border-dashed border-muted"
            : "border-t border-muted/20"
        } flex items-center justify-between`}
      >
        <div className="text-xs text-muted-foreground">{task.progress}</div>
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-2">
            {task.assignees.map((i) => (
              <Avatar key={i} className="h-5 w-5 border border-background">
                <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                <AvatarFallback className="text-[10px]">U{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <div className="flex items-center text-xs">
              <span className="mr-1">{task.comments}</span>
              <MessageCircle className="h-3 w-3" />
            </div>
            <div className="flex items-center text-xs">
              <span className="mr-1">{task.attachments}</span>
              <Paperclip className="h-3 w-3" />
            </div>
            <div className="flex items-center text-xs">
              <span className="mr-1">{task.checklist}</span>
              <CheckSquare className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
