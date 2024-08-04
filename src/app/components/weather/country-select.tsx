import { getData } from "@/app/util/http";
import { Select } from "antd";
import { useState, useEffect } from "react";

type ICountrySelect = {
  onChange: (value: string) => void;
  onClose: () => void;
  open: boolean;
};

type ICountry = {
  value: string;
  label: string;
};

export default function CountrySelect({
  onChange,
  onClose,
  open,
}: ICountrySelect) {
  const [countryList, setCountryList] = useState<ICountry[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data }: { data: { name: string }[] } = await getData(
        "https://countriesnow.space/api/v0.1/countries/info?returns=name"
      );

      // transform data
      const t = data.map((country) => ({
        value: country.name,
        label: country.name,
      }));

      setCountryList(t);
    };

    fetch();
  }, []);
  return (
    <Select
      showSearch
      placeholder="Select country"
      optionFilterProp="label"
      onChange={onChange}
      options={countryList}
    />
  );
}
