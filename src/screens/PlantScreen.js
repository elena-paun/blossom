import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlantScreen = (prop) => {
  const { item } = prop.route.params;
  console.log(item);
  return (
    <View>
      <View style={styles.commonPlantInfo}>
        <Text style={styles.commonPlantName}>{item['Common name']}</Text>
        <View style={styles.botanicalNameCard}>
          <Text style={styles.label}>Botanical name: </Text>
          <Text style={styles.botanicalName}>{item['Latin name']}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  commonPlantInfo: {
    width: '80%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 200,
    padding: 20,
  },
  commonPlantName: {
    fontFamily: 'Helvetica',
    color: 'rgb(61,99,87)',
    fontWeight: '600',
    fontSize: 18,
  },
  label: {
    fontFamily: 'Helvetica',
    color: 'rgb(111,140,131)',
    fontWeight: '300',
    fontSize: 14,
    position: 'absolute',
  },
  botanicalName: {
    fontFamily: 'Helvetica',
    color: 'rgb(111,140,131)',
    fontWeight: '400',
    fontSize: 14,
    width: '100%',
    height: 60,
    wordWrap: 'break-word',
    position: 'absolute',
  },
  botanicalNameCard: {
    position: 'relative',
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'flex-start',
    borderRadius: 20,
    fontFamily: 'Helvetica',
    color: 'rgb(111,140,131)',
    fontWeight: '300',
    fontSize: 14,
    backgroundColor: 'rgb(242,249,246)',
    height: 60,
    wordBreak: 'break-word',
  },
});
export default PlantScreen;
