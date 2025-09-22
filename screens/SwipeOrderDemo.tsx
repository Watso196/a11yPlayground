import React from 'react';
import {View, Text} from 'react-native';
import {A11y} from 'react-native-a11y-order';
import styles from '../styles/commonStyles';

const SwipeOrderDemoScreen = () => {
  return (
    <>
      <Text style={styles.title}>Swipe Order Demo</Text>
      <Text style={styles.description}>Example 1</Text>
      <Text style={styles.subtext}>
        This is set up with the code in the desired reading order i.e. "List
        One, One, Two, Three..." but with the flex row styling, screen readers
        are announcing it as "List One, List Two, One, Four..."
      </Text>

      <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
        <View style={{width: 150}}>
          <Text>List One</Text>
          <Text>One</Text>
          <Text>Two</Text>
          <Text>Three</Text>
        </View>
        <View style={{width: 150}}>
          <Text>List Two</Text>
          <Text>Four</Text>
          <Text>Five</Text>
          <Text>Six</Text>
        </View>
      </View>
      <Text style={styles.description}>Example 2</Text>
      <Text style={styles.subtext}>
        This is set up with exactly the same code and styling, but uses the
        react-native-a11y-order package to set the desired reading order. Now
        screen readers will announce it in the correct order: "List One, One,
        Two, Three..."
      </Text>

      <A11y.Order
        style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
        <View style={{width: 150}}>
          <A11y.Index index={1}>
            <Text>List One</Text>
          </A11y.Index>
          <A11y.Index index={2}>
            <Text>One</Text>
          </A11y.Index>
          <A11y.Index index={3}>
            <Text>Two</Text>
          </A11y.Index>
          <A11y.Index index={4}>
            <Text>Three</Text>
          </A11y.Index>
        </View>
        <View style={{width: 150}}>
          <A11y.Index index={5}>
            <Text>List Two</Text>
          </A11y.Index>
          <A11y.Index index={6}>
            <Text>Four</Text>
          </A11y.Index>
          <A11y.Index index={7}>
            <Text>Five</Text>
          </A11y.Index>
          <A11y.Index index={8}>
            <Text>Six</Text>
          </A11y.Index>
        </View>
      </A11y.Order>
    </>
  );
};

export default SwipeOrderDemoScreen;
