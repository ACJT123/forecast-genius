import { getData, postData } from "@/app/util/http";
import { ConfigProvider, Input, Modal, Select } from "antd";
import { count } from "console";
import { useEffect, useState } from "react";
import useSWR from "swr";
import CountrySelect from "./country-select";
import CitySelect from "./city-select";
import StatesSelect from "./states-select";
import { CloseOutlined } from "@ant-design/icons";

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
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#191b1f",
            colorBgMask: "rgba(0, 0, 0, 0.8)",
          },
        },
      }}
    >
      <Modal
        mask
        centered
        open={open}
        onCancel={onClose}
        footer={null}
        maskClosable={false}
        className="location-search"
        closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
      >
        <div className="text-white text-lg">Search for your Location</div>

        <div className="flex flex-col gap-4 mt-8">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  selectorBg: "rgba(255, 255, 255, 0.1)",
                  colorBorder: "transparent",
                  colorText: "#fff",
                  colorBgElevated: "#303236",
                  optionSelectedBg: "#0e0f0f",
                  colorTextPlaceholder: "#fff",
                },
              },
            }}
          >
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
          </ConfigProvider>

          <div className="flex gap-4 w-fit ml-auto">
            <button
              onClick={() => {
                // console.log(city, state, country);
                concat([city, state, country]);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
