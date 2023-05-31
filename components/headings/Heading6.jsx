const heading6 = ({ children, clr }) => {
  return (
    <h6 className={`heading-6 ${clr || "text-[color:var(--color-primary)]"}`}>
      {children}
    </h6>
  );
};

export default heading6;
