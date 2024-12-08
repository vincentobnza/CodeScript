import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
export default function RootLayout() {
  return (
    <ThemeProvider>
      <div className="w-full bg-white dark:bg-zinc-900 relative">
     
        <Navbar />
        <main className="mt-14">
          <Outlet />
        </main>

        <Footer />

        <ScrollRestoration
          getKey={(location, matches) => {
            return location.key;
          }}
        />
      </div>
    </ThemeProvider>
  );
}
