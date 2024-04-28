import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { Link } from "react-router-dom";

const  WelcomeHome = () => {
  return (
    <div className="h-screen">
      <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col space-y-5 items-center">
          <AText size="high+2" bold>
            Bienvenue sur la page de SCF
          </AText>
          <Link to={"/authentification"}>
            <AButton type="outlined" action={null}>
              Commencer
            </AButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHome;
