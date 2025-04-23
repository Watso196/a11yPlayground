import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
  Switch,
  View,
  FlatList,
} from 'react-native';

const CommonComponentsScreen = () => {
  const [buttonExpanded, setButtonExpanded] = useState(false);
  const [buttonSelected, setButtonSelected] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  const listData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        This screen demonstrates all of the base components that might exist in
        a React Native app. Any libraries used will be noted in the component
        section.
      </Text>

      {/* BUTTONS */}
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

      {/* IMAGES */}
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

      {/* LISTS */}
      <Text style={styles.sectionTitle}>Lists</Text>
      <Text style={styles.text}>A FlatList, which is a non-dynamic list.</Text>
      <FlatList
        data={listData}
        renderItem={({item}) => (
          <Text style={styles.listItem} key={item.id}>
            {item.title}
          </Text>
        )}
        keyExtractor={item => item.id}
      />

      {/* SWITCHES */}
      <Text style={styles.sectionTitle}>Switches</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Accept Cookies</Text>
        <Switch
          trackColor={{false: '#555', true: '#39843C'}}
          thumbColor={switchOn ? '#f9f9f9' : '#222'}
          ios_backgroundColor="#d6d6d6"
          onValueChange={setSwitchOn}
          value={switchOn}
          accessibilityLabel="Accept Cookies"
        />
      </View>
      <View id="bottomPaddingView" style={{height: 50}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  inputGroup: {
    marginVertical: 8,
    paddingRight: 25,
    paddingLeft: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
  },
  listItem: {
    padding: 15,
    fontSize: 18,
    height: 44,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CommonComponentsScreen;
