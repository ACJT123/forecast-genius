import { getData, postData } from "@/app/util/http";
import { Select } from "antd";
import { count } from "console";
import { useState, useEffect } from "react";

type IStatesSelect = {
  onChange: (value: string) => void;
  onClose: () => void;
  open: boolean;
  country: string;
};

type ICountry = {
  value: string;
  label: string;
};

export default function StatesSelect({
  onChange,
  onClose,
  open,
  country,
}: IStatesSelect) {
  const [stateList, setStateList] = useState<ICountry[]>([]);

  useEffect(() => {
    if (country === "") return;

    const fetch = async () => {
      const { data }: { data: { states: { name: string }[] } } = await postData(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          country: country,
        }
      );

      // transform data
      const t = data.states.map((state) => ({
        value: state.name,
        label: state.name,
      }));

      setStateList(t);
    };

    fetch();
  }, [country]);

  return (
    <Select
      showSearch
      placeholder="Select states"
      optionFilterProp="label"
      onChange={onChange}
      options={stateList}
    />
  );
}
