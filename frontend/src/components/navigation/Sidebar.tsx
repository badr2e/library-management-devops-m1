"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="hidden sm:flex sm:flex-col w-64 bg-gray-800">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <span className="text-white text-xl font-bold">BiblioSystem</span>
        </div>
        <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
          <Link
            href="/"
            className={`${
              isActive("/")
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
          >
            <HomeIcon className="mr-3 h-6 w-6" aria-hidden="true" />
            Accueil
          </Link>

          <Link
            href="/books"
            className={`${
              isActive("/books")
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
          >
            <BookOpenIcon className="mr-3 h-6 w-6" aria-hidden="true" />
            Livres
          </Link>

          <Link
            href="/members"
            className={`${
              isActive("/members")
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
          >
            <UserGroupIcon className="mr-3 h-6 w-6" aria-hidden="true" />
            Membres
          </Link>

          <Link
            href="/loans"
            className={`${
              isActive("/loans")
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
          >
            <ClipboardDocumentListIcon
              className="mr-3 h-6 w-6"
              aria-hidden="true"
            />
            Emprunts
          </Link>
        </nav>
      </div>
    </div>
  );
}
