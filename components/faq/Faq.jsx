import { faqData } from "../../data/faqs";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";
import SingleFAQ from "../singleFAQ/SingleFAQ";

const Faq = () => {
  return (
    <section className="mt-[70px] md:mt-[115px] px-4 2xl:px-0" id="faq">
      <div className="max-w-[1296px] m-auto">
        <div className="w-full lg:w-1/2 m-auto text-center">
          <Heading5>Questions & Answers</Heading5>
          <Heading2>Frequently Asked Questions </Heading2>
          <p className="mt-[10px]">
          Get all your questions answered at our Q&A Corner. Whether you have burning inquiries or frequently asked questions, we've got you covered. Find the information you need and gain clarity on any topic. Don't miss out on our comprehensive Q&A resource. Explore now and get the answers you seek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5 mt-[35px] lg:mt-[55px]">
          <div className="flex flex-col gap-3 lg:gap-6">
            {faqData.map(
              (singleFaq, ind) =>
                ind % 2 === 0 && <SingleFAQ {...singleFaq} key={singleFaq.id} />
            )}
          </div>
          <div className="flex flex-col gap-3 lg:gap-6">
            {faqData.map(
              (singleFaq, ind) =>
                ind % 2 !== 0 && <SingleFAQ {...singleFaq} key={singleFaq.id} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
