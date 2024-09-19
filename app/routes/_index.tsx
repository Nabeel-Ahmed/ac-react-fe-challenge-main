import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: " React FE Challenge | Absolute Collagen" },
    { name: "description", content: "Absolute Collagen's React FE Challenge" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Absolute Collagen&apos;s React FE Challenge
          </h1>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
          </p>
          <ul>
            <li>
              <Link
                to="./task-one"
                className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
              >
                Task One - Paginating Pokémon
              </Link>
            </li>

            <li>
              <Link
                to="./task-two"
                className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
              >
                Task Two - Battery Status
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
