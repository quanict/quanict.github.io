import * as React from "react";
import { cn } from "@/lib/utils";

const PillBorderedBadge = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

PillBorderedBadge.displayName = "PillBorderedBadge";

export { PillBorderedBadge };