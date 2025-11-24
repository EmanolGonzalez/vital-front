import React from "react";

interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ selected, onClick, children }) => (
  <button
    type="button"
    className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium mr-2 mb-2 transition-colors duration-200 focus:outline-none ${selected ? "bg-primary text-white border-primary" : "bg-muted text-foreground border-muted-foreground hover:bg-primary/10"}`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface ChipListProps {
  children: React.ReactNode;
}

export const ChipList: React.FC<ChipListProps> = ({ children }) => (
  <div className="flex flex-wrap gap-2">{children}</div>
);
