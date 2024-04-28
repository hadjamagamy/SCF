import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { ADatePicker, ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { setSearch } from "@redux/feature/slices/search_paginate_slice";
import { Form, Switch } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const SearchRemorquage = ({ close }: any) => {
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
  //debut pour afficher la date d'aujourd'hui dans mon DatePicker date d'entrée
  let today: Date | string = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let hh = today.getHours();
  let min = today.getMinutes();
  today = dd + "-" + mm + "-" + yyyy + "à" + hh + ":" + min;
  console.log(today);
  //fin pour afficher la date d'aujourd'hui dans mon DatePicker date d'entrée

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b">
        <AText size="base+2">Recherche un remorquage</AText>

        <div className="flex items-center space-x-3 ">
          <AText>Avancée</AText>
          <Switch onChange={onChange} />
        </div>
      </div>

      <Form layout="vertical" onFinish={Validate} form={form}>
     
     {/* debut Numero bon */}
     <ATInput
          size="large"
          type="text"
          name={"numeroBon"}
          placeholder={checked ? "№ de Bon" : "№ de Bon"}
          label={checked ? "№ de bon" : ""}
        />
        {/*fin Numero bon */}

        {/* {checked ? (
          <> */}
            {/* debut input nom */}
            {/* <ATInput
              size="large"
              name={ "name"}
              type="text"
              label="Nom et prenoms"
              placeholder="Nom et prenoms du client"
            /> */}
            {/* FIN input nom */}
            
           {/* Debut Date entree et sortie */}
        {/* <ADatePicker
          initialValue={today}
          name={"dateEntree"}
          label="Date d'entrée"
          showTime
          style={{
            width: "100%",
          }}
        />

        <ADatePicker
          name={"dateSortie"}
          label="Date de sortie"
          showTime
          style={{
            width: "100%",
          }}
        /> */}
        {/*Fin Date entree et sortie */}
       
          {/* </>
        ) : null} */}


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

export default SearchRemorquage;
