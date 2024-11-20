import React from "react";
import { motion } from "framer-motion";
import Aezil from "../assets/Aezil Sison.jpg";
import Nicole from "../assets/Nicole.jpg";
import Darren from "../assets/Darren Anzaldo.jpg";
import Vincent from "../assets/Vincent.png";
import Kiel from "../assets/kiel.png";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Avatar, Tooltip } from "@nextui-org/react";

export default function Developers() {
  return (
    <div className="w-full p-8 pb-10 space-y-16 bg-white dark:bg-zinc-900 dark:text-zinc-400">
      <div className="w-full max-w-screen-lg pb-10 mx-auto space-y-14">
        <TeamImage />

        <About />

        <LibrariesUsed />
        <Contacts />
      </div>
    </div>
  );
}

const TeamImage = () => {
  const developers = [
    {
      name: "Vincent Obenza",
      position: "Programmer / Designer",
      image: Vincent,
    },
    {
      name: "Aezil Sison",
      position: "Data Analyst / Researcher",
      image: Aezil,
    },
    {
      name: "Nicole Itucas",
      position: "Data Analyst / Researcher",
      image: Nicole,
    },
    {
      name: "Darren Anzaldo",
      position: "Researcher / Documentator",
      image: Darren,
    },
    {
      name: "Rod Kiel Enmoceno",
      position: "Researcher / Documentator",
      image: Kiel,
    },
  ];
  return (
    <div className="container mx-auto">
      <h2 className="mb-2 text-3xl font-bold text-center text-zinc-800 dark:text-zinc-200">
        Our Team
      </h2>
      <p className="mb-12 text-sm text-center">The Team Behind CodeScript</p>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {developers.map((developer, index) => (
          <motion.div
            key={developer.name}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="max-w-[320px] mx-auto border border-zinc-200 dark:border-zinc-700 group cursor-pointer"
              radius="none"
              shadow="none"
            >
              <CardBody className="p-0 overflow-visible">
                <Avatar
                  isBordered
                  radius="none"
                  size="lg"
                  src={developer.image}
                  className="w-full h-[180px] object-cover"
                />
              </CardBody>
              <CardFooter className="flex justify-between mt-4 text-small">
                <div>
                  <p className="text-sm font-bold text-default-500">
                    {developer.name}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                    {developer.position}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
const About = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium text-zinc-800 dark:text-zinc-300">
            About the system
          </h1>
          <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-400">
            Please be aware that in order to improve our system's educational
            process, some of the resources on this system are derived from
            outside sources. To offer a wide variety of content, we meticulously
            select and attribute these resources. We are still dedicated to
            upholding intellectual property rights and making sure that all
            materials from third parties are utilized in accordance with the
            licenses and permits that apply to them.
          </p>
        </div>
      </div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium text-zinc-800 dark:text-zinc-300">
            Contacts
          </h1>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Contact CodeScript for more info.
          </p>
        </div>
      </div>

      <hr class="h-px mt-3 bg-zinc-300 dark:bg-zinc-800 border-0" />

      <div className="mt-5">
        {/* create a button to open the email */}
        <a
          href="mailto:codescript2024@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm italic"
        >
          <Mail size={15} />
          codescript@gmail.com
        </a>
      </div>
    </div>
  );
};

const LibrariesUsed = () => {
  const Lists = [
    {
      name: "React JS",
      description: "A popular JavaScript library for building UIs.",
      icon: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254274/react-icon-md.png",
      link: "https://reactjs.org/",
    },
    {
      name: "Supabase",
      description: "An open-source backend as a service (BaaS).",
      icon: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
      link: "https://supabase.io/",
    },
    {
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for fast styling.",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png",
      link: "https://tailwindcss.com/",
    },
    {
      name: "Framer Motion",
      description: "A library for animations in React applications.",
      icon: "https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png",
      link: "https://www.framer.com/motion/",
    },
    {
      name: "Lucide Icons",
      description: "A customizable icon library for modern interfaces.",
      icon: "https://lucide.dev/logo.light.svg",
      link: "https://lucide.dev/",
    },
    {
      name: "Monaco Editor",
      description: "A powerful code editor for web applications.",
      icon: "https://cdn-icons-png.flaticon.com/128/868/868786.png",
      link: "https://microsoft.github.io/monaco-editor/",
    },
    {
      name: "Syntax Highlighter Editor",
      description: "A tool for displaying formatted code syntax.",
      icon: "https://cdn-icons-png.flaticon.com/128/868/868786.png",
      link: "https://react-syntax-highlighter.github.io/react-syntax-highlighter/",
    },
    {
      name: "Next UI",
      description: "A modern React UI library for fast development.",
      icon: "https://nextui.org/favicon.ico",
      link: "https://nextui.org/",
    },
    {
      name: "Material UI Charts",
      description: "A React charting library with Material UI styling.",
      icon: "https://mui.com/static/logo.png",
      link: "https://mui.com/",
    },
    {
      name: "React Hot Toast",
      description: "A library for customizable toast notifications.",
      icon: "https://cdn-icons-png.flaticon.com/128/868/868786.png",
      link: "https://react-hot-toast.com/",
    },
    {
      name: "Flaticons",
      description:
        "A source for free icons, including customizable vector icons.",
      icon: "https://focos.io/wp-content/uploads/focos-app-logos/flaticon.png",
      link: "https://www.flaticon.com/",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium text-zinc-800 dark:text-zinc-300">
            Software and Libraries Used
          </h1>
          <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-400">
            Below is a list of the software and libraries utilized in this
            system. Please note that these tools are the property of their
            respective owners.
          </p>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-2 md:gap-3 md:grid-cols-4">
        {Lists.map((list, idx) => {
          return (
            <Link
              to={list.link}
              className="relative flex flex-col items-start gap-2 p-4 pb-8 overflow-hidden transition duration-300 ease-linear border rounded-md bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 dark:hover:brightness-125 group"
              key={idx}
            >
              <img
                src={list.icon}
                alt="icon"
                className="absolute w-20 transition duration-300 ease-linear opacity-30 dark:opacity-10 -bottom-2 -right-3 group-hover:grayscale-0 dark:grayscale group-hover:opacity-40"
              />

              <div className="grid p-2 border rounded-lg size-8 bg-zinc-100 dark:bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-700 border-zinc-200 dark:border-zinc-600 place-items-center">
                <img src={list.icon} alt="icon" className="object-cover" />
              </div>

              <h1 className="mt-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {list.name}
              </h1>

              <p className="text-xs text-zinc-700 dark:text-zinc-400">
                {list.description}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
};
