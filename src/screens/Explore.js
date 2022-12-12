import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import plantCare from '../api/plantCare.json';
import Card from '../components/Card';
import FilterButton from '../components/FilterButton';

const Explore = ({ navigation }) => {
  console.log({ plantCare });
  const { navigate } = navigation;
  const [buttonPressed, setButtonPressed] = useState(0);
  const buttons = ['All', 'Saved', 'New'];
  const numColumns = buttons.length;
  const plantCareCards = [1, 2, 3];
  // backgroundColor: 'rgb(249,247,245)',
  const SCREEN_WIDTH = Dimensions.get('window').width;

  return (
    <>
      <FlatList
        ListHeaderComponentStyle={{ backgroundColor: 'rgb(249,247,245)' }}
        ListFooterComponentStyle={{
          backgroundColor: 'rgb(249,247,245)',
          zIndex: -1,
          height: 500,
        }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.smallTitle}>Tips and ideas</Text>
              <Text style={styles.largeTitle}>Explore</Text>
            </View>
            <Image
              source={require('../../assets/plant.jpg')}
              style={styles.plantImage}
            />
            <Text style={styles.plantCareTitle}>Plant care 101</Text>
          </>
        }
        keyExtractor={(button) => button}
        data={buttons}
        numColumns={numColumns}
        renderItem={({ item, index }) => (
          <View style={{ backgroundColor: 'rgb(249,247,245)' }}>
            <FilterButton
              text={item}
              setButtonPressed={setButtonPressed}
              buttonPressed={buttonPressed}
              index={index}
            />
          </View>
        )}
        ListFooterComponent={
          <FlatList
            horizontal
            pagingEnabled={false}
            keyExtractor={(card) => card.title}
            data={plantCare.data}
            renderItem={({ item, index }) => {
              console.log({ item });
              // return item.data.map((i) => <Card item={i} />);
              return <Card item={item} />;
            }}
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  smallTitle: {
    color: 'rgb(61,99,87)',
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '600',
    position: 'absolute',
    paddingTop: 50,
    paddingLeft: 10,
    textTransform: 'uppercase',
    paddingBottom: 10,
  },
  largeTitle: {
    color: 'rgb(61,99,87)',
    alignSelf: 'flex-start',
    fontSize: 32,
    fontWeight: '600',
    position: 'absolute',
    paddingTop: 80,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  plantCareTitle: {
    zIndex: 1,
    color: 'rgb(61,99,87)',
    alignSelf: 'flex-start',
    fontSize: 28,
    fontWeight: '600',
    position: 'absolute',
    paddingTop: 350,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  plantImage: {
    width: 200,
    height: 250,
    marginTop: '10%',
    alignSelf: 'flex-end',
  },
  header: { top: 100 },
});

export default Explore;
