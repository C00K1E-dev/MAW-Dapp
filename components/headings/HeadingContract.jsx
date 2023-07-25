const headingcontract = ({ children, clr }) => {
    return (
      <h5 className={`heading-contract ${clr || "text-[color:var(--color-red)]"}`}>
        {children}
      </h5>
    );
  };
  
  export default headingcontract;
  