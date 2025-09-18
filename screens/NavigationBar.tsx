import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleProp,
  TextStyle,
} from 'react-native';
import styles from '../styles/commonStyles';

const Tab = ({
  title,
  onPress,
  selected,
  index,
  totalTabs,
  style,
}: {
  title: string;
  onPress: () => void;
  selected: boolean;
  index: number;
  totalTabs: number;
  style?: StyleProp<TextStyle>;
}) => (
  <TouchableOpacity
    accessibilityRole="tab"
    // Manually provide the list index information for screen
    accessibilityHint={`${index + 1} of ${totalTabs}`}
    accessibilityState={selected ? {selected: true} : {}}
    // If iOS, provide tab role through label - API does not respect tab role
    accessibilityLabel={Platform.OS === 'ios' ? `${title}, tab` : undefined}
    onPress={onPress}
    style={style}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

const NavigationBarsScreen = () => {
  const [selectedTab, setSelectedTab] = React.useState('Home');

  const pages = ['Home', 'Account', 'Benefits'];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Navigation bars are generally set up to display at the bottom of the
        screen, and are organized as a group of navigation controls. This
        example shows a navigation bar that is accessibly structured and
        provides all important accessibility information.
      </Text>
      <View
        style={styles.navBarContainer}
        // Only mark the contains as accessible on android, when this won't cause grouping issues
        accessible={Platform.OS === 'android'}
        accessibilityRole="list">
        {pages.map((page, index) => (
          <Tab
            key={page}
            index={index}
            totalTabs={pages.length}
            onPress={() => setSelectedTab(page)}
            style={selectedTab === page && styles.selectedTab}
            title={page}
            selected={selectedTab === page}
          />
        ))}
      </View>
    </View>
  );
};

export default NavigationBarsScreen;
