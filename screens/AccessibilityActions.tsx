import React from 'react';
import {View, Text, Alert} from 'react-native';
import styles from '../styles/commonStyles';

const AccessibilityActions = () => {
  const handleCardAction = (event: {nativeEvent: {actionName: any}}) => {
    switch (event.nativeEvent.actionName) {
      case 'increment': // Long press for the card action
        Alert.alert('Card value incremented');
        break;
      case 'decrement': // Long press for the card action
        Alert.alert('Card value decremented');
        break;
    }
  };

  return (
    <View
      accessible={true}
      accessibilityRole="adjustable"
      accessibilityLabel="Task card"
      accessibilityHint="Increment or decrement the card score."
      accessibilityActions={[
        {name: 'increment', label: 'Increment the card value'},
        {name: 'decrement', label: 'Decrement the card value'},
      ]}
      onAccessibilityAction={handleCardAction}
      style={styles.card}>
      <Text style={styles.text}>Score the accessibility PR</Text>
      <Text style={styles.subtext}>Increment or decrement the card score.</Text>
    </View>
  );
};

export default AccessibilityActions;
