import { Platform } from 'react-native';

export const colors = {
  background: '#F7F8F5',
  surface: '#FFFFFF',
  text: '#202825',
  muted: '#68736E',
  green: '#426B5A',
  greenDark: '#2F5143',
  greenSoft: '#E3ECE7',
  sage: '#B8CBBF',
  line: '#DFE4DF',
  warning: '#A66D2F',
  warningSoft: '#F3E9DB',
  danger: '#A44949',
  dangerSoft: '#F8E9E7',
  charcoalSoft: '#34413C',
};

export const typography = {
  regular: Platform.select({ ios: 'System', android: 'sans-serif', default: 'system-ui' }),
  medium: Platform.select({ ios: 'System', android: 'sans-serif-medium', default: 'system-ui' }),
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
};

export const shadows = {
  card: {
    shadowColor: '#17211D',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
};
