import { ConfigProvider, Select } from "antd";

type ISelectComponent = {
  handleChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export default function SelectComponent({
  handleChange,
  options,
}: ISelectComponent) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorBgContainer: "#191b1f",
            colorBorder: "transparent",
            colorText: "#fff",
            colorBgElevated: "#191b1f",
            optionSelectedBg: "#0e0f0f",
            colorTextPlaceholder: "#fff",
            borderRadius: 50,
          },
        },
      }}
    >
      <Select
        defaultValue="Daily"
        onChange={handleChange}
        style={{ width: 100 }}
        options={options}
      />
    </ConfigProvider>
  );
}
