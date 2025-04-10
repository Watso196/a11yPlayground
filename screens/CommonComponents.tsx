import React, {useState} from 'react';
import {ScrollView, Text, Button, StyleSheet, Image} from 'react-native';

const CommonComponentsScreen = () => {
  const [buttonExpanded, setButtonExpanded] = useState(false);
  const [buttonSelected, setButtonSelected] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        This screen demonstrates all of the base components that might exist in
        a React Native app. Any libraries used will be noted in the component
        section.
      </Text>
      <Text style={styles.sectionTitle}>Buttons</Text>
      <Button title="Base Button" />
      <Button
        accessibilityState={
          buttonExpanded ? {expanded: true} : {expanded: false}
        }
        onPress={() => setButtonExpanded(prev => !prev)}
        title="Expandable Button"
      />
      <Button
        accessibilityState={
          buttonSelected ? {selected: true} : {selected: false}
        }
        onPress={() => setButtonSelected(prev => !prev)}
        title="Toggle Button"
      />

      <Text style={styles.sectionTitle}>Images</Text>
      <Image
        style={styles.img}
        source={require('../assets/images/tinydog.jpeg')}
        alt="a tiny black and brown dog running forward, caught in midair"
      />
      <Text style={styles.caption}>
        An image of a tiny dog running forward, caught midair. This image has
        alt text.
      </Text>
      <Image
        style={styles.img}
        source={require('../assets/images/tinycat.jpg')}
      />
      <Text style={styles.caption}>
        An image of a tiny cat, looking desperately into the camera. This image
        does not have alt text.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  text: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    padding: 15,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  caption: {
    paddingBottom: 20,
    fontSize: 12,
    color: '#444',
  },
});

export default CommonComponentsScreen;
