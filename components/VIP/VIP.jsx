import Heading2 from "../headings/Heading2";
import styles from "../../styles/vipstyle.module.css";

const VIP = () => {
  return (
    <div className="max-w-[1296px] m-auto" id="vip">
      <div className="w-full lg:w-1/2 m-auto text-center">
        <div className={styles.vipTitle}>
          <Heading2>VIP</Heading2>
        </div>
        <p className="mt-[10px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, de do eiusmod tempor incidunt ut laboreet dolore
          magna aliqua
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <span></span>
          <div className={styles.content}>
            <h2>Exclusive</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, de do eiusmod tempor incidunt ut laboreet dolore
              magna aliqua
            </p>
            <a href="#">MINT</a>
          </div>
        </div>
        <div className={styles.box}>
          <span></span>
          <div className={styles.content}>
            <h2>DeLuxe</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, de do eiusmod tempor incidunt ut laboreet dolore
              magna aliqua
            </p>
            <a href="#">MINT</a>
          </div>
        </div>
        <div className={styles.box}>
          <span></span>
          <div className={styles.content}>
            <h2>Ultimate</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, de do eiusmod tempor incidunt ut laboreet dolore
              magna aliqua
            </p>
            <a href="#">MINT</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIP;
