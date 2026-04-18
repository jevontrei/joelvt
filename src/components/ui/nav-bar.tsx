import Link from "next/link";
import { Button } from "./button";
import { BookOpen, Camera, Clapperboard, House } from "lucide-react";

// default export
export default function NavBar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <House />,
    },
    // {
    //   name: "Login",
    //   link: "/auth/login",
    // },
    // {
    //   name: "Register",
    //   link: "/auth/register",
    // },
    // {
    //   name: "Profile",
    //   link: "/profile",
    // },
    {
      name: "Movies",
      link: "/movies",
      icon: <Clapperboard />,
    },
    {
      name: "Photos",
      link: "/photos",
      icon: <Camera />,
    },
    {
      name: "Reading",
      link: "/reading",
      icon: <BookOpen />,
    },
    // {
    //   name: "Music",
    //   link: "/music",
    // },
    // {
    //   name: "Blog",
    //   link: "/blog",
    // },
    // {
    //   name: "Up",
    //   link: "/up",
    // },
  ];

  return (
    <div className="my-6 mx-4 flex justify-center-safe flex-wrap">
      {navItems.map((navItem, i) => {
        return (
          <Link key={i} href={navItem.link}>
            <Button className="m-1 bg-white text-black border border-black">
              {navItem.icon}
              {navItem.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
