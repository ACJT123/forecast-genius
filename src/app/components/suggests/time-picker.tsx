import * as React from "react";
import type { DateTime } from "luxon";

import { PickerTimeProps } from "antd/es/time-picker";
import DatePicker from "./date-picker";
import { ConfigProvider } from "antd";

export interface TimePickerProps
  extends Omit<PickerTimeProps<DateTime>, "picker"> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => (
  <ConfigProvider
    theme={{
      components: {
        DatePicker: {
          hoverBg: "none",
          activeBg: "none",
        },
      },
    }}
  >
    <DatePicker
      variant="borderless"
      {...props}
      picker="time"
      mode={undefined}
      ref={ref}
    />
  </ConfigProvider>
));

TimePicker.displayName = "TimePicker";

export default TimePicker;
