import React, { type FC, type ReactNode, useMemo, useState } from 'react';
import {
  FlatList,
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import BottomSheet from '../bottomSheet/BottomSheet';
import SearchBar from '../searchBar/SearchBar';
import { pickerStyles } from '../../styles/picker/picker';
import { colorSystem } from '../../utils/colorSystem';

export interface PickerItem {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface PickerProps {
  items: PickerItem[];
  value?: string | number | Array<string | number>;
  onSelect: (item: PickerItem) => void;
  label?: string;
  placeholder?: string;
  modalTitle?: string;
  isSearch?: boolean;
  multi?: boolean;
  disabled?: boolean;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  renderArrowIcon?: () => ReactNode;
  renderCloseIcon?: () => ReactNode;
  renderCheckIcon?: () => ReactNode;
}

const ChevronDownIcon: FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colorSystem.gray[500],
}) => {
  const iconSize = size * 0.42;
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: iconSize,
          height: iconSize,
          borderBottomWidth: 2,
          borderRightWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }, { translateY: -iconSize * 0.2 }],
        }}
      />
    </View>
  );
};

const CheckIcon: FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = colorSystem.primary,
}) => {
  const width = size * 0.35;
  const height = size * 0.6;
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width,
          height,
          borderBottomWidth: 2.2,
          borderRightWidth: 2.2,
          borderColor: color,
          transform: [{ rotate: '45deg' }, { translateY: -height * 0.15 }],
        }}
      />
    </View>
  );
};

const Picker: FC<PickerProps> = (props) => {
  const {
    items = [],
    value,
    onSelect,
    label,
    placeholder = 'Chọn một mục',
    modalTitle = 'Chọn danh mục',
    isSearch = true,
    multi = false,
    disabled = false,
    borderRadius,
    style,
    renderArrowIcon,
    renderCloseIcon,
    renderCheckIcon,
  } = props;

  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, searchQuery]);

  const isSelected = (item: PickerItem) => {
    if (multi && Array.isArray(value)) {
      return value.includes(item.value);
    }
    return value === item.value;
  };

  const selectedDisplay = useMemo(() => {
    if (multi && Array.isArray(value)) {
      const selectedLabels = items
        .filter((item) => value.includes(item.value))
        .map((item) => item.label);
      return selectedLabels.length > 0 ? selectedLabels.join(', ') : '';
    }
    const found = items.find((item) => item.value === value);
    return found ? found.label : '';
  }, [items, value, multi]);

  const handleSelectItem = (item: PickerItem) => {
    onSelect(item);
    if (!multi) {
      setVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => !disabled && setVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          pickerStyles.trigger,
          borderRadius !== undefined && { borderRadius },
          disabled && { opacity: 0.6 },
          style,
        ]}
      >
        <View style={pickerStyles.triggerContent}>
          {label ? <Text style={pickerStyles.label}>{label}</Text> : null}
          {selectedDisplay ? (
            <Text style={pickerStyles.valueText} numberOfLines={1}>
              {selectedDisplay}
            </Text>
          ) : (
            <Text style={pickerStyles.placeholderText} numberOfLines={1}>
              {placeholder}
            </Text>
          )}
        </View>
        {renderArrowIcon ? (
          renderArrowIcon()
        ) : (
          <ChevronDownIcon size={20} color={colorSystem.gray[500]} />
        )}
      </TouchableOpacity>

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title={modalTitle}
        renderCloseIcon={renderCloseIcon}
        contentStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
      >
        {isSearch && (
          <View style={pickerStyles.searchBox}>
            <SearchBar
              placeholder="Tìm kiếm..."
              onChangeText={setSearchQuery}
              height={40}
              allowClear
            />
          </View>
        )}

        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => `${item.value}-${index}`}
          style={pickerStyles.itemList}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => {
            const selected = isSelected(item);
            return (
              <TouchableOpacity
                style={[
                  pickerStyles.itemRow,
                  selected && {
                    backgroundColor: `${colorSystem.primary}15`,
                    borderRadius: 10,
                  },
                ]}
                onPress={() => handleSelectItem(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    pickerStyles.itemText,
                    selected && pickerStyles.itemTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
                {selected &&
                  (renderCheckIcon ? (
                    renderCheckIcon()
                  ) : (
                    <CheckIcon size={18} color={colorSystem.primary} />
                  ))}
              </TouchableOpacity>
            );
          }}
        />
      </BottomSheet>
    </>
  );
};

export default Picker;
