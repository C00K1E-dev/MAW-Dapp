const heading5 = ({ children, clr }) => {
  return (
    <h5 className={`heading-5 ${clr || "text-[color:var(--color-primary)]"}`}>
      {children}
    </h5>
  );
};

export default heading5;
