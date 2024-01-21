/* eslint-disable no-unused-vars */
export type SettingsValueProps = {
  themeMode: 'light' | 'dark';
};

export type SettingsContextProps = SettingsValueProps & {
  onUpdate: (name: string, value: string | boolean) => void;
};
