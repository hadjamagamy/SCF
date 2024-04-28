import { AnimatePresence, motion } from "framer-motion";
// import LogoImage from "@utils/assets/image/logo/LogoImage.jpg";

const Logo = ({ collapsed, className, addClass }: any) => {
  const AnimateLogo = {
    hiddenHighLogo: {
      opacity: 0,
      transition: {
        // delay: 0.3,
        ease: "circIn",
        duration: 0.2,
        type: "spring",
        bounce: 0.2,
        // stiffness: 100,
      },
    },
    showHighLogo: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1,
        ease: "circIn",
        duration: 0.2,
        type: "spring",
        bounce: 0.2,
        // stiffness: 100,
      },
    },
    initialPositionHighLogo: {
      opacity: 0,
      x: -10,
    },

    hiddenLowLogo: {
      fontSize: "0px",
      opacity: 0,
      x: -20,
      transition: {
        // delay: 0.3,
        ease: "circIn",
        duration: 0.2,
        type: "spring",
        bounce: 0.2,
        // stiffness: 100,
      },
    },
    showLowLogo: {
      fontSize: "24px",
      transition: {
        delay: 0.2,
        ease: "circIn",
        duration: 0.2,
        type: "spring",
        bounce: 0.2,
        // stiffness: 100,
      },
    },
    initialPositionLowLogo: {
      fontSize: "0",
    },
  };
  return (
    <div>
      <motion.div className="flex items-center space-x-3">
        {/* <div className={addClass ? className : "rounded-full w-14 h-14 pt-2 "}>
          <img
            alt="logo-PDCI"
            src="https://images.unsplash.com/photo-1670584902650-747450a554ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80"
            width={100}
            height={100}
          />
        </div> */}
        <div className={addClass ? className : "rounded-full w-12 h-12 flex "}>
          {/* <img alt="logo-PDCI" src={LogoImage} width={500} height={500} /> */}
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            variants={AnimateLogo}
            animate={!collapsed ? "showLowLogo" : "hiddenLowLogo"}
            className={`text-2xl pt-2`}
          >
            SCF
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Logo;
