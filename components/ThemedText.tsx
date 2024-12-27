import { Text, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import clsx from 'clsx';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  fontFamily?: 
    'default' |
    'sourceSans3Italic'|
    'sourceSans3Regular' |
    'spaceMonoRegular';
  type?: 
    'title' | 
    'subtitle' | 
    '';
};

export function ThemedText({
  style,
  className = '',
  lightColor,
  darkColor,
  type,
  fontFamily = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  let fontSize;

  switch (type) {
    case 'title':
      fontSize = 'text-3xl';
      break;
    case 'subtitle':
      fontSize = 'text-xl';
      break;
    default:
      fontSize = 'text-base';
      break;
  }

  const combinedClassName = clsx(className, {
    [`font-${fontFamily}`]: fontFamily !== 'default',
    [fontSize]: true,
  });

  return (
    <Text
      style={[{ color }, style]}
      className={combinedClassName}
      {...rest}
    />
  );
}
