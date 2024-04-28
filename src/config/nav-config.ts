import { Permissions } from "./permissions";

export const navConfig: {
  permissions?: string[];
  key: string;
  label: string;
  link?: string;
  icon?: string;
  subLink?: any[];
  type?: "group";
}[] = [
    {
      permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
      label: "Accueil",
      link: "/accueil",
      icon: "home_app_logo",
      key: "accueil",
    },

    // debut mon lien Agent
    {
      permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
      label: "Agent",
      icon: "person",
      key: "agent",
      //debut sublink agent
      subLink: [
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/Employes",
          key: "employes",
          label: "Employés",
        },
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          label: "Groupes",
          link: "/accueil/groupes",
          key: "groupes",

        },
      ],
      //fin sublink agent
    },
    // Fin mon lien Agent
    // debut mon lien Activity
    {
      permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
      label: "Activités",
      icon: "timeline",
      key: "activity",
      //Debut sublink Activity
      subLink: [
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/remorquages",
          label: "Remorquages",
          key: "remorquages",
        },
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/clients",
          label: "Clients",
          key: "clients",
        },
      
      ],
      //fin sublink Activity

    },
    // Fin mon lien Activity
    // debut mon lien Parc auto
    {
      permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
      label: "Parc automobile",
      icon: "local_shipping",
      key: "parc-auto",
      //Debut sublink Parc auto
      subLink: [
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/camions",
          label: "Camions",
          key: "camions",
        },
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/vehicules",
          label: "Véhicules",
          key: "vehicules",
        },    
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/typesVehicules",
          label: "Types véhicules",
          key: "typeVehicules",
        }
      ],
      //fin sublink Parc auto

    },
    // Fin mon lien Parc auto
    // debut mon lien Finance
    {
      permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
      label: "Finance",
      icon: "payments",
      key: "finance",
      //Debut sublink finance
      subLink: [
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/salaire",
          label: "Salaire",
          key: "salaire",
        },
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/recettes",
          label: "Recettes",
          key: "recettes",
        },
        {
          permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
          link: "/accueil/depenses",
          label: "Dépenses",
          key: "depenses",
        }
      ],
      //fin sublink finance
    },
    // Fin mon lien finance

    // debut mon lien Setting
    {
      permissions: [Permissions.ADMINISTRATEUR, Permissions.SUPER_USER],
      label: "Paramètre",
      link: "/accueil/parametre",
      icon: "settings",
      key: "setting",
    },
    //Fin mon lien Setting
  ];
