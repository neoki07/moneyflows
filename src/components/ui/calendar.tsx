"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        [UI.Months]: "relative",
        [UI.Month]: "space-y-4",
        [UI.MonthCaption]: "flex justify-center items-center pt-1",
        [UI.CaptionLabel]: "text-sm font-medium",
        [UI.Nav]: "space-x-1 flex items-center z-10",
        [UI.PreviousMonthButton]: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "absolute top-0 left-1",
        ),
        [UI.NextMonthButton]: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "absolute top-0 right-1",
        ),
        [UI.MonthGrid]: "w-full border-collapse space-y-1",
        [UI.Weekdays]: "flex",
        [UI.Weekday]:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        [UI.Week]: "flex w-full mt-2",
        [UI.Day]: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        ),
        [UI.DayButton]: "h-full w-full",
        [SelectionState.range_start]: "day-range-start",
        [SelectionState.range_end]: "day-range-end",
        [SelectionState.selected]:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        [DayFlag.today]: "bg-accent text-accent-foreground",
        [DayFlag.outside]:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        [DayFlag.disabled]: "text-muted-foreground opacity-50",
        [SelectionState.range_middle]:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        [DayFlag.hidden]: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ className, ...props }) => {
          if (props.orientation === "left") {
            return (
              <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
            );
          }
          return (
            <ChevronRight className={cn("h-4 w-4", className)} {...props} />
          );
        },
      }}
      formatters={{
        formatCaption: (date) => format(date, "yyyy 年 MM 月"),
        formatWeekdayName: (date) => format(date, "E", { locale: ja }),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
