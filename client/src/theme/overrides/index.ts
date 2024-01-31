import merge from 'lodash/merge';
import { Theme } from '@mui/material/styles';
import { defaultProps } from './default-props';
import { textField } from './components/text-field';
import { card } from './components/card';
import { button } from './components/button';
import { dialog } from './components/dialog';
import { loadingButton } from './components/loading-button';

export function componentsOverrides(theme: Theme): any {
  const components = merge(
    defaultProps(),
    textField(theme),
    button(theme),
    card(theme),
    dialog(theme),
    loadingButton()
  );

  return components;
}