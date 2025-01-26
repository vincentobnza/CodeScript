import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 font-Balsamiq bg-zinc-900">
      <div className="w-full max-w-2xl p-8 text-center">
        <h1 className="text-[120px] font-bold mb-8 bg-gradient-to-br from-green-400 to-green-950 bg-clip-text text-transparent">
          404
        </h1>
        <p className="mb-4 text-2xl font-semibold text-gray-300">
          Page Not Found
        </p>
        <p className="mb-8 text-sm text-gray-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-4 px-6 py-2 mt-8 text-sm font-bold transition duration-300 rounded-full text-zinc-500"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
