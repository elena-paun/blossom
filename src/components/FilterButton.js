import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterButton = ({ text, buttonPressed, setButtonPressed, index }) => {
  //   const [onPress, onButtonPress] = useState();
  return (
    <TouchableOpacity
      style={{
        ...styles({ buttonPressed, index }).shadow,
      }}
      onPress={(e) => setButtonPressed(index)}>
      <Text
        style={{
          color: 'rgb(61,99,87)',
          alignSelf: 'center',
          fontSize: 16,
          fontWeight: '600',
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = ({ buttonPressed, index }) =>
  StyleSheet.create({
    shadow: {
      borderRadius: 20,
      backgroundColor: buttonPressed === index ? '#fff' : 'transparent',
      position: 'relative',
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 50,
      paddingRight: 30,
      paddingLeft: 30,
      // background color must be set
    },
  });
export default FilterButton;
