import React, { useState, useRef, useEffect } from 'react';
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
  TextInput,
  Pressable,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const PlantSearch = ({ navigation }) => {
  const { navigate } = navigation;

  const [defaultPlants, setDefaultPlants] = useState();
  const [allPlants, setAllPlants] = useState();

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://house-plants2.p.rapidapi.com/',
      headers: {
        'X-RapidAPI-Key': '21842dc8fbmshe153a61d95670e9p1e0fbfjsndb55deaa47fc',
        'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com',
      },
    };
    try {
      axios.request(options).then((res) => {
        setAllPlants(res.data);
        setDefaultPlants(res.data.slice(0, 10));
      });
    } catch (err) {
      console.log({ err });
    }
  }, []);

  const onFindPlant = (value) => {
    const searchedPlant = allPlants?.filter((plant) => {
      console.log({ plant });
      const plantValue = plant?.['Common name']?.[0].trim().toLowerCase();
      console.log({ plantValue });
      return plantValue?.includes(value?.trim().toLowerCase());
    });
    console.log({ value, searchedPlant });
    setDefaultPlants(searchedPlant);
  };

  return (
    <>
      <FlatList
        style={styles.background}
        ListHeaderComponent={
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name='search' size={17} />
            <TextInput
              style={styles.textInput}
              placeholderTextColor='rgb(171,186,181)'
              placeholder='Search plants'
              onChangeText={onFindPlant}
            />
          </View>
        }
        keyExtractor={(plant) => plant.id}
        data={defaultPlants}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate('PlantScreen', { item })}>
            <View style={styles.plantCard}>
              <Image
                source={{ uri: item.img }}
                style={{
                  width: '25%',
                  height: 75,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.category}>{item['Common name'][0]}</Text>
                <Text style={styles.latinName}>{item['Latin name']}</Text>
                <Text style={styles.commonName}>{item['Categories']}</Text>
              </View>
            </View>
            <View
              style={{
                width: '65%',
                backgroundColor: 'rgb(242,245,244)',
                height: 1,
                alignSelf: 'flex-end',
                marginRight: 10,
              }}
            />
          </Pressable>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  plantCard: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  shadow: {
    borderRadius: 45,
    shadowColor: 'rgb(44, 112, 75)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10.32,
    elevation: 16,
    top: 50,
    alignSelf: 'center',
  },
  category: {
    color: 'rgb(61,99,87)',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: '3%',
  },
  latinName: {
    color: 'rgb(137,190,151)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: '1%',
  },
  commonName: {
    color: 'rgb(137,190,151)',
    fontSize: 12,
  },
  searchIcon: {
    borderRadius: 14,
    overflow: 'hidden',
    padding: 7,
    left: 30,
    top: 6,
    zIndex: 99,
    position: 'absolute',
    color: 'rgb(137,190,151)',
  },
  searchSection: {
    alignItems: 'center',
    marginTop: 38,
  },
  background: {
    backgroundColor: 'white',
  },
  textInput: {
    borderRadius: '20px',
    height: 44,
    width: 270,
    backgroundColor: 'rgb(242,249,246)',
    paddingLeft: 36,
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
  },
  findPerfectText: {
    color: 'rgb(61,99,87)',
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '400',
    position: 'absolute',
    paddingTop: 50,
    paddingLeft: 10,
    paddingBottom: 10,
    marginTop: 180,
    marginLeft: 20,
  },
  plantsVeggiesText: {
    color: 'rgb(61,99,87)',
    fontFamily: 'Georgia',
    fontWeight: '500',
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    paddingTop: 50,
    paddingLeft: 85,
    paddingBottom: 10,
    fontStyle: 'italic',
    marginTop: 180,
    marginLeft: 48,
  },
  cards: {
    position: 'absolute',
    marginTop: 360,
    marginBottom: 300,
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
    position: 'absolute',
    color: 'rgb(61,99,87)',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    position: 'absolute',
    paddingTop: 250,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  plantImage: {
    width: 200,
    height: 250,
    marginTop: '10%',
    alignSelf: 'flex-end',
  },
  button: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: 'rgb(138,192,151)',
    borderRadius: 50,
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: 290,
    height: 40,
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    shadowOffset: { width: 1, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  bugsImage: {
    position: 'absolute',
    width: 200,
    height: 250,
    alignSelf: 'center',
    opacity: 0.6,
    marginTop: 100,
  },
  header: { top: 40, position: 'absolute' },
});

export default PlantSearch;
