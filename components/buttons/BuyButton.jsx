import Link from "next/link";

const BuyButton = ({ children, hrf = "/" }) => {
  return (
    <Link href={hrf}>
      <a className="btn btn--primary">
        {children}
      </a>
    </Link>
  );
};

export default BuyButton;
