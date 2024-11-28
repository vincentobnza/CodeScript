import React from "react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <div className="relative grid w-full min-h-screen bg-white place-items-center">
      <Link
        to="/feedback"
        className="absolute hidden px-4 py-2 mt-5 text-xs border md:flex border-zinc-300 text-zinc-600 top-2 right-6"
      >
        Send a feedback
      </Link>
      <div className="max-w-3xl px-4 py-8 mx-auto bg-white text-zinc-800">
        <h1 className="mb-4 text-3xl font-semibold text-center">
          Learn More: Ranking Visibility
        </h1>
        <p className="mb-6 text-md text-zinc-600">
          The leaderboard ranking feature allows you to track your points and
          see your position relative to other users. However, this feature can
          be hidden temporarily for various reasons.
        </p>

        <h2 className="mb-4 text-2xl font-semibold text-zinc-700">
          Why is the ranking hidden?
        </h2>
        <p className="mb-4 text-md text-zinc-600">
          The ranking can be hidden temporarily for reasons like maintenance,
          updates, or to reduce distractions during specific activities. While
          hidden, users will not see the leaderboard, but it will be restored
          once the feature is visible again.
        </p>

        <h2 className="mb-4 text-2xl font-semibold text-zinc-700">
          What happens when the ranking is visible again?
        </h2>
        <p className="mb-4 text-md text-zinc-600">
          Once the ranking becomes visible, you can view your points, rankings,
          and progress relative to other users. This feature is a great way to
          stay engaged and motivated by seeing how you compare with others in
          the community.
        </p>

        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 mt-5 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
