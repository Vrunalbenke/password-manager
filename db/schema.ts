import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// App-level secure data
export const AppMeta = sqliteTable('app_meta', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  salt_hex: text('salt_hex').notNull(),
  username: text('username'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
});

//Brand ↔ Password relation
export const Brand = sqliteTable('brand', {
  brand_id: text('brand_id').notNull().unique().primaryKey(),
  name: text('name').notNull().unique(),
  logo_url: text('logo_url'),
  domain: text('domain').notNull().unique(),
  created_at: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
});

// Tags
export const Tag = sqliteTable('tag', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});

// Password Entries
export const Password = sqliteTable('password', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username'),
  encrypted_password: text('encrypted_password').notNull(),
  iv: text('iv').notNull(),
  note: text('note'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
  updated_at: text('updated_at').default('CURRENT_TIMESTAMP').notNull(),
  brand_id: text('brand_id')
    .notNull()
    .references(() => Brand.brand_id),
});

// Password ↔ Tag relation
export const PasswordTag = sqliteTable('password_tag', {
  password_id: integer('password_id')
    .notNull()
    .references(() => Password.id),
  tag_id: integer('tag_id')
    .notNull()
    .references(() => Tag.id),
});

// Credit Cards
export const CreditCard = sqliteTable('credit_card', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  card_name: text('card_name'),
  card_number: text('card_number').notNull(),
  cardholder_name: text('cardholder_name').notNull(),
  expiry: text('expiry').notNull(),
  cvv: text('cvv').notNull(),
  note: text('note'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
  brand_id: integer('brand_id')
    .notNull()
    .references(() => Brand.brand_id),
});

// CreditCard ↔ Tag
export const CreditCardTag = sqliteTable('credit_card_tag', {
  card_id: integer('card_id')
    .notNull()
    .references(() => CreditCard.id),
  tag_id: integer('tag_id')
    .notNull()
    .references(() => Tag.id),
});

// ATM PINs
export const AtmPin = sqliteTable('atm_pin', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  bank_name: text('bank_name').notNull(),
  card_number: text('card_number'),
  pin: text('pin').notNull(),
  note: text('note'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
  brand_id: integer('brand_id')
    .notNull()
    .references(() => Brand.brand_id),
});

// ATM ↔ Tag
export const AtmPinTag = sqliteTable('atm_pin_tag', {
  atm_id: integer('atm_id')
    .notNull()
    .references(() => AtmPin.id),
  tag_id: integer('tag_id')
    .notNull()
    .references(() => Tag.id),
});

//Crypto Wallets
export const CryptoKey = sqliteTable('CryptoKey', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  label: text('label').notNull(), // e.g., "MetaMask", "Ledger"
  wallet_type: text('wallet_type'), // e.g., "Ethereum", "Solana"
  key_type: text('key_type'), // e.g., "PrivateKey", "SeedPhrase", "Ledger"

  encrypted_private_key: text('encrypted_private_key'),
  iv_private_key: text('iv_private_key'),

  encrypted_seed_phrase: text('encrypted_seed_phrase'),
  iv_seed_phrase: text('iv_seed_phrase'),

  address: text('address'), // not encrypted, optional
  note: text('note'),

  created_at: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
  updated_at: text('updated_at'),
  last_accessed: text('last_accessed'),
});

// CryptoKey ↔ Tag relation
export const CryptoKeyTag = sqliteTable('CryptoKeyTag', {
  crypto_key_id: integer('crypto_key_id')
    .notNull()
    .references(() => CryptoKey.id),
  tag_id: integer('tag_id')
    .notNull()
    .references(() => Tag.id),
});

// Aadhaar
export const Aadhaar = sqliteTable('aadhaar', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  aadhaar_number: text('aadhaar_number').notNull(),
  name: text('name').notNull(),
  dob: text('dob'),
  note: text('note'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
});

// Aadhaar ↔ Tag
export const AadhaarTag = sqliteTable('aadhaar_tag', {
  aadhaar_id: integer('aadhaar_id')
    .notNull()
    .references(() => Aadhaar.id),
  tag_id: integer('tag_id')
    .notNull()
    .references(() => Tag.id),
});

// PAN
export const Pan = sqliteTable('pan', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pan_number: text('pan_number').notNull(),
  name: text('name').notNull(),
  dob: text('dob'),
  note: text('note'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
});

// PAN ↔ Tag
export const PanTag = sqliteTable('pan_tag', {
  pan_id: integer('pan_id')
    .notNull()
    .references(() => Pan.id),
  tag_id: integer('tag_id')
    .notNull()
    .references(() => Tag.id),
});
