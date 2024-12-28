import React from "react";

export default function AddLesson() {
  return (
    <div className="flex flex-col w-full gap-2 space-y-2">
      <Header />

      <div className="flex flex-col gap-4 m-8 p-8 bg-white border-2 border-dashed border-zinc-200 rounded-md">
        <FormField />
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <div className="flex justify-between items-center p-8">
      <h1 className="text-xl font-medium">Create New Lesson</h1>
    </div>
  );
};

const FormField = () => {
  return (
    <form className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          className="border border-gray-300 rounded-md p-3 px-4"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium">
          Description
        </label>
        <textarea
          type="text"
          id="title"
          placeholder="Enter description"
          className="border border-gray-300 rounded-md p-3 h-40 px-4"
        ></textarea>
      </div>
    </form>
  );
};
