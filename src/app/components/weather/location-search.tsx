import { getData, postData } from "@/app/util/http";
import { Input, Modal, Select } from "antd";
import { count } from "console";
import { useEffect, useState } from "react";
import useSWR from "swr";
import CountrySelect from "./country-select";
import CitySelect from "./city-select";
import StatesSelect from "./states-select";

type ILocationSearch = {
  onClose: () => void;
  concat: (value: string[]) => void;
  open: boolean;
};

export default function LocationSearch({
  onClose,
  concat,
  open,
}: ILocationSearch) {
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");

  return (
    <Modal mask centered open={open} onCancel={onClose} footer={null}>
      <CountrySelect
        onChange={(value: string) => {
          setCountry(value);
        }}
        onClose={onClose}
        open={open}
      />

      <StatesSelect
        onChange={(value: string) => {
          setState(value);
        }}
        onClose={onClose}
        open={open}
        country={country}
      />

      <CitySelect
        onChange={(value: string) => {
          setCity(value);
        }}
        onClose={onClose}
        open={open}
        country={country}
        state={state}
      />

      <div className="flex gap-4">
        <button onClick={onClose}>Close</button>
        <button
          onClick={() => {
            // console.log(city, state, country);
            concat([city, state, country]);
          }}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
