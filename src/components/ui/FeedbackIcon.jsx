import React from "react";
import { MessageSquareShare } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip } from "@nextui-org/react";
export default function FeedbackIcon() {
  return (
    <>
      <Tooltip
        content="Provide us your feedback ⭐"
        radius="none"
        className="font-Balsamiq"
      >
        <Link
          to="/feedback"
          className="fixed z-50 grid transition duration-500 ease-linear text-emerald-500 bottom-5 right-5"
        >
          <MessageSquareShare size={30} />
        </Link>
      </Tooltip>
    </>
  );
}
