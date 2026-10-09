import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {appColors} from '../../../../../constants/appColors';
import Feather from 'react-native-vector-icons/Feather';
import useAppTheme from '../../../../../hooks/useAppTheme';

interface Props {
  textButton?: string;
  onPressButton?: () => void;
}

const NoContent = (props: Props) => {
  const {textButton, onPressButton} = props;
  const themeColor = useAppTheme();

  return (
    <View style={styles.flexCol}>
      {textButton && onPressButton && (
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor: themeColor,
            },
          ]}
          onPress={onPressButton}>
          <Feather name="plus" color={themeColor} size={16} />
          <Text style={[styles.buttonText, {color: themeColor}]}>
            {textButton}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexCol: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconWrapper: {
    padding: 16,
    backgroundColor: appColors.white,
    borderRadius: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
    color: appColors.threadGrayText,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  buttonText: {
    fontWeight: '600',
  },
});

export default NoContent;
