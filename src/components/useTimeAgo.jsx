import React from "react";
import { useState } from "react";

export function useTimeAgo(date) {
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(date));

  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(getTimeAgo(date));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [date]);

  return timeAgo;
}
