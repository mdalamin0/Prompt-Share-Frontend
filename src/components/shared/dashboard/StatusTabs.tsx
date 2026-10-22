"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatusTab {
  value: string;
  label: string;
}

interface StatusTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  items: StatusTab[];
  className?: string;
}

export default function StatusTabs({
  value,
  onValueChange,
  items,
  className,
}: StatusTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <TabsList className="h-auto w-full justify-start overflow-x-auto  bg-muted/60 p-1 sm:w-fit">
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="shrink-0 rounded-lg px-4 py-2 text-sm "
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
