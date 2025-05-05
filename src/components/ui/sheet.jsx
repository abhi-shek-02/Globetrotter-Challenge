
import React from "react";
import { cn } from "@/lib/utils";

const Sheet = ({ children, open, onOpenChange }) => {
  return open ? (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed inset-y-0 right-0 z-50 flex max-w-full">
        {children}
      </div>
    </div>
  ) : null;
};

const SheetContent = React.forwardRef(
  ({ className, children, side = "right", ...props }, ref) => {
    const sideClasses = {
      top: "inset-x-0 top-0 border-b",
      right: "inset-y-0 right-0 border-l",
      bottom: "inset-x-0 bottom-0 border-t",
      left: "inset-y-0 left-0 border-r",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-background p-6 shadow-lg transition ease-in-out w-3/4 sm:max-w-sm",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SheetContent.displayName = "SheetContent";

export { Sheet, SheetContent };
