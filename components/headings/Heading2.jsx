const Heading2 = ({ children, clr }) => {
  return <h2 className={`heading-2 ${clr || "text-white"}`}>{children}</h2>;
};

export default Heading2;