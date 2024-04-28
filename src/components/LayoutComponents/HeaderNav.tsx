import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Logo from "@components/SharedComponents/Logo/Logo";
import {
  setCollapsed,
  setMobileCollapsed,
} from "@redux/feature/slices/collapsedSlice";
import NavProfile from "./NavProfile";

// const userData = {
//   nom: "SCF",
//   image: require("/Users/magam/OneDrive/Bureau/ecf-app-web/src/SOCIETE COULIBALY FATOUMA000(2).jpg"),
// };

const HeaderNav = () => {
  const collapsed = useSelector((state: any) => state.collapsedState.collapsed);
  const dispatch = useDispatch();
  const animateToogle = {
    collapsed: {
      width: "0px",
      transition: {
        duration: 0.02,
        type: "spring",
        bounce: 0.2,
      },
    },
    noCollapsed: {
      width: "240px",
      transition: {
        duration: 0.01,
        type: "spring",
        bounce: 0.2,
      },
    },
  };
  return (
    <div
      className="py-3 pl-4 pr-8 bg-white flex items-center justify-between w-full fixed left-0 top-0 right-0 h-14 lg:h-auto  shadow"
      style={{ zIndex: 1000 }}
    >
      <motion.div
        className={`hidden  space-x-5 duration-200 lg:flex w-60 items-center justify-between `}
      >
        {/* <img alt={userData.nom} src={userData.image} width={76} height={76} /> */}

        <h1>Logo</h1>
        <div>
          <motion.button
            variants={animateToogle}
            animate={
              collapsed
                ? {
                    x: -140,
                    transition: {
                      duration: 0.2,
                      type: "spring",
                      bounce: 0,
                    },
                  }
                : "nocollapsed"
            }
            className="hidden lg:block "
            onClick={() => dispatch(setCollapsed(!collapsed))}
          >
            {collapsed === false ? (
              <MenuFoldOutlined style={{ fontSize: "20px" }} />
            ) : (
              <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
            )}
          </motion.button>
        </div>
      </motion.div>
      <button
        onClick={() => dispatch(setMobileCollapsed(!collapsed))}
        className=" lg:hidden"
      >
        <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
      </button>

      <div>
        <NavProfile />
      </div>
    </div>
  );
};

export default HeaderNav;
