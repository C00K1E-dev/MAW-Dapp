import Heading5 from "../headings/Heading5";

const CountdownDisplay = (props) => {
  return (
    <div className="flex justify-center gap-2 md:gap-3">
      {["days", "hours", "minutes", "seconds"].map((item, i, arr) => (
        <div
          key={item}
          className="flex items-start justify-center gap-2 md:gap-3"
        >
          <div>
            <Heading5>{props[item]}</Heading5>
            <span>{item}</span>
          </div>
          <span
            className={`heading-5 text-[color:var(--color-primary)] ${
              arr.length - 1 === i && "hidden"
            }`}
          >
            :
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownDisplay;
