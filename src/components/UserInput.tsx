import { Colors } from '~/constants/color';
import { EyeOff, Eye } from 'lucide-react-native';
import { Dispatch, memo, SetStateAction, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Image, Pressable, StyleProp, Text, TextInput, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { wp } from '~/utils/ResponsiveSize';

interface UserInputProps {
  label: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: boolean;
  autoComplete?: boolean;
  autoCorrect?: boolean;
  multiline?: boolean;
  inputMode: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
  TextInputContainerStyle?: StyleProp<ViewStyle>;
  TextInputStyle?: StyleProp<ViewStyle>;
  Optional?: boolean;
  maxLength?: number;
  size?: number;
  isPassword?: boolean;
  onChangeText?: Dispatch<SetStateAction<string>> | (() => void);
  error: string | null;
}
const UserInput = ({
  label,
  placeholder,
  value,
  TextInputContainerStyle,
  TextInputStyle,
  disabled,
  secureTextEntry,
  maxLength,
  isPassword = false,
  multiline = false,
  onChangeText,
  error,
}: UserInputProps) => {
  const [toggleIcon, setToggleIcon] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.InputErrorContainer}>
      <View style={[styles.InputContainer(isFocused), TextInputContainerStyle]}>
        <View style={styles.InputLabelContainer}>
          <Text style={styles.LabelText(isFocused)}>{label}</Text>
          <TextInput
            value={value || ''}
            onChangeText={onChangeText}
            onBlur={() => {
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            secureTextEntry={toggleIcon && secureTextEntry}
            placeholderTextColor={Colors.mediumGray}
            style={[styles.TextInput, TextInputStyle]}
            editable={!disabled}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoComplete="sms-otp"
            maxLength={maxLength}
            multiline={multiline}
          />
        </View>
        {isPassword && (
          <Pressable style={styles.IconPressable} onPress={() => setToggleIcon((prev) => !prev)}>
            {toggleIcon ? (
              <EyeOff color={Colors.mediumGray} size={wp(7)} />
            ) : (
              <Eye size={wp(7)} color={Colors.mediumGray} />
            )}
          </Pressable>
        )}
      </View>
      {error && (
        <Text numberOfLines={2} style={styles.ErrorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default memo(UserInput);

const styles = StyleSheet.create((theme) => ({
  InputErrorContainer: {
    width: wp(92),
  },
  InputContainer: (isFocused) => ({
    borderWidth: 1,
    borderColor: isFocused ? Colors.matrixGreen : Colors.darkGray,
    paddingVertical: wp(1.5),
    paddingLeft: wp(3),
    gap: wp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  }),
  InputLabelContainer: {
    width: wp(78),
    gap: 5,
  },
  LabelText: (isFocused) => ({
    fontSize: wp(3.5),
    color: isFocused ? Colors.matrixGreen : Colors.mediumGray,
    fontFamily: 'Lexend Regular',
  }),
  TextInput: {
    fontSize: wp(4.5),
    color: theme.colors.typography,
    fontFamily: 'Lexend Regular',
    paddingVertical: 0,
  },
  IconPressable: {
    width: wp(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: wp(1),
  },
  CalendarImage: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
  ErrorText: {
    fontFamily: 'Lexend Regular',
    fontSize: wp(3.5),
    color: Colors.errorRed,
  },
}));
