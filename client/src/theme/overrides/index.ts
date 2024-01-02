import merge from 'lodash/merge';
import { Theme } from '@mui/material/styles';
import { defaultProps } from './default-props';
import { textField } from './components/text-field';
import { card } from './components/card';
import { button } from './components/button';

export function componentsOverrides(theme: Theme): any {
  const components = merge(
    defaultProps(theme),
    textField(theme),
    card(theme),
    button(theme)
  );

  return components;
}