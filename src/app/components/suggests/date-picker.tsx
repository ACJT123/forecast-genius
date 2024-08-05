import { DatePicker } from 'antd';
import type { DateTime } from 'luxon';
import luxonGenerateConfig from 'rc-picker/lib/generate/luxon';

const MyDatePicker = DatePicker.generatePicker<DateTime>(luxonGenerateConfig);

export default MyDatePicker;