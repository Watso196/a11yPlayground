import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  AccessibilityInfo,
  findNodeHandle,
} from 'react-native';

const FocusControl = () => {
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef(null);

  useEffect(() => {
    if (submitted && successRef.current) {
      const reactTag = findNodeHandle(successRef.current);
      if (reactTag) {
        // Delay slightly to ensure iOS has updated the view
        const timeout = setTimeout(() => {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }, 50); // 300–500ms is usually safe

        return () => clearTimeout(timeout);
      }
    }
  }, [submitted]);

  return (
    <View style={{padding: 16}}>
      {!submitted ? (
        <Button title="Submit Form" onPress={() => setSubmitted(true)} />
      ) : (
        <Text
          ref={successRef}
          accessible={true}
          accessibilityLabel="Form submitted successfully"
          accessibilityRole="alert">
          ✅ Form submitted successfully!
        </Text>
      )}
    </View>
  );
};

export default FocusControl;
