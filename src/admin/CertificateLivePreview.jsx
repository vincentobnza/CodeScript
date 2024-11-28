import React from "react";
import CertificateOfCompletion from "../assets/CertificateOfCompletion.png";

export default function CertificateLivePreview() {
  return (
    <div className="grid w-full min-h-screen bg-zinc-900 place-items-center">
      <div className="flex flex-col items-center justify-center">
        <img
          src={CertificateOfCompletion}
          alt="certficate of completion"
          className="w-[700px]"
        />
      </div>
    </div>
  );
}
