import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const LivePreview = () => {
  const [searchParams] = useSearchParams();
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    const html = decodeURIComponent(searchParams.get("html") || "");
    const css = decodeURIComponent(searchParams.get("css") || "");
    const js = decodeURIComponent(searchParams.get("js") || "");

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Reset default styles */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            /* Add your CSS */
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (error) {
              console.error('Error in preview:', error);
            }
          </script>
        </body>
      </html>
    `;

    setIframeContent(content);
  }, [searchParams]);

  return (
    <div className="bg-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="w-full ">
          <iframe
            srcDoc={iframeContent}
            title="Live Preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
