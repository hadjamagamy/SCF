import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { setSearch } from "@redux/feature/slices/search_paginate_slice";
import { Form, Switch } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const SearchEmploye = ({ close }: any) => {
  const [checked, setChecked] = React.useState(false);
  const [form] = Form.useForm();
  const onChange = (checked: boolean) => {
    setChecked(checked);
  };
  const ResetAll = () => {
    form.resetFields();
    dispatch(setSearch(""));
  };
  const dispatch = useDispatch();
  const Validate = (value: any) => {
    dispatch(setSearch(value));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b">
        <AText size="base+2">Recherche un employe</AText>

        <div className="flex items-center space-x-3 ">
          <AText>Avancée</AText>
          <Switch onChange={onChange} />
        </div>
      </div>

      <Form layout="vertical" onFinish={Validate} form={form}>
     
      <ATInput size="large" type="text" name={"firstName"} label={checked? "Nom ": ""} placeholder="Entrez le nom de l'employé" />
        {checked ? (
          <>
           <ATInput size="large" type="text" name={"lastName"} label= "Prénom" placeholder="Entrez le prénom de l'employé" />
            <ATInput size="large" type="text" name={"numPiece"} label="№ de pièce" placeholder="Entrez un № de pièce" />
            
          </>
        ) : null}

        <div className="flex items-center justify-end space-x-5">
          <ATButton action={ResetAll} icon="refresh">
            Reintialiser
          </ATButton>
          <AButton htmlType="submit" icon="search">
            Rechercher
          </AButton>
        </div>
      </Form>
    </div>
  );
};

export default SearchEmploye;
