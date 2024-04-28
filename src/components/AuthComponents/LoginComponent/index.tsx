import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import {
  ATInput,
  APInput,
} from "@components/SharedComponents/AtomicComponents/Input";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";

// const userData = {
//   nom: "SCF",
//   image: require("/Users/magam/Bureau/ecf-app-web/src/SOCIETE COULIBALY FATOUMA000(2).jpg"),
// };

function LoginComponent() {
  let loading = false;

  const navigate = useNavigate();
  const Validate = async (formData: any) => {
    try {
      loading = true;
      //   const user = await login({
      //     username: formData.username,
      //     password: formData.password,
      //   }).unwrap();
      //   dispatch(setUserInfo(user));
      localStorage.setItem("connected", "true");
      navigate(`${"/accueil"}`);
    } catch (err) {}
  };

  return (
    <section>
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-no-repeat bg-cover lg:block lg:w-3/5 bg-[url('https://images.unsplash.com/photo-1671022831337-583f38782bd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80')]">
          <div
            style={{ background: "rgba(22,32,26,0.7)" }}
            className=" bg-cover flex justify-center min-h-screen"
          >
            <div className="w-1/2 hidden  lg:block space-y-10 my-40">
              <AText size="high+3" bold>
                <span className="text-white">
                  SCF, VOTRE PLATEFORME POUR LA GESTION DE VOTRE ACTIVITÉ DE
                  REMORQUAGE.
                </span>
              </AText>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <div className=" flex items-center px-7 flex-col space-y-10">
              {/* <img
                alt="logo-PDCI"
                src="https://images.unsplash.com/photo-1670584902650-747450a554ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80"
                width={100}
                height={100}
              /> */}
              {/* <img
                alt={userData.nom}
                src={userData.image}
                width={76}
                height={76}
              /> */}

              <AText center size="base+2" bold>
                Connectez-vous à votre espace
              </AText>
              <Form
                layout="vertical"
                onFinish={Validate}
                className="w-full space-y-8 pt-5"
              >
                <ATInput
                  type="text"
                  label="Adresse mail ou nom d'utilisateur"
                  name="username"
                  rules={[
                    { required: true, message: "Veuillez entrer votre email" },
                  ]}
                />

                <APInput
                  label="Mot de passe"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer votre mot de passe",
                    },
                  ]}
                />
                <div className="space-y-5">
                  <AButton
                    loading={loading}
                    className="w-full justify-center"
                    action={null}
                    type="primary"
                    htmlType="submit"
                  >
                    Se connecter
                  </AButton>

                  {/* </Link> */}
                </div>
              </Form>

              <div className="flex-col space-y-3 items-center text-center">
                <AText>Copyright © 2022 SCF Inc. All rights reserved.</AText>
                <span className="flex items-center space-x-3 ">
                  <Link to="/conditions-generales-de-services">
                    Conditions générales de services
                  </Link>
                  <span>|</span>
                  <Link to="/politique-de-confidentialite">
                    Politique de confidentialité
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginComponent;
