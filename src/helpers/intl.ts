const DEFAULT_LOCALE = 'en-US';

const pluralIntl = new Intl.PluralRules(DEFAULT_LOCALE);
const dateFormatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  month: 'long',
  year: 'numeric',
});

export { dateFormatter, pluralIntl };
