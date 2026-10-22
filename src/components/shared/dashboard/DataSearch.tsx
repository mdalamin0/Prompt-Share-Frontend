"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DataSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function DataSearch({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: DataSearchProps) {
  return (
    <div className={cn("relative w-full sm:max-w-sm", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        type="search"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 pl-9"
      />
    </div>
  );
}
