import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Card = ({ item }) => {
  console.log({ item });
  // const url = JSON.parse(`../../assets/overwatered_plant.webp`);
  return (
    <View style={styles.card}>
      <Image
        source={require('../../assets/overwatered_plant.webp')}
        style={{
          width: '100%',
          height: '80%',
          top: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          zIndex: -1,
        }}
      />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
    top: 90,
    left: 20,
    width: 250,
    height: 300,
    marginRight: 30,
    marginBottom: 250,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: -1,
  },
  text: {
    color: 'rgb(61,99,87)',
    zIndex: -1,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 15,
    width: 220,
  },
});

export default Card;
