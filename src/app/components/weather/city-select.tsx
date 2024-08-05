import { getData, postData } from "@/app/util/http";
import { Select } from "antd";
import { useState, useEffect } from "react";

type ICitySelect = {
  onChange: (value: string) => void;
  onClose: () => void;
  open: boolean;
  country: string;
  state: string;
};

type ICity = {
  value: string;
  label: string;
};

export default function CitySelect({
  onChange,
  onClose,
  open,
  country,
  state,
}: ICitySelect) {
  const [cityList, setCityList] = useState<ICity[]>([]);

  useEffect(() => {
    if (country === "" || state === "") return;

    const fetch = async () => {
      const { data } = await postData(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: country,
          state: state,
        }
      );

      // transform data
      const t = data.map((city: string) => ({
        value: city,
        label: city,
      }));

      setCityList(t);
    };

    fetch();
  }, [country, state]);

  return (
    <Select
      showSearch
      placeholder="Select city"
      optionFilterProp="label"
      onChange={onChange}
      options={cityList}
    />
  );
}
