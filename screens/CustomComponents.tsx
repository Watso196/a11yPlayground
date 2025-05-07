import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AccessibleSlider from '../components/AccessibleSlider';
import styles from '../styles/commonStyles';

const TableCell: React.FC<{label: string; name: string}> = ({label, name}) => (
  <Text accessible accessibilityLabel={label} style={styles.cell}>
    {name}
  </Text>
);

const Table = () => (
  <View style={styles.table}>
    <View style={styles.row}>
      <Text style={styles.header} />
      <TableCell label="Age, table column header" name="Age" />
      <TableCell label="Gender, table column header" name="Gender" />
    </View>
    <View style={styles.row}>
      <TableCell label="Bob, table row header" name="Bob" />
      <TableCell label="40, Age, Bob" name="40" />
      <TableCell label="Male, Gender, Bob" name="Male" />
    </View>
    <View style={styles.row}>
      <TableCell label="Linda, table row header" name="Linda" />
      <TableCell label="39, Age, Linda" name="39" />
      <TableCell label="Female, Gender, Linda" name="Female" />
    </View>
  </View>
);

const Accordion = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{expanded}}
        accessibilityLabel="More details"
        onPress={() => setExpanded(!expanded)}
        style={styles.accordionButton}>
        <Text>{expanded ? 'Hide details' : 'Show details'}</Text>
      </TouchableOpacity>
      {expanded && (
        <Text style={styles.accordionContent}>Details go here!</Text>
      )}
    </View>
  );
};

const StarRating = () => {
  const [rating, setRating] = useState(0);
  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel="Star rating"
      accessibilityValue={{text: `${rating} out of 5`}}
      accessibilityHint="Swipe up or down to change the rating"
      style={styles.starRow}
      accessibilityActions={[
        {name: 'increment', label: 'Increase rating'},
        {name: 'decrement', label: 'Decrease rating'},
      ]}
      onAccessibilityAction={event => {
        switch (event.nativeEvent.actionName) {
          case 'increment':
            setRating(prev => Math.min(prev + 1, 5));
            break;
          case 'decrement':
            setRating(prev => Math.max(prev - 1, 0));
            break;
        }
      }}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CustomComponents = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Table</Text>
      <Table />

      <Text style={styles.sectionTitle}>Accordion</Text>
      <Accordion />

      <Text style={styles.sectionTitle}>Star Rating</Text>
      <StarRating />

      <Text style={styles.sectionTitle}>Slider / Progress Bar</Text>
      <AccessibleSlider />
    </View>
  );
};

export default CustomComponents;
