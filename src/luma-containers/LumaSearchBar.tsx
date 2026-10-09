import {FC, memo, useCallback, useState} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {appColors} from '../../../../../constants/appColors';
import {strings} from '../../../../../languages/strings';
import {SearchNormal} from 'iconsax-react-native';
import {debounce} from 'lodash';
import useAppTheme from '../../../../../hooks/useAppTheme';
import {SystemUtils} from '../../../../../utils/system';

export const lumaSearchButtonSize = Platform.OS === 'ios' ? 38 : 32;
interface Props {
  onChangeText: (text: string) => void;
  flex?: number;
  backgroundColor?: string;
  borderColor?: string;
  allowClear?: boolean;
  style?: any;
  size?: number;
  onPress?: () => void;
}

const LumaSearchBar: FC<Props> = props => {
  const themeColor = useAppTheme();
  const {
    onChangeText,
    flex,
    backgroundColor = appColors.f5f5f5,
    borderColor = SystemUtils.addAlpha(themeColor, 0.1),
    allowClear = true,
    size = lumaSearchButtonSize,
    onPress,
  } = props;

  const [searchText, setSearchText] = useState('');

  const handleSearch = useCallback(
    debounce((text: string) => {
      onChangeText(text);
    }, 200),
    [searchText],
  );

  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.searchBar,
        flex !== undefined ? {flex} : undefined,
        {backgroundColor},
        borderColor ? {borderColor, borderWidth: 1} : undefined,
        size !== undefined ? {height: size} : undefined,
      ]}>
      <SearchNormal size={16} color={appColors.gray} />
      <Text allowFontScaling={false} style={[{color: appColors.gray}]}>
        {strings.Search}
      </Text>
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.searchBar,
        flex !== undefined ? {flex} : undefined,
        {backgroundColor},
        borderColor ? {borderColor, borderWidth: 1} : undefined,
        size !== undefined ? {height: size} : undefined,
      ]}>
      <SearchNormal size={16} color={appColors.gray} />
      <TextInput
        allowFontScaling={false}
        placeholder={strings.Search}
        style={styles.textInput}
        placeholderTextColor={appColors.gray}
        onChangeText={e => {
          handleSearch(e);
          setSearchText(e);
        }}
        value={searchText}
        clearButtonMode={allowClear ? 'while-editing' : 'never'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 16,
    borderRadius: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
  },
  textInput: {
    borderRadius: 16,
    color: appColors.text,
    flexGrow: 1,
    height: 42,
  },
});

export default memo(LumaSearchBar);
