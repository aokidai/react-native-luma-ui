import type { ComponentData } from '../types';

export const COMPONENTS_DATA: ComponentData[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Actions',
    description: 'Nút bấm Luma UI cho phép người dùng kích hoạt các hành động chính, phụ với 5 chế độ trực quan (filled, elevated, outlined, text, tonal).',
    guidelines: 'Sử dụng Filled Button cho hành động quan trọng nhất màn hình (Primary Action). Tonal và Elevated cho các hành động quan trọng vừa phải. Outlined và Text Button cho các hành động phụ.',
    anatomy: ['1. Container bo góc viên thuốc (Full Pill)', '2. Leading Icon (Tùy chọn)', '3. Label Text (Roboto Medium)', '4. State Layer (Hover/Ripple/Pressed)'],
    specs: {
      height: '40dp',
      corner: '20dp (Full Pill)',
      elevation: 'Filled: Level 0 / Elevated: Level 1 / Pressed: Level 2',
      containerColor: 'Filled: md.sys.color.primary, Tonal: md.sys.color.secondary-container',
    },
    props: [
      { name: 'label', type: 'string', required: true, description: 'Văn bản hiển thị trên nút bấm.' },
      { name: 'mode', type: "'filled' | 'elevated' | 'outlined' | 'text' | 'tonal'", defaultValue: "'filled'", description: 'Kiểu hiển thị của nút chuẩn Luma UI.' },
      { name: 'onPress', type: '() => void', required: true, description: 'Hàm xử lý sự kiện khi người dùng nhấn nút.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Vô hiệu hóa tương tác và làm mờ nút.' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Hiển thị vòng xoay tải thay cho nhãn.' },
      { name: 'icon', type: 'React.ReactNode', description: 'Biểu tượng hiển thị bên trái của nút.' },
      { name: 'style', type: 'StyleProp<ViewStyle>', description: 'Tùy chỉnh kiểu dáng container của nút.' },
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
    description: 'Bảng trượt từ đáy màn hình với cử chỉ kéo vuốt mượt mà, hỗ trợ tràn viền status bar và scrim đen mờ chuẩn Luma UI.',
    guidelines: 'Dùng BottomSheet để hiển thị nội dung bổ sung hoặc các tùy chọn ngữ cảnh mà không làm mất trạng thái của màn hình chính bên dưới.',
    anatomy: ['1. Drag Handle (Thanh kéo)', '2. Top Header (Tiêu đề & nút đóng)', '3. Content Container bo góc trên 28dp', '4. Modal Scrim (Lớp mờ đen đè toàn màn hình)'],
    specs: {
      height: 'Tùy biến (mặc định 50% hoặc giá trị pixel cụ thể)',
      corner: 'Top-Left & Top-Right: 28dp',
      elevation: 'Level 1 (modal sheet)',
      containerColor: 'md.sys.color.surface-container-low',
    },
    props: [
      { name: 'visible', type: 'boolean', required: true, description: 'Trạng thái hiển thị của BottomSheet.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Hàm gọi khi người dùng đóng (vuốt xuống hoặc bấm scrim).' },
      { name: 'title', type: 'string', description: 'Tiêu đề hiển thị ở đầu bảng trượt.' },
      { name: 'height', type: 'number | string', defaultValue: "'50%'", description: 'Chiều cao mong muốn của BottomSheet.' },
      { name: 'closeOnDragDown', type: 'boolean', defaultValue: 'true', description: 'Cho phép đóng bảng khi vuốt tay xuống.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Nội dung con bên trong bảng trượt.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { BottomSheet, Button, Text } from 'react-native-luma-ui';

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Mở Bottom Sheet" onPress={() => setOpen(true)} />
      <BottomSheet
        visible={open}
        onClose={() => setOpen(false)}
        title="Tùy chọn thao tác"
        height={320}
        closeOnDragDown
      >
        <Text>Nội dung chi tiết bên trong BottomSheet.</Text>
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
    anatomy: ['1. Header hiển thị ngày/giờ đã chọn', '2. Grid chọn ngày theo tháng', '3. Vòng chọn giờ/phút hoặc cột số', '4. Action Buttons (Hủy / Xác nhận)'],
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
  appBar={<AppBar title="Trang chủ" showBack={false} />}
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
  title="Chi tiết đơn hàng"
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
    anatomy: ['1. Active Track (Đoạn thanh đã chọn)', '2. Inactive Track (Đoạn thanh còn lại)', '3. Thumb Handle (Nút kéo tròn)', '4. Value Bubble (Bong bóng hiển thị số)'],
    specs: {
      height: '44dp (vùng chạm cảm ứng)',
      corner: 'Track: 8dp, Thumb: 10dp',
      elevation: 'Thumb: Level 1',
      containerColor: 'Active: md.sys.color.primary, Inactive: md.sys.color.surface-variant',
    },
    props: [
      { name: 'value', type: 'number', required: true, description: 'Giá trị hiện tại của slider.' },
      { name: 'onValueChange', type: '(val: number) => void', required: true, description: 'Hàm xử lý khi giá trị thay đổi.' },
      { name: 'minimumValue', type: 'number', defaultValue: '0', description: 'Giá trị nhỏ nhất của thanh trượt.' },
      { name: 'maximumValue', type: 'number', defaultValue: '100', description: 'Giá trị lớn nhất của thanh trượt.' },
      { name: 'step', type: 'number', defaultValue: '1', description: 'Bước nhảy giữa các giá trị.' },
      { name: 'showValueBubble', type: 'boolean', defaultValue: 'true', description: 'Hiện bong bóng số nổi lên khi người dùng đang kéo.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Vô hiệu hóa thanh trượt.' },
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
        action={{ label: 'HOÀN TÁC', onPress: () => {} }}
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
      { name: 'error', type: 'string', description: 'Thông báo lỗi hiển thị viền đỏ dưới ô.' },
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
      { name: 'priority', type: 'string', description: 'Nhãn mức độ ưu tiên (vd: Cao, Trung bình).' },
      { name: 'priorityColor', type: 'string', description: 'Màu sắc của nhãn ưu tiên.' },
      { name: 'status', type: 'string', description: 'Nhãn trạng thái (vd: Đang xử lý, Hoàn thành).' },
      { name: 'statusColor', type: 'string', description: 'Màu sắc của nhãn trạng thái.' },
      { name: 'footer', type: 'React.ReactNode', description: 'Khu vực chân thẻ chứa các nút thao tác.' },
      { name: 'leftLine', type: 'string', description: 'Màu viền kẻ nổi bật ở mép trái.' },
      { name: 'onPress', type: '() => void', description: 'Sự kiện khi người dùng nhấn vào toàn bộ Card.' },
      { name: 'children', type: 'React.ReactNode', description: 'Nội dung con tùy biến bên trong.' },
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
    anatomy: ['1. Box Container (Bo góc 4dp hoặc tròn)', '2. Checkmark / Minus Icon', '3. Label Text & Description', '4. State Layer (Ripple/Hover)'],
    specs: {
      height: '40dp (vùng chạm cảm ứng)',
      corner: '4dp (square) hoặc 9999dp (circle)',
      elevation: 'Level 0',
      containerColor: 'md.sys.color.primary (checked) / Transparent (unchecked)',
    },
    props: [
      { name: 'checked', type: 'boolean', description: 'Trạng thái đã chọn của Checkbox.' },
      { name: 'status', type: "'checked' | 'unchecked' | 'indeterminate'", description: 'Trạng thái rõ ràng 3 nấc chuẩn Luma UI.' },
      { name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: 'Trạng thái bán chọn (gạch ngang).' },
      { name: 'onValueChange', type: '(checked: boolean) => void', description: 'Callback khi trạng thái thay đổi.' },
      { name: 'label', type: 'React.ReactNode', description: 'Nhãn văn bản hiển thị cạnh hộp kiểm.' },
      { name: 'description', type: 'React.ReactNode', description: 'Dòng mô tả phụ bên dưới nhãn.' },
      { name: 'shape', type: "'square' | 'circle'", defaultValue: "'square'", description: 'Hình dạng hộp kiểm: vuông bo góc hoặc tròn.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Vô hiệu hóa hộp kiểm.' },
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
    anatomy: ['1. Track Container (Dài 52dp, cao 32dp)', '2. Sliding Thumb (Đường kính 24dp - 28dp)', '3. State Layer & Track Border', '4. Label & Description'],
    specs: {
      height: '32dp (track) / 48dp (touch target)',
      corner: '16dp (Full Pill)',
      elevation: 'Thumb: Level 1 (khi bật)',
      containerColor: 'Track: md.sys.color.primary (bật) / md.sys.color.surface-container-highest (tắt)',
    },
    props: [
      { name: 'value', type: 'boolean', required: true, description: 'Giá trị bật (true) hoặc tắt (false).' },
      { name: 'onValueChange', type: '(value: boolean) => void', required: true, description: 'Hàm xử lý khi người dùng gạt công tắc.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Vô hiệu hóa công tắc.' },
      { name: 'color', type: 'string', description: 'Màu sắc chủ đạo của thumb khi bật.' },
      { name: 'label', type: 'React.ReactNode', description: 'Nhãn hiển thị kèm bên cạnh switch.' },
      { name: 'description', type: 'React.ReactNode', description: 'Dòng giải thích chi tiết phía dưới nhãn.' },
    ],
    codeExample: `import React, { useState } from 'react';
import { Switch } from 'react-native-luma-ui';

export function Example() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch
      value={enabled}
      onValueChange={setEnabled}
      label="Thông báo đẩy"
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
    guidelines: 'Sử dụng Filter Chips để lọc danh mục sản phẩm, Assist Chips để kích hoạt tác vụ nhanh.',
    anatomy: ['1. Chip Container (Cao 32dp)', '2. Leading Icon / Checkmark', '3. Label Text', '4. Trailing Remove Button'],
    specs: {
      height: '32dp',
      corner: '8dp',
      elevation: 'Level 0 (Flat) hoặc Level 1 (Elevated)',
      containerColor: 'Filter (selected): md.sys.color.secondary-container',
    },
    props: [
      { name: 'label', type: 'string', required: true, description: 'Nhãn văn bản hiển thị trong Chip.' },
      { name: 'variant', type: "'assist' | 'filter' | 'input' | 'suggestion'", defaultValue: "'assist'", description: 'Biến thể loại chip theo chuẩn Luma UI.' },
      { name: 'selected', type: 'boolean', defaultValue: 'false', description: 'Trạng thái được chọn (áp dụng cho filter chip).' },
      { name: 'elevated', type: 'boolean', defaultValue: 'false', description: 'Hiển thị bóng đổ nâng cao.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Vô hiệu hóa tương tác.' },
      { name: 'onPress', type: '() => void', description: 'Sự kiện khi người dùng nhấn vào chip.' },
      { name: 'onClose', type: '() => void', description: 'Sự kiện khi người dùng nhấn nút đóng (xóa).' },
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
    anatomy: ['1. Modal Scrim (Lớp mờ đen)', '2. Dialog Container (Bo góc 28dp)', '3. Title & Content Area', '4. Action Buttons (Hủy / Đồng ý)'],
    specs: {
      height: 'Tự động co giãn theo nội dung',
      corner: '28dp',
      elevation: 'Level 3',
      containerColor: 'md.sys.color.surface-container-high',
    },
    props: [
      { name: 'visible', type: 'boolean', required: true, description: 'Trạng thái hiển thị của Dialog.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Callback khi người dùng đóng dialog.' },
      { name: 'title', type: 'string', description: 'Tiêu đề thông báo của hộp thoại.' },
      { name: 'children', type: 'React.ReactNode', description: 'Nội dung chi tiết hoặc thành phần bên trong.' },
      { name: 'footer', type: 'React.ReactNode', description: 'Hàng nút bấm hành động (Hủy, Xác nhận).' },
      { name: 'dismissable', type: 'boolean', defaultValue: 'true', description: 'Cho phép chạm ra ngoài scrim để đóng.' },
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
        title="Xác nhận xóa tài khoản?"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button label="Hủy bỏ" mode="text" onPress={() => setVisible(false)} />
            <Button label="Xác nhận" mode="filled" onPress={() => setVisible(false)} />
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
    description: 'Huy hiệu thông báo số lượng hoặc chấm tròn nhỏ gọn (dot), tự động định vị ở góc trên của icon hoặc avatar.',
    guidelines: 'Sử dụng Badge để báo hiệu có thông báo mới, tin nhắn chưa đọc hoặc số lượng sản phẩm trong giỏ hàng.',
    anatomy: ['1. Anchor Component (Icon, Avatar)', '2. Badge Capsule / Dot', '3. Count Text (nếu có số)'],
    specs: {
      height: 'Dot: 8dp / Large (with count): 16dp',
      corner: 'Full Pill (8dp)',
      elevation: 'Level 0',
      containerColor: 'md.sys.color.error (#B3261E)',
    },
    props: [
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Thành phần gốc được gắn huy hiệu (Icon/Avatar/Button).' },
      { name: 'count', type: 'number', description: 'Số lượng cần hiển thị (vd: 5, 99+).' },
      { name: 'maxCount', type: 'number', defaultValue: '99', description: 'Mức số tối đa trước khi hiển thị dấu cộng.' },
      { name: 'dot', type: 'boolean', defaultValue: 'false', description: 'Chỉ hiển thị chấm đỏ nhỏ, không kèm số.' },
      { name: 'visible', type: 'boolean', defaultValue: 'true', description: 'Trạng thái hiển thị của huy hiệu.' },
      { name: 'color', type: 'string', description: 'Màu nền của badge (mặc định màu lỗi đỏ Luma UI).' },
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
    guidelines: 'Dùng NavigationBar cho 3 đến 5 điểm đến chính cấp cao nhất của toàn ứng dụng di động.',
    anatomy: ['1. Bar Container (Cao 80dp)', '2. Active Pill Indicator (64x32dp)', '3. Navigation Icon & Label', '4. Badge Slot'],
    specs: {
      height: '80dp (kèm Safe Area)',
      corner: 'Indicator: 16dp (Pill)',
      elevation: 'Level 2',
      containerColor: 'md.sys.color.surface-container',
    },
    props: [
      { name: 'selectedIndex', type: 'number', description: 'Vị trí tab hiện tại đang được chọn (0-indexed).' },
      { name: 'onSelect', type: '(index: number) => void', description: 'Callback khi người dùng bấm chọn một tab.' },
      { name: 'activeColor', type: 'string', description: 'Màu sắc biểu tượng khi tab đang hoạt động.' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Danh sách các NavigationItem con.' },
    ],
    codeExample: `import { NavigationBar, NavigationItem } from 'react-native-luma-ui';

<NavigationBar selectedIndex={0} onSelect={(i) => console.log(i)}>
  <NavigationItem label="Trang chủ" icon="home-outline" />
  <NavigationItem label="Tìm kiếm" icon="magnify" />
  <NavigationItem label="Cá nhân" icon="account-outline" badge={3} />
</NavigationBar>`,
  },
  {
    id: 'segmented-buttons',
    name: 'SegmentedButton',
    category: 'Actions',
    description: 'Nhóm nút bấm phân đoạn liền khối chuẩn Luma UI cho phép chọn một tùy chọn hoặc chuyển đổi chế độ xem.',
    guidelines: 'Dùng SegmentedButton khi có từ 2 đến 5 tùy chọn liên quan mật thiết và cần chọn nhanh (như dạng xem Lưới/Danh sách).',
    anatomy: ['1. Segment Container liền mạch', '2. Selected Segment với màu nhấn', '3. Icon & Label', '4. Checkmark biểu thị đã chọn'],
    specs: {
      height: '40dp',
      corner: '20dp (Full Pill bo ngoài)',
      elevation: 'Level 0',
      containerColor: 'Selected: md.sys.color.secondary-container',
    },
    props: [
      { name: 'buttons', type: 'Array<{ value: string; label: string; icon?: ReactNode }>', required: true, description: 'Danh sách các phân đoạn nút.' },
      { name: 'selectedValue', type: 'string', required: true, description: 'Giá trị phân đoạn đang được chọn.' },
      { name: 'onValueChange', type: '(value: string) => void', required: true, description: 'Callback khi thay đổi phân đoạn.' },
      { name: 'multiSelect', type: 'boolean', defaultValue: 'false', description: 'Cho phép chọn nhiều phân đoạn cùng lúc.' },
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
        { value: 'day', label: 'Ngày' },
        { value: 'week', label: 'Tuần' },
        { value: 'month', label: 'Tháng' },
      ]}
    />
  );
}`,
  },
];

