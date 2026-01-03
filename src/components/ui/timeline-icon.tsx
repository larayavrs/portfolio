import React from "react";

export const TimelineIcon: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative after:absolute after:start-3 after:top-8 after:bottom-2 after:w-px after:-translate-x-[0.5px] after:bg-neutral-700 group-last:after:hidden dark:after:bg-neutral-700">
      {children}
    </div>
  );
};
