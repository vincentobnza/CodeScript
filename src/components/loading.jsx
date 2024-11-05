import { Spinner } from "@nextui-org/react";

export default function Loading({ title, text }) {
  return (
    <div className="fixed flex flex-col items-center justify-center inset-0 bg-white dark:bg-zinc-900 z-[100]">
      <div className="p-8 bg-transparent bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="lg" color="success" />
          <h2 className="mt-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
