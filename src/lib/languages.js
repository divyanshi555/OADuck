export const SUPPORTED_LANGUAGES = [
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
];

export function isSupportedLanguage(language) {
  return SUPPORTED_LANGUAGES.some(({ value }) => value === language);
}

export function languageLabel(language) {
  return SUPPORTED_LANGUAGES.find(({ value }) => value === language)?.label || null;
}

export function languageValue(language) {
  const normalized = String(language || "").trim().toLowerCase();
  return SUPPORTED_LANGUAGES.find(({ value, label }) =>
    value === normalized || label.toLowerCase() === normalized
  )?.value || null;
}
