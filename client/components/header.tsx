import { Bell, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search"
              className="pl-8 h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Admin Artsn</span>
          </div>
        </div>
      </div>
    </header>
  );
};
