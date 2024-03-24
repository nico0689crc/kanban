'use client';

import merge from 'lodash/merge';
import {
  enUS as enUSAdapter,
  es as esAdapter,
} from 'date-fns/locale';

// core
import {
  enUS as enUSCore,
  esES as esCore,
} from '@mui/material/locale';

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'Español',
    value: 'es',
    systemValue: merge(esCore),
    adapterLocale: esAdapter,
    icon: 'flagpack:es',
  },
];

export const defaultLang = allLangs[0]; // English
