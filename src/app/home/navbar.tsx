"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar({ theme }: { theme: string }) {
  const { user, logout } = useAuth(); // <- tambahkan logout
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/series", label: "Series" },
    { href: "/film", label: "Film" },
    { href: "/daftar-saya", label: "Daftar Saya" },
  ];

  const dynamicClass = (base: string, openClass: string, closeClass: string) =>
    `${base} ${isOpen ? openClass : closeClass}`;

  const themeClass = theme === "dark" ? "text-neutral-400" : "text-gray-800";
  const pathName = usePathname();
  console.log(user);

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex space-x-6">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className={`font-bold text-xl ${
                  isOpen ? "text-gray-600" : themeClass
                }`}
              >
                <Image src={"/Logo.svg"} alt="logo" width={100} height={100} />
              </Link>
            </div>

            <div className="hidden sm:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={dynamicClass(
                    "px-3 py-2 rounded-full text-sm font-medium latin-font",
                    "text-gray-600 hover:text-primary",
                    `${
                      pathName === link.href
                        ? themeClass + " hover:text-white"
                        : themeClass + " hover:text-white"
                    }`
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex space-x-4">
            {user ? (
              <div className="hidden md:flex space-x-4 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="hidden sm:flex space-x-4 items-center">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {/* <span className="latin-font font-medium text-sm">
                      {session.email}
                    </span> */}
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <span
                        onClick={() => logout()}
                        className="flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Keluar
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href={"/signin"}>
                  <Button variant="link" className={themeClass}>
                    Masuk
                  </Button>
                </Link>
                <Link href={"/signup"}>
                  <Button variant="default">Daftar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              className={`p-2 rounded-md ${
                isOpen
                  ? "text-gray-600 hover:text-primary"
                  : `${themeClass} hover:text-gray-300`
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-200 px-4 py-3">
            {user ? (
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href={"/signin"}>
                  <Button variant="ghost" className="w-full text-left">
                    Masuk
                  </Button>
                </Link>
                <Link href={"/signup"}>
                  <Button variant="default" className="w-full mt-2">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
