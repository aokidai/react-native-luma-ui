import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Card,
  DatePicker,
  DateTimePicker,
  Text,
  TimePicker,
} from 'react-native-luma-ui';

export const DateTimePickerScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* DatePicker */}
      <Card title="Date Picker (Chọn Ngày)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Lịch chọn ngày chuẩn Material 3 hiển thị qua Bottom Sheet:
        </Text>
        <DatePicker
          label="Ngày sinh / Ngày hẹn"
          value={selectedDate}
          onConfirm={setSelectedDate}
          modalTitle="Chọn ngày"
        />
      </Card>

      {/* TimePicker */}
      <Card title="Time Picker (Chọn Giờ)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Chọn giờ phút định dạng 24h hoặc 12h với các mốc gợi ý:
        </Text>
        <TimePicker
          label="Thời gian bắt đầu"
          value={selectedTime}
          onConfirm={setSelectedTime}
          is24Hour={true}
          modalTitle="Chọn thời gian"
        />
      </Card>

      {/* DateTimePicker */}
      <Card title="Date & Time Picker (Kết hợp)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Chuyển đổi linh hoạt giữa chọn Ngày và chọn Giờ trong cùng một Bottom
          Sheet:
        </Text>
        <DateTimePicker
          label="Thời hạn hoàn thành"
          value={selectedDateTime}
          onConfirm={setSelectedDateTime}
          mode="datetime"
          modalTitle="Chọn Ngày & Giờ"
        />
      </Card>

      {/* Inline DatePicker */}
      <Card title="Lịch hiển thị trực tiếp (Inline Calendar)">
        <DatePicker inline value={selectedDate} onChange={setSelectedDate} />
      </Card>
    </ScrollView>
  );
};

export default DateTimePickerScreen;
