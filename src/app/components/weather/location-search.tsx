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
    <Modal
      mask
      centered
      open={open}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
      className="location-search"
    >
      <div className="flex flex-col gap-4 mt-8">
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

        <div className="flex gap-4 w-fit ml-auto">
          <button onClick={onClose}>Close</button>
          <button
            onClick={() => {
              // console.log(city, state, country);
              concat([city, state, country]);
            }}
            className="bg-blue-500 te+t-white px-4 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
