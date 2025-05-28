import { zodResolver } from '@hookform/resolvers/zod';
import { set } from '@op-engineering/op-s2';
import { Button } from 'components/Button';
import FormInput from 'components/FormInput';
import { Colors } from 'constants/color';
import { ChevronLeft } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { Text, ToastAndroid, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';
import { PasswordSchema } from 'utils/FormSchema';
import { wp } from 'utils/ResponsiveSize';
import { z } from 'zod';
import { db } from './splashscreen';
import { goBack } from 'utils/Navigation';

export type PasswordFields = z.infer<typeof PasswordSchema>;
const Password = () => {
  const { control, handleSubmit } = useForm<PasswordFields>({
    resolver: zodResolver(PasswordSchema),
  });

  const handleSave = (data: PasswordFields) => {
    console.log('QWERTYUIO', data);
    const { error } = set({
      key: data.key,
      value: data.password,
    });

    if (error) {
      ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.LONG, ToastAndroid.TOP);
    } else {
      db.executeSync(`INSERT INTO Password (url, key) VALUES (?, ?)`, [data.url, data.key]);
      ToastAndroid.showWithGravity(
        'Password add to Secure Storage',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      goBack();
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <RectButton onPress={goBack}>
          <ChevronLeft size={wp(8)} color={Colors.darkGray} />
        </RectButton>
        <Text style={styles.title}>Password</Text>
      </View>
      <View style={styles.inputcontainer}>
        <FormInput
          control={control}
          name={'url'}
          label={'website link'}
          placeholder={'google.com'}
          inputMode={'text'}
          maxLength={30}
          TextInputContainerStyle={styles.TextInputContainerStyle}
          TextInputStyle={styles.TextInputStyle}
        />
        <FormInput
          control={control}
          name={'key'}
          label={'Username/Mobile no/Email'}
          placeholder={'type here'}
          inputMode={'text'}
          maxLength={30}
          TextInputContainerStyle={styles.TextInputContainerStyle}
          TextInputStyle={styles.TextInputStyle}
        />
        <FormInput
          control={control}
          name={'password'}
          label={'Password'}
          placeholder={'********'}
          inputMode={'text'}
          maxLength={30}
          secureTextEntry
          isPassword
          TextInputContainerStyle={styles.TextInputContainerStyle}
          TextInputStyle={styles.TextInputStyle}
        />
      </View>
      <View style={styles.savebtn}>
        <Button
          title="Save"
          onPress={handleSubmit(handleSave)}
          style={{ backgroundColor: Colors.matrixGreen }}
        />
      </View>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    width: wp(100),
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    gap: wp(2),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(5),
    color: Colors.matrixGreen,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputcontainer: {
    flex: 1,
    padding: wp(4),
    gap: wp(4),
  },
  TextInputContainerStyle: {
    width: wp(92),
    borderRadius: 12,
  },
  TextInputStyle: {
    width: wp(78),
  },
  savebtn: {
    padding: wp(4),
  },
}));
