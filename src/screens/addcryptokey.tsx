import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { wp } from '~/utils/ResponsiveSize';

const AddCryptoKey: React.FC = () => {
  const [label, setLabel] = useState('');
  const [walletType, setWalletType] = useState('');
  const [keyType, setKeyType] = useState('');
  const [encryptedPrivateKey, setEncryptedPrivateKey] = useState('');
  const [ivPrivateKey, setIvPrivateKey] = useState('');
  const [encryptedSeedPhrase, setEncryptedSeedPhrase] = useState('');
  const [ivSeedPhrase, setIvSeedPhrase] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const handleSave = () => {
    // This is where your actual save logic will go.
    // Pass the collected data to a handler function in your parent component
    // or use a state management solution.
    console.log('Saving Crypto Key:', {
      label,
      walletType,
      keyType,
      encryptedPrivateKey,
      ivPrivateKey,
      encryptedSeedPhrase,
      ivSeedPhrase,
      address,
      note,
    });
    // Clear fields after "saving"
    setLabel('');
    setWalletType('');
    setKeyType('');
    setEncryptedPrivateKey('');
    setIvPrivateKey('');
    setEncryptedSeedPhrase('');
    setIvSeedPhrase('');
    setAddress('');
    setNote('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Crypto Key</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.LabelInputContainer}>
          <Text style={styles.label}>Label:</Text>
          <TextInput
            style={styles.input}
            value={label}
            onChangeText={setLabel}
            placeholder="e.g., MetaMask"
          />
        </View>
        <View style={styles.LabelInputContainer}>
          <Text style={styles.label}>Wallet Type:</Text>
          <TextInput
            style={styles.input}
            value={walletType}
            onChangeText={setWalletType}
            placeholder="e.g., Ethereum"
          />
        </View>
      </View>
      <View style={styles.LabelInputContainer}>
        <Text style={styles.label}>Key Type:</Text>
        <TextInput
          style={styles.input}
          value={keyType}
          onChangeText={setKeyType}
          placeholder="e.g., PrivateKey, SeedPhrase"
        />
      </View>

      <Text style={styles.label}>Encrypted Private Key:</Text>
      <TextInput
        style={styles.input}
        value={encryptedPrivateKey}
        onChangeText={setEncryptedPrivateKey}
        placeholder="Enter encrypted private key"
        secureTextEntry={true}
      />

      <Text style={styles.label}>IV Private Key:</Text>
      <TextInput
        style={styles.input}
        value={ivPrivateKey}
        onChangeText={setIvPrivateKey}
        placeholder="Enter IV for private key"
      />

      <Text style={styles.label}>Encrypted Seed Phrase:</Text>
      <TextInput
        style={styles.input}
        value={encryptedSeedPhrase}
        onChangeText={setEncryptedSeedPhrase}
        placeholder="Enter encrypted seed phrase"
        secureTextEntry={true}
      />

      <Text style={styles.label}>IV Seed Phrase:</Text>
      <TextInput
        style={styles.input}
        value={ivSeedPhrase}
        onChangeText={setIvSeedPhrase}
        placeholder="Enter IV for seed phrase"
      />

      <Text style={styles.label}>Address (Optional):</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter wallet address"
      />

      <Text style={styles.label}>Note (Optional):</Text>
      <TextInput
        style={[styles.input, styles.noteInput]}
        value={note}
        onChangeText={setNote}
        placeholder="Add a note"
        multiline={true}
      />

      <Button title="Save Crypto Key" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  LabelInputContainer: {
    backgroundColor: '#e6f1f7',
    paddingTop: wp(2.5),
    paddingLeft: wp(2.5),
    paddingBottom: wp(1.5),
    paddingRight: wp(1.5),
    borderRadius: wp(2),
    width: wp(40),
  },
  label: {
    fontSize: wp(3.5),
    color: 'gray',
    // marginBottom: 5,
  },
  input: {
    fontSize: wp(3),
    // backgroundColor: 'red',
  },
  noteInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default AddCryptoKey;

// import { Buffer } from '@craftzdog/react-native-buffer';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { get } from '@op-engineering/op-s2';
// import { db } from 'App';
// import { CryptoKey, CryptoKeyTag, Tag } from 'db/schema';
// import { eq } from 'drizzle-orm';
// import { useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   Alert,
//   Text,
//   ToastAndroid,
//   View,
//   TextInput,
//   Modal,
//   Pressable,
//   Image,
//   ImageBackground,
// } from 'react-native';
// import { RectButton } from 'react-native-gesture-handler';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
// import QuickCrypto from 'react-native-quick-crypto';
// import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
// import { z } from 'zod';

// import { Button } from '~/components/Button';
// import FormInput from '~/components/FormInput';
// import TagsInput from '~/components/TagsInput';
// import { Colors } from '~/constants/color';
// import { goBack } from '~/utils/Navigation';
// import { hp, wp } from '~/utils/ResponsiveSize';
// import { ChevronLeft } from 'lucide-react-native';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

// const walletTypes = [
//   {
//     chain: 'Ethereum',
//     img: 'https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Ftrustwallet%2Fassets%40master%2Fblockchains%2Fethereum%2Fassets%2F0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2%2Flogo.png&anim=false&fit=cover&width=256&height=256',
//   },
//   {
//     chain: 'Bitcoin',
//     img: 'https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F1%2Flarge%2Fbitcoin.png%3F1547033579&anim=false&fit=cover&width=256&height=256',
//   },
//   {
//     chain: 'Solana',
//     img: 'https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fsolana-labs%2Ftoken-list%40main%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&anim=false&fit=cover&width=256&height=256',
//   },
//   {
//     chain: 'Polygon',
//     img: 'https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fwallet-asset.matic.network%2Fimg%2Ftokens%2Fmatic.svg&anim=false&fit=cover&width=256&height=256',
//   },
//   {
//     chain: 'BNB Chain',
//     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHSjyW2sSnBhwztCwVW97i1BtV40g7heMMxg&s',
//   },
//   {
//     chain: 'Cardano',
//     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLdd9WfS3QIH6smKyelNNojxodAJk9w03ZmA&s',
//   },
// ];

// const keyTypes = ['SeedPhrase', 'PrivateKey'];

// const CryptoKeySchema = z.object({
//   label: z.string().min(1, 'Label is required'),
//   wallet_type: z.string(),
//   key_type: z.enum(['SeedPhrase', 'PrivateKey']),
//   address: z.string().optional(),
//   note: z.string().optional(),
// });

// export type CryptoKeyFields = z.infer<typeof CryptoKeySchema>;

// const AddCryptoKey = () => {
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const { control, handleSubmit, watch, setValue } = useForm<CryptoKeyFields>({
//     resolver: zodResolver(CryptoKeySchema),
//     defaultValues: {
//       note: '',
//       address: '',
//     },
//   });

//   const [keyType, walletType] = [watch('key_type'), watch('wallet_type')];
//   const [tag, setTag] = useState('');
//   const [tagArray, setTagArray] = useState<string[]>([]);
//   const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(''));
//   const [privateKey, setPrivateKey] = useState('');

//   const encryptData = async (value: string, derivedKeyHex: string) => {
//     const derivedKey = Buffer.from(derivedKeyHex, 'hex');
//     const iv = QuickCrypto.randomBytes(16);
//     const cipher = QuickCrypto.createCipheriv('aes-256-cbc', derivedKey, iv);
//     let encrypted = cipher.update(value, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return { encrypted, iv: iv.toString('hex') };
//   };

//   const handleSave = async (data: CryptoKeyFields) => {
//     const { value: derivedKeyHex, error } = get({
//       key: 'derived_key_hex',
//       withBiometrics: !__DEV__,
//     });

//     if (error) {
//       Alert.alert('Secure Storage Error', JSON.stringify(error));
//       return;
//     }
//     if (!derivedKeyHex) return;

//     const isSeed = data.key_type === 'SeedPhrase';
//     const input = isSeed ? seedWords.join(' ').trim() : privateKey.trim();
//     if (!input) return ToastAndroid.show('Key cannot be empty', ToastAndroid.SHORT);

//     const { encrypted, iv } = await encryptData(input, derivedKeyHex);

//     db.transaction(async (tx) => {
//       const record: typeof CryptoKey.$inferInsert = {
//         label: data.label,
//         wallet_type: data.wallet_type,
//         key_type: data.key_type,
//         encrypted_seed_phrase: isSeed ? encrypted : null,
//         encrypted_private_key: isSeed ? null : encrypted,
//         iv,
//         address: data.address,
//         note: data.note,
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//       };

//       const inserted = await tx
//         .insert(CryptoKey)
//         .values(record)
//         .returning({ insertedId: CryptoKey.id });

//       const keyId = inserted[0].insertedId;

//       for (const tagName of tagArray) {
//         const existing = await tx.select().from(Tag).where(eq(Tag.name, tagName)).limit(1);
//         let tagId: number;

//         if (existing.length > 0) {
//           tagId = existing[0].id;
//         } else {
//           const newTag = await tx
//             .insert(Tag)
//             .values({ name: tagName })
//             .returning({ insertedId: Tag.id });
//           tagId = newTag[0].insertedId;
//         }

//         await tx.insert(CryptoKeyTag).values({ crypto_key_id: keyId, tag_id: tagId });
//       }
//     })
//       .then(() => {
//         ToastAndroid.show('Crypto key saved!', ToastAndroid.LONG);
//         goBack();
//       })
//       .catch((err) => {
//         console.error(err);
//         ToastAndroid.show('Save failed', ToastAndroid.LONG);
//       });
//   };

//   const renderSeedInputs = () => (
//     <View style={styles.seedWrapper}>
//       {seedWords.map((word, idx) => (
//         <TextInput
//           key={idx}
//           value={word}
//           onChangeText={(val) => {
//             const updated = [...seedWords];
//             updated[idx] = val.trim();
//             setSeedWords(updated);
//           }}
//           placeholder={`Word ${idx + 1}`}
//           style={styles.seedInput}
//         />
//       ))}
//     </View>
//   );

//   const handleAddTags = (value: string | undefined) => {
//     if (value && value.endsWith(' ') && !value.endsWith('  ')) {
//       const trimmed = value.trim();
//       if (trimmed && !tagArray.includes(trimmed.toUpperCase())) {
//         setTagArray((prev) => [...prev, trimmed.toUpperCase()]);
//       }
//       setTag('');
//     } else {
//       setTag(value || '');
//     }
//   };

//   return (
//     <View style={styles.root}>
//       <View style={styles.header}>
//         <RectButton>
//           <ChevronLeft
//             size={wp(8)}
//             color={UnistylesRuntime.getTheme().colors.typography}
//             onPress={goBack}
//           />
//         </RectButton>
//         <Text style={styles.title}>Add Crypto Key</Text>
//         <View
//           style={{
//             width: 50,
//             //  backgroundColor: 'pink', height: 10
//           }}
//         />
//       </View>

//       <View style={styles.mainContainer}>
//         <FormInput
//           control={control}
//           name="label"
//           label="Label"
//           placeholder="e.g. MetaMask, Ledger"
//           TextInputContainerStyle={styles.TextInputContainerStyle}
//           TextInputStyle={styles.TextInputStyle}
//           isDropdown
//           onDropdownPress={() => bottomSheetRef.current?.snapToIndex(2)}
//           // setIsModalVisible(true)
//           disabled
//         />
//       </View>

//       {/* <Modal visible={isModalVisible} transparent={true} animationType="slide"> */}
//       <BottomSheet
//         index={0}
//         snapPoints={['25%', '50%', '90%']}
//         ref={bottomSheetRef}
//         onChange={(change) => console.log(change)}
//         // backdropComponent={() => <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />}
//       >
//         <View style={{ flex: 1 }}>
//           {/* <Pressable
//             onPress={() => setIsModalVisible(false)}
//             style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//           /> */}
//           {/* <View
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               width: '100%',
//               zIndex: 10,
//               borderTopLeftRadius: wp(12),
//               borderTopRightRadius: wp(12),
//               backgroundColor: UnistylesRuntime.getTheme().colors.background,
//               //   height: hp(40),
//             }}> */}
//           <Text
//             style={{
//               fontSize: wp(5),
//               fontWeight: 'bold',
//               color: UnistylesRuntime.getTheme().colors.typography,
//               padding: wp(4),
//               textAlign: 'center',
//             }}>
//             Select your wallet chain
//           </Text>
//           <View>
//             {walletTypes.map((item) => (
//               <RectButton
//                 key={item.chain}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'flex-start',
//                   paddingHorizontal: wp(4),
//                   paddingVertical: wp(2),
//                   borderBottomWidth: 1,
//                   borderBottomColor: '#E2E2E2',
//                 }}>
//                 <Image
//                   style={{
//                     width: wp(10),
//                     height: wp(10),
//                     borderRadius: wp(5),
//                     marginRight: wp(3),
//                   }}
//                   source={{
//                     uri: item.img,
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: wp(4.5),
//                     padding: wp(3),
//                     color: UnistylesRuntime.getTheme().colors.typography,
//                   }}>
//                   {item.chain}
//                 </Text>
//               </RectButton>
//             ))}
//             {/* </View> */}
//           </View>
//         </View>
//       </BottomSheet>
//       {/* </Modal> */}
//     </View>
//   );
// };

// export default AddCryptoKey;

// const styles = StyleSheet.create((theme) => ({
//   root: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: wp(4),
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.azureRadiance,
//   },
//   title: {
//     fontSize: wp(5),
//     fontWeight: 'bold',
//     color: theme.colors.typography,
//   },
//   mainContainer: {
//     flex: 1,
//     padding: wp(4),
//   },
//   TextInputContainerStyle: {
//     width: wp(92),
//     borderRadius: 12,
//     backgroundColor: '#F2F4F7',
//   },
//   NotesTIContainerStyle: {
//     width: wp(92),
//     borderRadius: 12,
//     height: hp(15.5),
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   TextInputStyle: {
//     width: wp(78),
//   },
//   NotesTIStyle: {
//     width: wp(86),
//   },
// }));
