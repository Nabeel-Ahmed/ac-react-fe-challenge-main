import { Link } from "@remix-run/react";

interface PageNavButtonProps {
  text: string;
  disabled: boolean;
  to: string;
}

export default function PageNavButton({
  text,
  disabled,
  to,
}: PageNavButtonProps): React.ReactElement {
  return (
    <Link className="w-full" to={to}>
      <button
        className={`w-full rounded p-4 text-center font-bold ${
          disabled
            ? "bg-red-900  text-gray-500 cursor-not-allowed"
            : "bg-red-600"
        }`}
        disabled={disabled}
      >
        {text}
      </button>
    </Link>
  );
}
