import type { ComponentData } from '../types';

export const COMPONENTS_DATA: ComponentData[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Actions',
    description: 'Luma UI button allowing users to trigger primary and secondary actions across 5 visual modes (filled, elevated, outlined, text, tonal).',
    guidelines: 'Use Filled Button for the most prominent screen action (Primary Action). Tonal and Elevated for medium emphasis. Outlined and Text Button for secondary actions.',
    anatomy: ['1. Full Pill Container', '2. Leading Icon (Optional)', '3. Label Text (Roboto Medium)', '4. State Layer (Hover/Ripple/Pressed)'],
    specs: {
      height: '40dp',
      corner: '20dp (Full Pill)',
      elevation: 'Filled: Level 0 / Elevated: Level 1 / Pressed: Level 2',
      containerColor: 'Filled: md.sys.color.primary, Tonal: md.sys.color.secondary-container',
    },
    props: [
      { name: 'label', type: 'string', required: true, description: 'Text label displayed on the button.' },
      { name: 'mode', type: "'filled' | 'elevated' | 'outlined' | 'text' | 'tonal'", defaultValue: "'filled'", description: 'Visual style mode following Luma UI standards.' },
      { name: 'onPress', type: '() => void', required: true, description: 'Callback triggered when the button is pressed.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction and dims the button.' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Displays an activity spinner in place of the label.' },
      { name: 'icon', type: 'React.ReactNode', description: 'Icon displayed to the left of the label.' },
      { name: 'style', type: 'StyleProp<ViewStyle>', description: 'Custom styles for the button container.' },
    ],
    codeExample: `import { Button } from 'react-native-luma-ui';

<Button label="Filled Button" mode="filled" onPress={() => console.log('Filled')} />
<Button label="Elevated Button" mode="elevated" onPress={() => console.log('Elevated')} />
<Button label="Outlined Button" mode="outlined" onPress={() => console.log('Outlined')} />
<Button label="Text Button" mode="text" onPress={() => console.log('Text')} />
<Button label="Tonal Button" mode="tonal" onPress={() => console.log('Tonal')} />`,
  },
  {
    id: 'bottom-sheet',
    name: 'BottomSheet',
    category: 'Containment',
    description: 'Sliding bottom sheet featuring fluid drag gestures, status bar edge bleed, and modal backdrop scrim.',
    guidelines: 'Use BottomSheet to display supplementary content or contextual options without losing current screen state.',
    anatomy: ['1. Drag Handle', '2. Top Header (Title & close button)', '3. Content Container (Top-rounded 28dp)', '4. Modal Scrim (Full-screen dark backdrop)'],
    specs: {
      height: 'Customizable (defaults to 50% or pixel height)',
      corner: 'Top-Left & Top-Right: 28dp',
      elevation: 'Level 1 (modal sheet)',
      containerColor: 'md.sys.color.surface-container-low',
    },
    props: [
      { name: 'visible', type: 'boolean', required: true, description: 'Visibility state of the BottomSheet.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Callback invoked on dismissal (swipe down or scrim tap).' },
      { name: 'title', type: 'string', description: 'Header title displayed at the top of the sheet.' },
      { name: 'height', type: 'number | string', defaultValue: "'50%'", description: 'Desired height of the BottomSheet.' },
      { name: 'closeOnDragDown', type: 'boolean', defaultValue: 'true', description: 'Enables swipe-down gesture to dismiss.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Child content rendered inside the sheet.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { BottomSheet, Button, Text } from 'react-native-luma-ui';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open Bottom Sheet" onPress={() => setOpen(true)} />
      <BottomSheet
        visible={open}
        onClose={() => setOpen(false)}
        title="Action Options"
        height={320}
        closeOnDragDown
      >
        <Text>Detailed content inside BottomSheet.</Text>
      </BottomSheet>
    </>
  );
}`,
  },
  {
    id: 'date-time-picker',
    name: 'DateTimePicker',
    category: 'Selection',
    description: 'Bộ chọn ngày, giờ và kết hợp ngày giờ Luma UI với giao diện trực quan, hỗ trợ chế độ 12h/24h và giới hạn ngày.',
    guidelines: 'Sử dụng DatePicker để chọn ngày sinh, lịch hẹn. Sử dụng TimePicker cho mốc thời gian giờ phút rõ ràng.',
    anatomy: ['1. Header hiển thị ngày/giờ đã chọn', '2. Grid chọn ngày theo tháng', '3. Vòng chọn giờ/phút hoặc cột số', '4. Action Buttons (Hủy / Confirm)'],
    specs: {
      height: 'Tự động theo chế độ hiển thị',
      corner: '28dp',
      elevation: 'Level 3',
      containerColor: 'md.sys.color.surface-container-high',
    },
    props: [
      { name: 'value', type: 'Date', required: true, description: 'Thời gian hiện tại đang được chọn.' },
      { name: 'onChange', type: '(date: Date) => void', required: true, description: 'Callback khi người dùng chọn ngày/giờ mới.' },
      { name: 'mode', type: "'date' | 'time' | 'datetime'", defaultValue: "'date'", description: 'Chế độ chọn: chỉ ngày, chỉ giờ, hoặc cả hai.' },
      { name: 'is24Hour', type: 'boolean', defaultValue: 'false', description: 'Hiển thị định dạng 24 giờ thay vì AM/PM.' },
      { name: 'minimumDate', type: 'Date', description: 'Mốc ngày nhỏ nhất cho phép chọn.' },
      { name: 'maximumDate', type: 'Date', description: 'Mốc ngày lớn nhất cho phép chọn.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { DateTimePicker } from 'react-native-luma-ui';

export function Example() {
  const [date, setDate] = useState(new Date());

  return (
    <DateTimePicker
      value={date}
      onChange={setDate}
      mode="datetime"
      is24Hour={true}
    />
  );
}`,
  },
  {
    id: 'scaffold',
    name: 'Scaffold',
    category: 'Layout',
    description: 'Khung cấu trúc màn hình nền tảng hỗ trợ tràn viền Edge-to-Edge, tự động quản lý Status Bar và Safe Area.',
    guidelines: 'Mỗi màn hình chuẩn nên được bọc bởi Scaffold để đảm bảo thống nhất về màu nền, thanh tiêu đề và khoảng đệm hệ điều hành.',
    anatomy: ['1. App Bar Slot (Đỉnh màn hình)', '2. Content Slot (Khu vực cuộn/chính)', '3. Bottom Bar Slot (Điều hướng đáy)', '4. Floating Action Button Slot'],
    specs: {
      height: '100% màn hình',
      corner: '0dp',
      elevation: 'Level 0',
      containerColor: 'md.sys.color.surface (#FEF7FF hoặc #E6E1E5)',
    },
    props: [
      { name: 'appBar', type: 'React.ReactNode', description: 'Thanh điều hướng đỉnh màn hình (AppBar).' },
      { name: 'bottomBar', type: 'React.ReactNode', description: 'Thanh điều hướng chân trang (NavigationBar).' },
      { name: 'floatingActionButton', type: 'React.ReactNode', description: 'Nút hành động nổi FAB.' },
      { name: 'backgroundColor', type: 'string', description: 'Màu nền tùy chỉnh cho toàn màn hình.' },
      { name: 'safeAreaTop', type: 'boolean', defaultValue: 'true', description: 'Áp dụng đệm an toàn tai thỏ/status bar.' },
      { name: 'safeAreaBottom', type: 'boolean', defaultValue: 'true', description: 'Áp dụng đệm an toàn thanh vuốt đáy.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Nội dung hiển thị chính.' },
    ],
    codeExample: `import { Scaffold, AppBar, Text, Button } from 'react-native-luma-ui';

<Scaffold
  appBar={<AppBar title="Home" showBack={false} />}
  bottomBar={/* NavigationBar */}
>
  <Text>Nội dung màn hình của bạn ở đây.</Text>
</Scaffold>`,
  },
  {
    id: 'app-bar',
    name: 'AppBar',
    category: 'Navigation',
    description: 'Thanh tiêu đề đỉnh màn hình chuẩn Luma UI với nút quay lại, tiêu đề phụ và hỗ trợ tràn lên status bar mượt mà.',
    guidelines: 'Cung cấp định hướng vị trí hiện tại trong ứng dụng và các nút truy cập nhanh như tìm kiếm, chia sẻ, tùy chọn.',
    anatomy: ['1. Navigation Icon (Back / Menu)', '2. Headline & Subtitle Text', '3. Action Icons Slot (Bên phải)'],
    specs: {
      height: '64dp',
      corner: '0dp',
      elevation: 'Level 0 hoặc Level 2 khi cuộn',
      containerColor: 'md.sys.color.surface',
    },
    props: [
      { name: 'title', type: 'string', required: true, description: 'Tiêu đề chính hiển thị trên AppBar.' },
      { name: 'subtitle', type: 'string', description: 'Dòng phụ đề nhỏ bên dưới tiêu đề chính.' },
      { name: 'showBack', type: 'boolean', defaultValue: 'false', description: 'Hiển thị nút mũi tên quay lại bên trái.' },
      { name: 'onBack', type: '() => void', description: 'Callback khi người dùng nhấn nút quay lại.' },
      { name: 'rightActions', type: 'React.ReactNode', description: 'Các nút biểu tượng thao tác đặt phía bên phải.' },
      { name: 'centerTitle', type: 'boolean', defaultValue: 'false', description: 'Căn giữa tiêu đề chính.' },
      { name: 'safeAreaTop', type: 'boolean', defaultValue: 'true', description: 'Tự động tính đệm tràn lên status bar.' },
    ],
    codeExample: `import { AppBar, IconButton } from 'react-native-luma-ui';

<AppBar
  title="Details đơn hàng"
  subtitle="Mã: #LM-98214"
  showBack
  onBack={() => navigation.goBack()}
  rightActions={
    <IconButton icon="share-outline" onPress={() => {}} />
  }
/>`,
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'Selection',
    description: 'Thanh trượt điều chỉnh giá trị liên tục hoặc theo nấc (step) với bóng giá trị trực quan khi kéo.',
    guidelines: 'Thích hợp cho việc điều chỉnh âm lượng, độ sáng, khoảng giá hoặc kích thước font chữ.',
    anatomy: ['1. Active Track (Selected range)', '2. Inactive Track (Remaining range)', '3. Thumb Handle (Circular draggable knob)', '4. Value Bubble (Bong bóng hiển thị số)'],
    specs: {
      height: '44dp (vùng chạm cảm ứng)',
      corner: 'Track: 8dp, Thumb: 10dp',
      elevation: 'Thumb: Level 1',
      containerColor: 'Active: md.sys.color.primary, Inactive: md.sys.color.surface-variant',
    },
    props: [
      { name: 'value', type: 'number', required: true, description: 'Giá trị hiện tại của slider.' },
      { name: 'onValueChange', type: '(val: number) => void', required: true, description: 'Hàm xử lý khi giá trị thay đổi.' },
      { name: 'minimumValue', type: 'number', defaultValue: '0', description: 'Minimum allowable slider value.' },
      { name: 'maximumValue', type: 'number', defaultValue: '100', description: 'Maximum allowable slider value.' },
      { name: 'step', type: 'number', defaultValue: '1', description: 'Bước nhảy giữa các giá trị.' },
      { name: 'showValueBubble', type: 'boolean', defaultValue: 'true', description: 'Hiện bong bóng số nổi lên khi người dùng đang kéo.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables the slider.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { Slider } from 'react-native-luma-ui';

export function Example() {
  const [val, setVal] = useState(40);

  return (
    <Slider
      value={val}
      onValueChange={setVal}
      minimumValue={0}
      maximumValue={100}
      step={5}
      showValueBubble
    />
  );
}`,
  },
  {
    id: 'snackbar',
    name: 'Snackbar',
    category: 'Communication',
    description: 'Thanh thông báo ngắn gọn xuất hiện ở chân màn hình, có nút hành động (như Hoàn tác) và tự động ẩn.',
    guidelines: 'Chỉ hiển thị một snackbar tại một thời điểm. Dùng cho thông báo thành công hoặc cảnh báo ngắn không chặn thao tác.',
    anatomy: ['1. Single-line / Multi-line Text', '2. Action Button (Màu tương phản nổi bật)', '3. Dismiss Icon (Tùy chọn)'],
    specs: {
      height: '48dp (1 dòng) đến 68dp (2 dòng)',
      corner: '4dp',
      elevation: 'Level 3',
      containerColor: 'md.sys.color.inverse-surface',
    },
    props: [
      { name: 'visible', type: 'boolean', required: true, description: 'Trạng thái hiển thị thông báo.' },
      { name: 'onDismiss', type: '() => void', required: true, description: 'Callback khi thông báo hết hạn hoặc đóng.' },
      { name: 'duration', type: 'number', defaultValue: '4000', description: 'Thời gian tự động ẩn (mili giây).' },
      { name: 'action', type: '{ label: string; onPress: () => void }', description: 'Cấu hình nút hành động trên thông báo.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Nội dung dòng chữ thông báo.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { Snackbar, Button } from 'react-native-luma-ui';

export function Example() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button label="Gửi tin nhắn" onPress={() => setShow(true)} />
      <Snackbar
        visible={show}
        onDismiss={() => setShow(false)}
        duration={3000}
        action={{ label: 'UNDO', onPress: () => {} }}
      >
        Tin nhắn đã được gửi đi thành công.
      </Snackbar>
    </>
  );
}`,
  },
  {
    id: 'text-field',
    name: 'TextField',
    category: 'Text Inputs',
    description: 'Ô nhập liệu văn bản chuẩn Luma UI với nhãn nổi động, biểu tượng đầu/cuối và hỗ trợ báo lỗi trực quan.',
    guidelines: 'Cung cấp nhãn gợi ý rõ ràng. Hiển thị thông báo lỗi ngay dưới ô nhập khi dữ liệu không hợp lệ.',
    anatomy: ['1. Floating Label Text', '2. Input Field Text', '3. Leading / Trailing Icons', '4. Helper / Error Text'],
    specs: {
      height: '56dp',
      corner: 'Filled: 4dp top-corners / Outlined: 8dp',
      elevation: 'Level 0',
      containerColor: 'md.sys.color.surface-container-highest',
    },
    props: [
      { name: 'label', type: 'string', required: true, description: 'Nhãn mô tả trường nhập liệu.' },
      { name: 'value', type: 'string', required: true, description: 'Giá trị chuỗi nhập.' },
      { name: 'onChangeText', type: '(text: string) => void', required: true, description: 'Callback khi thay đổi văn bản.' },
      { name: 'placeholder', type: 'string', description: 'Chữ mờ hướng dẫn bên trong ô.' },
      { name: 'error', type: 'string', description: 'Notifications lỗi hiển thị viền đỏ dưới ô.' },
      { name: 'helperText', type: 'string', description: 'Dòng ghi chú hướng dẫn thêm bên dưới.' },
      { name: 'secureTextEntry', type: 'boolean', defaultValue: 'false', description: 'Ẩn ký tự cho mật khẩu.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { TextField } from 'react-native-luma-ui';

export function Example() {
  const [email, setEmail] = useState('');

  return (
    <TextField
      label="Địa chỉ Email"
      value={email}
      onChangeText={setEmail}
      placeholder="name@example.com"
      helperText="Chúng tôi không chia sẻ email của bạn."
    />
  );
}`,
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Containment',
    description: 'Thẻ chứa thông tin Luma UI với 3 phong cách (Elevated, Filled, Outlined), hỗ trợ tiêu đề, trạng thái, mức độ ưu tiên và footer.',
    guidelines: 'Sử dụng Thẻ để nhóm các thông tin liên quan và hành động theo một chủ đề duy nhất.',
    anatomy: ['1. Container bo góc 12dp - 16dp', '2. Title & Priority Header', '3. Body Text & Custom Content Slot', '4. Footer Action Slot'],
    specs: {
      height: 'Tự động co giãn theo nội dung',
      corner: '12dp - 16dp',
      elevation: 'Elevated: Level 1 / Outlined: Level 0 / Filled: Level 0',
      containerColor: 'md.sys.color.surface-container-low',
    },
    props: [
      { name: 'title', type: 'string', description: 'Tiêu đề chính của Card.' },
      { name: 'content', type: 'string', description: 'Nội dung văn bản bên trong.' },
      { name: 'subContent', type: 'string', description: 'Văn bản phụ bổ sung.' },
      { name: 'priority', type: 'string', description: 'Priority level badge (e.g., High, Medium).' },
      { name: 'priorityColor', type: 'string', description: 'Color for the priority badge.' },
      { name: 'status', type: 'string', description: 'Status label (e.g., In Progress, Completed).' },
      { name: 'statusColor', type: 'string', description: 'Color for the status badge.' },
      { name: 'footer', type: 'React.ReactNode', description: 'Card footer area holding action buttons.' },
      { name: 'leftLine', type: 'string', description: 'Accent highlight border line on the left edge.' },
      { name: 'onPress', type: '() => void', description: 'Callback triggered when pressing anywhere on the card.' },
      { name: 'children', type: 'React.ReactNode', description: 'Custom child content rendered inside the card.' },
    ],
    codeExample: `import { Card, Text, Button } from 'react-native-luma-ui';

<Card
  title="Báo cáo tiến độ dự án"
  content="Hệ thống đã hoàn thiện 85% các hạng mục giao diện và tích hợp API."
  priority="Ưu tiên cao"
  priorityColor="#B3261E"
  status="Đang thực hiện"
  footer={
    <Button label="Xem chi tiết" mode="tonal" onPress={() => {}} />
  }
/>`,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Selection',
    description: 'Hộp kiểm Luma UI hỗ trợ trạng thái chọn (checked), bỏ chọn (unchecked) và bán chọn (indeterminate), dạng tròn hoặc vuông.',
    guidelines: 'Sử dụng Checkbox khi người dùng có thể chọn một hoặc nhiều mục trong danh sách hoặc đồng ý các điều khoản.',
    anatomy: ['1. Box Container (Square 4dp or circular)', '2. Checkmark / Minus Icon', '3. Label Text & Description', '4. State Layer (Ripple/Hover)'],
    specs: {
      height: '40dp (vùng chạm cảm ứng)',
      corner: '4dp (square) hoặc 9999dp (circle)',
      elevation: 'Level 0',
      containerColor: 'md.sys.color.primary (checked) / Transparent (unchecked)',
    },
    props: [
      { name: 'checked', type: 'boolean', description: 'Checked state of the checkbox.' },
      { name: 'status', type: "'checked' | 'unchecked' | 'indeterminate'", description: 'Trạng thái rõ ràng 3 nấc chuẩn Luma UI.' },
      { name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: 'Trạng thái bán chọn (gạch ngang).' },
      { name: 'onValueChange', type: '(checked: boolean) => void', description: 'Callback invoked when selection changes.' },
      { name: 'label', type: 'React.ReactNode', description: 'Text label displayed beside the checkbox.' },
      { name: 'description', type: 'React.ReactNode', description: 'Secondary helper text below the label.' },
      { name: 'shape', type: "'square' | 'circle'", defaultValue: "'square'", description: 'Hình dạng hộp kiểm: vuông bo góc hoặc tròn.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables checkbox interaction.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { Checkbox } from 'react-native-luma-ui';

export function Example() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Checkbox
      checked={agreed}
      onValueChange={setAgreed}
      label="Tôi đồng ý với điều khoản dịch vụ"
      description="Nhận thông báo cập nhật qua email mỗi tuần."
    />
  );
}`,
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Selection',
    description: 'Công tắc bật/tắt (Toggle) Luma UI với track viền viên thuốc, nút trượt thumb tròn và animation mượt mà.',
    guidelines: 'Dùng Switch để bật/tắt tức thì các tính năng, cài đặt độc lập mà không cần bấm nút Lưu phụ.',
    anatomy: ['1. Track Container (52dp length, 32dp height)', '2. Sliding Thumb (24dp - 28dp diameter)', '3. State Layer & Track Border', '4. Label & Description'],
    specs: {
      height: '32dp (track) / 48dp (touch target)',
      corner: '16dp (Full Pill)',
      elevation: 'Thumb: Level 1 (khi bật)',
      containerColor: 'Track: md.sys.color.primary (bật) / md.sys.color.surface-container-highest (tắt)',
    },
    props: [
      { name: 'value', type: 'boolean', required: true, description: 'Active boolean state: on (true) or off (false).' },
      { name: 'onValueChange', type: '(value: boolean) => void', required: true, description: 'Callback triggered when switch is toggled.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables switch interaction.' },
      { name: 'color', type: 'string', description: 'Primary thumb color when activated.' },
      { name: 'label', type: 'React.ReactNode', description: 'Label text displayed alongside the switch.' },
      { name: 'description', type: 'React.ReactNode', description: 'Detailed explanatory text beneath the label.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { Switch } from 'react-native-luma-ui';

export function Example() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch
      value={enabled}
      onValueChange={setEnabled}
      label="Push Notifications"
      description="Cho phép nhận thông báo quan trọng khi có tin tức mới."
    />
  );
}`,
  },
  {
    id: 'chip',
    name: 'Chip',
    category: 'Actions',
    description: 'Thẻ nhãn tương tác nhỏ gọn chuẩn Luma UI với các kiểu: Filter, Assist, Input, Suggestion, hỗ trợ chọn và nút xóa.',
    guidelines: 'Use Filter Chips to filter catalogs, Assist Chips to trigger quick actions, and Input Chips to represent tags.',
    anatomy: ['1. Chip Container (32dp height)', '2. Leading Icon / Checkmark', '3. Label Text', '4. Trailing Remove Button'],
    specs: {
      height: '32dp',
      corner: '8dp',
      elevation: 'Level 0 (Flat) hoặc Level 1 (Elevated)',
      containerColor: 'Filter (selected): md.sys.color.secondary-container',
    },
    props: [
      { name: 'label', type: 'string', required: true, description: 'Text label displayed inside the Chip.' },
      { name: 'variant', type: "'assist' | 'filter' | 'input' | 'suggestion'", defaultValue: "'assist'", description: 'Biến thể loại chip theo chuẩn Luma UI.' },
      { name: 'selected', type: 'boolean', defaultValue: 'false', description: 'Selected state (applicable to filter chips).' },
      { name: 'elevated', type: 'boolean', defaultValue: 'false', description: 'Renders elevated drop shadow.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables chip interaction.' },
      { name: 'onPress', type: '() => void', description: 'Callback triggered when chip is pressed.' },
      { name: 'onClose', type: '() => void', description: 'Callback triggered when close/delete icon is pressed.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { Chip } from 'react-native-luma-ui';

export function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip
        label="React Native"
        variant="filter"
        selected={selected}
        onPress={() => setSelected(!selected)}
      />
      <Chip label="Tải xuống" variant="assist" onPress={() => {}} />
    </div>
  );
}`,
  },
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'Containment',
    description: 'Hộp thoại thông báo và xác nhận Luma UI hiển thị đè toàn màn hình với góc bo tròn 28dp và khu vực nút thao tác.',
    guidelines: 'Dùng Dialog cho các thông báo quan trọng đòi hỏi quyết định ngay lập tức của người dùng.',
    anatomy: ['1. Modal Scrim (Dark backdrop)', '2. Dialog Container (28dp corner radius)', '3. Title & Content Area', '4. Action Buttons (Hủy / Đồng ý)'],
    specs: {
      height: 'Tự động co giãn theo nội dung',
      corner: '28dp',
      elevation: 'Level 3',
      containerColor: 'md.sys.color.surface-container-high',
    },
    props: [
      { name: 'visible', type: 'boolean', required: true, description: 'Visibility state of the Dialog.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Callback triggered when dialog is dismissed.' },
      { name: 'title', type: 'string', description: 'Title heading of the dialog.' },
      { name: 'children', type: 'React.ReactNode', description: 'Detailed message or child components inside.' },
      { name: 'footer', type: 'React.ReactNode', description: 'Footer action buttons row (Cancel, Confirm).' },
      { name: 'dismissable', type: 'boolean', defaultValue: 'true', description: 'Allows tapping outside backdrop to dismiss.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { Dialog, Button, Text } from 'react-native-luma-ui';

export function Example() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button label="Mở hộp thoại" onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="Confirm xóa tài khoản?"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button label="Cancel" mode="text" onPress={() => setVisible(false)} />
            <Button label="Confirm" mode="filled" onPress={() => setVisible(false)} />
          </div>
        }
      >
        <Text>Hành động này không thể hoàn tác. Mọi dữ liệu của bạn sẽ bị xóa vĩnh viễn.</Text>
      </Dialog>
    </>
  );
}`,
  },
  {
    id: 'badges',
    name: 'Badges',
    category: 'Communication',
    description: 'Notification badge displaying count numbers or compact dot indicator, automatically anchored to icons or avatars.',
    guidelines: 'Use Badges to signal unread messages, new alerts, or shopping cart item counts.',
    anatomy: ['1. Anchor Component (Icon, Avatar)', '2. Badge Capsule / Dot', '3. Count Text (if count provided)'],
    specs: {
      height: 'Dot: 8dp / Large (with count): 16dp',
      corner: 'Full Pill (8dp)',
      elevation: 'Level 0',
      containerColor: 'md.sys.color.error (#B3261E)',
    },
    props: [
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Thành phần gốc được gắn huy hiệu (Icon/Avatar/Button).' },
      { name: 'count', type: 'number', description: 'Count value to display (e.g., 5, 99+).' },
      { name: 'maxCount', type: 'number', defaultValue: '99', description: 'Mức số tối đa trước khi hiển thị dấu cộng.' },
      { name: 'dot', type: 'boolean', defaultValue: 'false', description: 'Chỉ hiển thị chấm đỏ nhỏ, không kèm số.' },
      { name: 'visible', type: 'boolean', defaultValue: 'true', description: 'Visibility state of the badge.' },
      { name: 'color', type: 'string', description: 'Badge background color (defaults to Luma UI error red).' },
    ],
    codeExample: `import { Badges, IconButton } from 'react-native-luma-ui';

<Badges count={5}>
  <IconButton icon="bell-outline" onPress={() => {}} />
</Badges>

<Badges dot>
  <IconButton icon="email-outline" onPress={() => {}} />
</Badges>`,
  },
  {
    id: 'navigation-bar',
    name: 'NavigationBar',
    category: 'Navigation',
    description: 'Thanh điều hướng chân trang (Bottom Navigation) chuẩn Luma UI với hiệu ứng viên thuốc (Pill Indicator) di chuyển mượt mà.',
    guidelines: 'Use NavigationBar for 3 to 5 top-level destinations across your application.',
    anatomy: ['1. Bar Container (80dp height)', '2. Active Pill Indicator (64x32dp)', '3. Navigation Icon & Label', '4. Badge Slot'],
    specs: {
      height: '80dp (kèm Safe Area)',
      corner: 'Indicator: 16dp (Pill)',
      elevation: 'Level 2',
      containerColor: 'md.sys.color.surface-container',
    },
    props: [
      { name: 'selectedIndex', type: 'number', description: 'Current selected tab index (0-indexed).' },
      { name: 'onSelect', type: '(index: number) => void', description: 'Callback triggered when user selects a tab.' },
      { name: 'activeColor', type: 'string', description: 'Icon color for the active selected tab.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Danh sách các NavigationItem con.' },
    ],
    codeExample: `import { NavigationBar, NavigationItem } from 'react-native-luma-ui';

<NavigationBar selectedIndex={0} onSelect={(i) => console.log(i)}>
  <NavigationItem label="Home" icon="home-outline" />
  <NavigationItem label="Search" icon="magnify" />
  <NavigationItem label="Profile" icon="account-outline" badge={3} />
</NavigationBar>`,
  },
  {
    id: 'segmented-buttons',
    name: 'SegmentedButton',
    category: 'Actions',
    description: 'Nhóm nút bấm phân đoạn liền khối chuẩn Luma UI cho phép chọn một tùy chọn hoặc chuyển đổi chế độ xem.',
    guidelines: 'Dùng SegmentedButton khi có từ 2 đến 5 tùy chọn liên quan mật thiết và cần chọn nhanh (như dạng xem Lưới/Danh sách).',
    anatomy: ['1. Seamless Segment Container', '2. Selected Segment with Accent Fill', '3. Icon & Label', '4. Checkmark biểu thị đã chọn'],
    specs: {
      height: '40dp',
      corner: '20dp (Full Pill bo ngoài)',
      elevation: 'Level 0',
      containerColor: 'Selected: md.sys.color.secondary-container',
    },
    props: [
      { name: 'buttons', type: 'Array<{ value: string; label: string; icon?: ReactNode }>', required: true, description: 'Danh sách các phân đoạn nút.' },
      { name: 'selectedValue', type: 'string', required: true, description: 'Currently selected segment value.' },
      { name: 'onValueChange', type: '(value: string) => void', required: true, description: 'Callback khi thay đổi phân đoạn.' },
      { name: 'multiSelect', type: 'boolean', defaultValue: 'false', description: 'Enables multi-selection across segments.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { SegmentedButtons } from 'react-native-luma-ui';

export function Example() {
  const [view, setView] = useState('list');

  return (
    <SegmentedButtons
      selectedValue={view}
      onValueChange={setView}
      buttons={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
    />
  );
}`,
  },
];



export function getComponentsData(lang: string = 'en'): ComponentData[] {
  // If english, return default english data
  if (lang !== 'vi') {
    return COMPONENTS_DATA;
  }
  // Otherwise return localized vietnamese data
  return COMPONENTS_DATA.map((comp) => {
    const vi = VIETNAMESE_OVERRIDES[comp.id];
    if (!vi) return comp;
    return {
      ...comp,
      description: vi.description || comp.description,
      guidelines: vi.guidelines || comp.guidelines,
      anatomy: vi.anatomy || comp.anatomy,
      props: comp.props.map((p) => ({
        ...p,
        description: vi.props?.[p.name] || p.description,
      })),
    };
  });
}

const VIETNAMESE_OVERRIDES: Record<string, {
  description?: string;
  guidelines?: string;
  anatomy?: string[];
  props?: Record<string, string>;
}> = {
  'button': {
    description: 'Nút bấm Luma UI cho phép người dùng kích hoạt các hành động chính, phụ với 5 chế độ trực quan (filled, elevated, outlined, text, tonal).',
    guidelines: 'Sử dụng Filled Button cho hành động quan trọng nhất màn hình (Primary Action). Tonal và Elevated cho các hành động quan trọng vừa phải. Outlined và Text Button cho các hành động phụ.',
    anatomy: ['1. Container bo góc viên thuốc (Full Pill)', '2. Leading Icon (Tùy chọn)', '3. Label Text (Roboto Medium)', '4. State Layer (Hover/Ripple/Pressed)'],
    props: {
      label: 'Văn bản hiển thị trên nút bấm.',
      mode: 'Kiểu hiển thị của nút chuẩn Luma UI.',
      onPress: 'Hàm xử lý sự kiện khi người dùng nhấn nút.',
      disabled: 'Vô hiệu hóa tương tác và làm mờ nút.',
      loading: 'Hiển thị vòng xoay tải thay cho nhãn.',
      icon: 'Biểu tượng hiển thị bên trái của nút.',
      style: 'Tùy chỉnh kiểu dáng container của nút.',
    },
  },
  'bottom-sheet': {
    description: 'Bảng trượt từ đáy màn hình với cử chỉ kéo vuốt mượt mà, hỗ trợ tràn viền status bar và scrim đen mờ chuẩn Luma UI.',
    guidelines: 'Dùng BottomSheet để hiển thị nội dung bổ sung hoặc các tùy chọn ngữ cảnh mà không làm mất trạng thái của màn hình chính bên dưới.',
    anatomy: ['1. Drag Handle (Thanh kéo)', '2. Top Header (Tiêu đề & nút đóng)', '3. Content Container bo góc trên 28dp', '4. Modal Scrim (Lớp mờ đen đè toàn màn hình)'],
    props: {
      visible: 'Trạng thái hiển thị của BottomSheet.',
      onClose: 'Hàm gọi khi người dùng đóng (vuốt xuống hoặc bấm scrim).',
      title: 'Tiêu đề hiển thị ở đầu bảng trượt.',
      height: 'Chiều cao mong muốn của BottomSheet.',
      closeOnDragDown: 'Cho phép đóng bảng khi vuốt tay xuống.',
      children: 'Nội dung con bên trong bảng trượt.',
    },
  },
  'date-time-picker': {
    description: 'Hộp thoại chọn ngày giờ toàn diện hỗ trợ lịch trực tiếp, bánh xe chọn giờ phút và kết hợp chọn cả ngày & giờ chuẩn Luma UI.',
    guidelines: 'Dùng DatePicker khi chọn ngày hẹn, sinh nhật; TimePicker để chọn mốc thời gian; và DateTimePicker kết hợp cho các tác vụ cần cả ngày lẫn giờ.',
    anatomy: ['1. Lịch cuộn tháng/năm dạng Grid', '2. Vòng xoay chọn Giờ & Phút (24h/12h)', '3. Tab chuyển đổi Ngày/Giờ', '4. Action Buttons (Xác nhận, Hủy)'],
    props: {
      value: 'Giá trị ngày giờ hiện tại (đối tượng Date hoặc chuỗi ISO).',
      onChange: 'Hàm callback khi người dùng chọn ngày hoặc giờ.',
      onConfirm: 'Hàm gọi khi người dùng nhấn nút Xác nhận.',
      mode: 'Chế độ chọn: date (ngày), time (giờ) hoặc datetime (kết hợp).',
      placeholder: 'Văn bản hiển thị khi chưa có giá trị.',
      modalTitle: 'Tiêu đề hiển thị trên header của modal.',
      confirmText: 'Nhãn nút bấm xác nhận.',
      cancelText: 'Nhãn nút bấm hủy bỏ.',
    },
  },
  'scaffold': {
    description: 'Khung bố cục cấu trúc chuẩn Luma UI kết hợp đồng bộ AppBar, BottomNavigationBar, FloatingActionButton và xử lý tràn màn hình status bar.',
    guidelines: 'Dùng Scaffold làm khung bọc ngoài cùng của mỗi màn hình để tự động tính toán safe area insets và màu nền bề mặt.',
    anatomy: ['1. StatusBar Inset Area (Tùy chọn tràn viền)', '2. Top AppBar Region', '3. Vùng nội dung Body cuộn', '4. Nút bấm nổi FAB', '5. Bottom Navigation Bar Area'],
    props: {
      appBar: 'Thanh AppBar hiển thị ở đầu màn hình.',
      bottomNavigationBar: 'Thanh điều hướng dưới đáy màn hình.',
      floatingActionButton: 'Nút hành động nổi (FAB) neo ở góc dưới.',
      backgroundColor: 'Màu nền của toàn bộ Scaffold.',
      edgeToEdge: 'Kích hoạt chế độ tràn viền toàn màn hình (status bar trong suốt).',
      children: 'Nội dung chính hiển thị bên trong màn hình.',
    },
  },
  'app-bar': {
    description: 'Thanh điều hướng trên cùng hiển thị tiêu đề trang, biểu tượng điều hướng quay lại, các nút tác vụ nhanh và tự động tính padding status bar.',
    guidelines: 'Dùng AppBar ở đầu mỗi trang để cung cấp ngữ cảnh màn hình và các hành động quan trọng nhất.',
    anatomy: ['1. Container Bar (Cao 56dp - 64dp)', '2. Navigation Icon (Back / Menu)', '3. Title & Subtitle Text', '4. Action Items (Tối đa 3 icon)'],
    props: {
      title: 'Tiêu đề chính hiển thị trên thanh AppBar.',
      subtitle: 'Phụ đề nhỏ bên dưới tiêu đề chính.',
      onBack: 'Hàm gọi khi người dùng nhấn nút quay lại.',
      showBack: 'Hiển thị nút mũi tên quay lại mặc định.',
      actions: 'Danh sách các phần tử hành động bên phải.',
      centerTitle: 'Căn giữa tiêu đề chính trên thanh AppBar.',
    },
  },
  'slider': {
    description: 'Thanh trượt chọn giá trị số trong khoảng xác định với cử chỉ vuốt mượt mà, hỗ trợ bước nhảy và màu sắc tùy biến theo theme.',
    guidelines: 'Dùng Slider để điều chỉnh các cài đặt như âm lượng, độ sáng, hoặc khoảng giá lọc sản phẩm.',
    anatomy: ['1. Active Track (Đoạn thanh đã chọn)', '2. Inactive Track (Đoạn thanh còn lại)', '3. Thumb Handle (Nút kéo tròn)', '4. Value Indicator Tooltip (Tùy chọn)'],
    props: {
      value: 'Giá trị hiện tại của thanh trượt.',
      onValueChange: 'Hàm callback khi người dùng thay đổi giá trị.',
      minimumValue: 'Giá trị nhỏ nhất của thanh trượt.',
      maximumValue: 'Giá trị lớn nhất của thanh trượt.',
      step: 'Bước nhảy giá trị khi kéo.',
      disabled: 'Vô hiệu hóa thanh trượt.',
    },
  },
  'snackbar': {
    description: 'Thanh thông báo nổi ở đáy màn hình cung cấp phản hồi nhanh về một tác vụ vừa thực hiện, hỗ trợ nút hành động hoàn tác (UNDO).',
    guidelines: 'Dùng Snackbar cho các thông báo ngắn hạn (như "Đã lưu", "Đã xóa") tự biến mất sau thời gian định sẵn.',
    anatomy: ['1. Container viên thuốc bo góc 8dp', '2. Message Text', '3. Action Button (vd: HOÀN TÁC)'],
    props: {
      visible: 'Trạng thái hiển thị của Snackbar.',
      onDismiss: 'Hàm gọi khi Snackbar tự biến mất hoặc bị đóng.',
      duration: 'Thời gian hiển thị trước khi tự đóng (mili giây).',
      children: 'Nội dung văn bản thông điệp hiển thị.',
    },
  },
  'text-field': {
    description: 'Ô nhập liệu văn bản toàn diện với nhãn nổi (floating label), văn bản trợ giúp, trạng thái lỗi, biểu tượng đầu/cuối và xóa nhanh.',
    guidelines: 'Dùng TextField cho các trường nhập liệu trong biểu mẫu, màn hình đăng nhập và ô tìm kiếm.',
    anatomy: ['1. Input Container (Outlined hoặc Filled)', '2. Floating Label (Co nhỏ khi focus)', '3. Input Text Area', '4. Leading & Trailing Icons', '5. Helper & Error Text'],
    props: {
      label: 'Nhãn hiển thị của ô nhập liệu.',
      placeholder: 'Văn bản gợi ý khi ô trống.',
      value: 'Giá trị văn bản hiện tại.',
      onChangeText: 'Hàm callback khi văn bản thay đổi.',
      error: 'Đánh dấu trạng thái lỗi (đổi màu viền đỏ).',
      errorText: 'Thông báo lỗi hiển thị khi trường không hợp lệ.',
      helperText: 'Văn bản hướng dẫn hiển thị bên dưới.',
      secureTextEntry: 'Ẩn ký tự cho trường mật khẩu.',
    },
  },
  'card': {
    description: 'Thẻ chứa thông tin và hành động liên quan với góc bo tròn, vạch kẻ nhấn bên trái, huy hiệu ưu tiên và khả năng tương tác chạm.',
    guidelines: 'Dùng Card để tổ chức thông tin thành các khối nội dung riêng biệt, dễ quét mắt như tóm tắt dự án, tin tức, hoặc mô-đun cài đặt.',
    anatomy: ['1. Card Container Surface', '2. Accent Line (Vạch màu bên trái)', '3. Priority & Status Badges', '4. Title & Content Area', '5. Footer Actions'],
    props: {
      title: 'Tiêu đề chính của thẻ.',
      content: 'Nội dung chính hiển thị bên trong thẻ.',
      subContent: 'Nội dung phụ giải thích thêm.',
      priority: 'Nhãn mức độ ưu tiên (vd: Cao, Trung bình).',
      status: 'Nhãn trạng thái (vd: Đang xử lý, Hoàn thành).',
      footer: 'Khu vực chân thẻ chứa các nút thao tác.',
      leftLine: 'Màu viền kẻ nổi bật ở mép trái.',
      onPress: 'Sự kiện khi người dùng nhấn vào toàn bộ Card.',
    },
  },
  'checkbox': {
    description: 'Hộp kiểm Luma UI hỗ trợ trạng thái chọn (checked), bỏ chọn (unchecked) và bán chọn (indeterminate) với kiểu vuông hoặc tròn.',
    guidelines: 'Sử dụng Checkbox khi người dùng có thể chọn một hoặc nhiều mục trong danh sách hoặc đồng ý điều khoản.',
    anatomy: ['1. Box Container (Bo góc 4dp hoặc tròn)', '2. Checkmark / Minus Icon', '3. Label Text & Description'],
    props: {
      checked: 'Trạng thái đã chọn của Checkbox.',
      status: 'Trạng thái rõ ràng: checked, unchecked hoặc indeterminate.',
      indeterminate: 'Trạng thái bán chọn (phân vân).',
      onValueChange: 'Callback khi trạng thái thay đổi.',
      label: 'Nhãn văn bản hiển thị cạnh hộp kiểm.',
      description: 'Dòng mô tả phụ bên dưới nhãn.',
      shape: 'Hình dạng hộp kiểm: square (vuông) hoặc circle (tròn).',
      disabled: 'Vô hiệu hóa hộp kiểm.',
    },
  },
  'switch': {
    description: 'Công tắc bật/tắt (Toggle) Luma UI với track viền viên thuốc, nút trượt thumb tròn và animation mượt mà khi kích hoạt tính năng.',
    guidelines: 'Dùng Switch để bật/tắt tức thì các tính năng, cài đặt độc lập mà không cần bấm nút Lưu thay đổi.',
    anatomy: ['1. Track Container (Dài 52dp, cao 32dp)', '2. Sliding Thumb (Đường kính 24dp - 28dp)', '3. State Layer / Màu nhấn'],
    props: {
      value: 'Giá trị bật (true) hoặc tắt (false).',
      onValueChange: 'Hàm xử lý khi người dùng gạt công tắc.',
      disabled: 'Vô hiệu hóa công tắc.',
      color: 'Màu sắc chủ đạo của thumb khi bật.',
      label: 'Nhãn hiển thị kèm bên cạnh switch.',
      description: 'Dòng giải thích chi tiết phía dưới nhãn.',
    },
  },
  'chip': {
    description: 'Thẻ nhãn tương tác nhỏ gọn chuẩn Luma UI với các kiểu: Filter, Assist, Input, Suggestion kèm biểu tượng và nút xóa.',
    guidelines: 'Sử dụng Filter Chips để lọc danh mục sản phẩm, Assist Chips để kích hoạt tác vụ nhanh.',
    anatomy: ['1. Chip Container (Cao 32dp)', '2. Leading Icon / Checkmark', '3. Label Text', '4. Trailing Close Button (nút X)'],
    props: {
      label: 'Nhãn văn bản hiển thị trong Chip.',
      variant: 'Biến thể của chip: assist, filter, input hoặc suggestion.',
      selected: 'Trạng thái được chọn (áp dụng cho filter chip).',
      elevated: 'Hiển thị bóng đổ nâng cao.',
      disabled: 'Vô hiệu hóa tương tác.',
      onPress: 'Sự kiện khi người dùng nhấn vào chip.',
      onClose: 'Sự kiện khi người dùng nhấn nút đóng (xóa).',
    },
  },
  'dialog': {
    description: 'Hộp thoại thông báo và xác nhận Luma UI hiển thị đè toàn màn hình với góc bo tròn 28dp và lớp mờ backdrop scrim.',
    guidelines: 'Dùng Dialog cho các thông báo quan trọng đòi hỏi quyết định ngay lập tức của người dùng như xác nhận xóa dữ liệu.',
    anatomy: ['1. Modal Scrim (Lớp mờ đen)', '2. Dialog Container (Bo góc 28dp)', '3. Title & Content Area', '4. Action Buttons (Hủy, Xác nhận)'],
    props: {
      visible: 'Trạng thái hiển thị của Dialog.',
      onClose: 'Callback khi người dùng đóng dialog.',
      title: 'Tiêu đề thông báo của hộp thoại.',
      children: 'Nội dung chi tiết hoặc thành phần bên trong.',
      footer: 'Hàng nút bấm hành động (Hủy, Xác nhận).',
      dismissable: 'Cho phép chạm ra ngoài scrim để đóng.',
    },
  },
  'badges': {
    description: 'Huy hiệu thông báo số lượng hoặc chấm tròn nhỏ gọn (dot), tự động định vị ở góc trên của icon hoặc avatar.',
    guidelines: 'Sử dụng Badge để báo hiệu có thông báo mới, tin nhắn chưa đọc hoặc số lượng sản phẩm trong giỏ hàng.',
    anatomy: ['1. Anchor Component (Icon, Avatar)', '2. Badge Capsule / Dot', '3. Count Text (nếu có số)'],
    props: {
      children: 'Thành phần gốc được gắn huy hiệu.',
      count: 'Số lượng cần hiển thị (vd: 5, 99+).',
      maxCount: 'Mức số tối đa trước khi hiển thị dấu cộng (mặc định 99).',
      dot: 'Chỉ hiển thị chấm đỏ nhỏ, không hiện số.',
      visible: 'Trạng thái hiển thị của huy hiệu.',
      color: 'Màu nền của badge (mặc định màu lỗi đỏ Luma UI).',
    },
  },
  'navigation-bar': {
    description: 'Thanh điều hướng chân trang (Bottom Navigation) chuẩn Luma UI với hiệu ứng viên thuốc active pill bo tròn 64x32px.',
    guidelines: 'Dùng NavigationBar cho 3 đến 5 điểm đến chính cấp cao nhất của toàn ứng dụng di động.',
    anatomy: ['1. Bar Container (Cao 80dp)', '2. Active Pill Indicator (64x32dp)', '3. Navigation Icon & Label'],
    props: {
      selectedIndex: 'Vị trí tab hiện tại đang được chọn (0-indexed).',
      onSelect: 'Callback khi người dùng bấm chọn một tab.',
      activeColor: 'Màu sắc biểu tượng khi tab đang hoạt động.',
      children: 'Danh sách các NavigationItem bên trong.',
    },
  },
  'segmented-buttons': {
    description: 'Nhóm nút bấm phân đoạn liền khối chuẩn Luma UI cho phép chọn một tùy chọn hoặc chuyển đổi chế độ xem nhanh chóng.',
    guidelines: 'Dùng SegmentedButton khi có từ 2 đến 5 tùy chọn liên quan mật thiết và cần chọn nhanh (vd: Ngày/Tuần/Tháng).',
    anatomy: ['1. Segment Container liền mạch', '2. Selected Segment với màu nhấn', '3. Icon & Label', '4. Divider Line giữa các đoạn'],
    props: {
      buttons: 'Danh sách các nút phân đoạn (value, label, icon).',
      selectedValue: 'Giá trị phân đoạn đang được chọn.',
      onValueChange: 'Callback khi người dùng bấm chọn một phân đoạn mới.',
      multiSelect: 'Cho phép chọn nhiều phân đoạn cùng lúc.',
    },
  },
};
