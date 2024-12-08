import React from "react";
import { MessageCircleQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip } from "@nextui-org/react";
export default function FeedbackIcon() {
  return (
    <>
      <Tooltip
        content="Provide us your feedback ⭐"
        radius="none"
        className="font-Jost"
      >
        <Link
          to="/feedback"
          className="fixed z-50 grid text-green-500 transition duration-500 ease-linear bottom-5 right-5"
        >
          <MessageCircleQuestion size={35} />
        </Link>
      </Tooltip>
    </>
  );
}
