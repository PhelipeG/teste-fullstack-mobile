import { Ionicons } from '@expo/vector-icons';

export function TabBarIcon({
  style,
  ...rest
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  style?: any;
}) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
