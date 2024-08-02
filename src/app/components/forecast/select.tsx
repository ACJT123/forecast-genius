import { ConfigProvider, Select } from "antd";

type IForecastSelect = {
  handleChange: (value: string) => void;
};

export default function ForecastSelect({ handleChange }: IForecastSelect) {
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
        options={[
          { value: "Daily", label: "Daily" },
          { value: "Hourly", label: "Hourly" },
          { value: "Minutely", label: "Minutely" },
        ]}
      />
    </ConfigProvider>
  );
}
