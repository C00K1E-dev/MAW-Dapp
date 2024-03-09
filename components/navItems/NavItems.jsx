// NavItems.js
import Link from "next/link";

const NavItems = ({ title, url, open, setOpen, onClick }) => {
  const handleClick = () => {
    setOpen(!open); // Close the navbar menu if open
    if (typeof onClick === "function") {
      onClick(); // Call the onClick function passed from parent
    }
  };

  return (
    <li
      className="text-white text-[18px] leading-[23px] font-semibold transition duration-300 hover:text-[color:var(--color-primary)]"
      onClick={handleClick}
    >
      {/* If url is a string, render Link, otherwise just render the title */}
      {typeof url === "string" ? (
        <Link href={url}>{title}</Link>
      ) : (
        <span>{title}</span>
      )}
    </li>
  );
};

export default NavItems;
