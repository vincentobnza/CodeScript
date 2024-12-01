import React from "react";
import FeedbackIcon from "@/components/ui/FeedbackIcon";
import { List } from "@/layout/UILayout";
export default function PrivacyPolicy() {
  return (
    <div className="w-full pb-10 mx-auto space-y-8 text-zinc-400">
      <FeedbackIcon />
      <div className="flex flex-col gap-2">
        <div className="flex w-full max-w-screen-md mx-auto">
          <div className="p-4 md:p-0">
            <h1 className="mb-5 text-4xl font-semibold text-zinc-800 dark:text-zinc-50">
              Privacy Policy
            </h1>
            <p className="text-md text-zinc-700 dark:text-zinc-400">
              We Value Your Privacy.
            </p>

            <p className="mt-8 text-zinc-700 dark:text-zinc-400">
              Welcome to CodeScript.We are committed to protecting your privacy
              and ensuring that your personal information is handled
              responsibly. This Privacy Policy outlines how we collect, use, and
              protect your information.
            </p>
            <div className="flex flex-col gap-3 mt-8">
              <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                The Information We Collect
              </h1>
              <p className="text-md text-zinc-700 dark:text-zinc-400">
                CodeScript collects information by various methods, including
                information actively provided by its users, IT students, and
                information arising from the platform's usage, such as feedback
                or progress on modules.
              </p>
              <p className="text-md text-zinc-700 dark:text-zinc-400">
                The types of personal information we collect includes:
              </p>

              <List
                items={[
                  "Email Address",
                  "Username",
                  "Other relevant information such as logs or session details",
                ]}
              />
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                How We Use This Information
              </h1>

              <List
                items={[
                  "Provide students with access to learning modules",
                  "Track progress on JavaScript lessons and skills development",
                  "Improve platform features",
                  "Provide technical support",
                ]}
              />
              <p className="text-md text-zinc-700 dark:text-zinc-400">
                The information collected also helps us in monitoring the
                platform for performance, user engagement, and service quality.
                CodeScript may use anonymous data and research purposes to
                better understand the effectiveness of our learning platform.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                Who We Share This Information With
              </h1>
              <p className="text-md text-zinc-700 dark:text-zinc-400">
                CodeScript does not share personal information with third
                parties except as described in this policy. We do not sell user
                information to third parties.
              </p>

              <p className="text-md text-zinc-700 dark:text-zinc-400">
                However, please note that some learning modules used on this
                platform are sourced from online educational resources, and we
                do not claim ownership over these materials. Any third-party
                resources utilized within the platform retain their respective
                rights and licensing. We only use these modules to enhance the
                educational experience of IT students. By using these modules,
                the platform and its users abide by the copyright and licensing
                obligations set forth by their original owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
