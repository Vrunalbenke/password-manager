import { X } from 'lucide-react-native';
import { Dispatch, SetStateAction, useState } from 'react';
import { StyleProp, Text, TextInput, View, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';

import { Colors } from '~/constants/color';
import { hp, wp } from '~/utils/ResponsiveSize';

interface TagsInputProps {
  label: string;
  placeholder: string;
  value?: string;
  tagsArray: string[];
  disabled?: boolean;
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
  onChangeText?: (
    value: string | undefined
  ) => void | Dispatch<SetStateAction<string>> | (() => void);
  removeTag: (tag: string) => void;
  //   error: string | null;
}
const TagsInput = ({
  label,
  placeholder,
  value,
  tagsArray,
  TextInputContainerStyle,
  TextInputStyle,
  disabled,
  maxLength,
  multiline = false,
  onChangeText,
  removeTag,
  error,
}: TagsInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    // <View style={styles.InputErrorContainer}>
    <View style={[styles.InputContainer(isFocused), TextInputContainerStyle]}>
      <View style={styles.InputLabelContainer}>
        <Text style={styles.LabelText(isFocused)}>{label}</Text>
        <View style={styles.tagsContainer}>
          {tagsArray?.map((tag) => (
            <View key={tag} style={styles.tagContainer}>
              <Text style={styles.tagText}>{tag}</Text>
              <RectButton onPress={() => removeTag(tag)}>
                <X size={wp(4)} color={Colors.darkGray} />
              </RectButton>
            </View>
          ))}
        </View>
        <TextInput
          value={value || ''}
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor={Colors.mediumGray}
          style={[styles.TextInput, TextInputStyle]}
          editable={!disabled}
          autoCapitalize="characters"
          autoCorrect
          maxLength={maxLength}
          multiline={multiline}
        />
      </View>
    </View>
    //   {error && (
    //     <Text numberOfLines={2} style={styles.ErrorText}>
    //       {error}
    //     </Text>
    //   )}
    // </View>
  );
};

export default TagsInput;

const styles = StyleSheet.create((theme) => ({
  //   InputErrorContainer: {
  //     width: wp(92),
  //   },
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
    width: wp(86),
    gap: 5,
  },
  LabelText: (isFocused) => ({
    fontSize: wp(3.5),
    color: isFocused ? Colors.matrixGreen : Colors.mediumGray,
    fontFamily: 'Lexend Regular',
  }),
  tagsContainer: {
    flexDirection: 'row',
    gap: wp(2),
    flexWrap: 'wrap',
    width: wp(86),
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
    backgroundColor: 'rgba(3, 160, 97,0.4)',
    borderRadius: wp(2),
  },
  tagText: {
    fontSize: wp(3.5),
    color: Colors.darkGray,
    fontFamily: 'Lexend Regular',
    textTransform: 'capitalize',
  },
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
