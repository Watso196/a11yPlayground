import React from 'react';
import {View, Text, Button, AccessibilityInfo, Platform} from 'react-native';
import styles from '../styles/commonStyles';

const DynamicContentAnnouncements = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleButtonPress = () => {
    const error = 'An error occurred while processing your request.';
    setErrorMessage(error);
    // Figure out if this is an ios device
    const isIOS = Platform.OS === 'ios';

    //announce error message with announceforaccessibilitywithoptions for ios devices only
    if (isIOS) {
      AccessibilityInfo.announceForAccessibilityWithOptions(error, {
        queue: true,
      });
    } else {
      AccessibilityInfo.announceForAccessibility(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dynamic Content Announcements</Text>
      <Text style={styles.description}>
        This screen demonstrates how to announce dynamic content changes to
        assistive technologies.
      </Text>
      <Button
        title="Click me to show error message"
        onPress={handleButtonPress}
      />
      {errorMessage && (
        <Text
          style={styles.content}
          accessible={true}
          accessibilityLabel={errorMessage}
          accessibilityRole="alert">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default DynamicContentAnnouncements;
