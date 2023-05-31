import Link from "next/link";

const NavItems = ({ title, url, open, setOpen }) => {
  return (
    <li
      className="text-white text-[18px] leading-[23px] font-semibold transition duration-300 hover:text-[color:var(--color-primary)]"
      onClick={() => setOpen(!open)}
    >
      <Link href={url}>
        <a>{title}</a>
      </Link>
    </li>
  );
};

export default NavItems;
