
import React from "react";
import { cn } from "@/lib/utils";

const TooltipProvider = ({ children }) => {
  return <>{children}</>;
};

const Tooltip = ({ children }) => {
  return <>{children}</>;
};

const TooltipTrigger = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.cloneElement : "button";
  return (
    <Comp
      ref={ref}
      className={cn(className)}
      {...props}
    />
  );
});

TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef(({ className, side = "top", align = "center", hidden, ...props }, ref) => {
  if (hidden) return null;
  
  return (
    <div
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50",
        className
      )}
      {...props}
    />
  );
});

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
