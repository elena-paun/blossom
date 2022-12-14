import React, { useState, useRef } from 'react';
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
import * as ImagePicker from 'expo-image-picker';

import plantCare from '../api/plantCare.json';
import Card from '../components/Card';
import FilterButton from '../components/FilterButton';
import commonProblems from '../api/commonProblems.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import plantNet from '../api/plantId2';

const parseLightData = (data, setPlantbookDetails) => {
  console.log(data.max_light_lux);
  switch (true) {
    case data.max_light_lux >= 60000:
      return setPlantbookDetails((prev) => ({
        ...prev,
        maxLight: 'High-light / full sun plant',
      }));
    case data.max_light_lux >= 35000:
      setPlantbookDetails((prev) => ({
        ...prev,
        maxLight: 'Medium-light / partial sun plant',
      }));
    case data.max_light_lux >= 15000:
      setPlantbookDetails((prev) => ({
        ...prev,
        maxLight: 'Low-light / partial shade plant',
      }));
    case data.max_light_lux >= 5000:
      setPlantbookDetails((prev) => ({
        ...prev,
        maxLight: 'Very low-light plants or heavy shade plants',
      }));
  }
};

const Search = ({ navigation }) => {
  console.log({ plantCare });
  const { navigate } = navigation;
  const [buttonPressed, setButtonPressed] = useState(0);
  const buttons = ['All', 'Saved', 'New'];
  const numColumns = buttons.length;
  const plantCareCards = [1, 2, 3];
  // backgroundColor: 'rgb(249,247,245)',
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const [startCamera, setStartCamera] = useState(false);

  const cameraRef = useRef();

  const handlePhoto = async () => {
    if (cameraRef) {
      let picture = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      //  this.setState({ imageUri: picture.uri });
      //  this.props.navigation.state.params.onGoBack(picture);
      //  this.props.navigation.goBack();
    }
  };
  const [imageRec, setImageRec] = useState();

  const [plantbookDetails, setPlantbookDetails] = useState({});
  const openPlantbookFetchDetail = async (name) => {
    const optionsDetail = {
      method: 'GET',
      url: `https://open.plantbook.io/api/v1/plant/detail/${name}/`,
      headers: {
        'Content-type': 'application/json',

        'Authorization': 'Bearer mRou8h8PtZ0DyeoARUYG3uoEbC2lni',
      },
    };
    axios
      .request(optionsDetail)
      .then((res) => {
        console.log({ detailedResponse: res.data });
        const { data } = res;
        setPlantbookDetails((prev) => ({
          ...prev,
          image: data.image_url,
          maxTemp: data.max_temp,
          minTemp: data.min_temp,
          maxSoilMoist: data.max_soil_moist,
          minSoilMoist: data.min_soil_moist,
          soilConductivity: data.max_soil_ec - data.min_soil_ec,
          envHumid: data.max_env_humid - data.min_env_humid,
        }));
        parseLightData(res.data, setPlantbookDetails);
      })
      .catch((err) => console.log({ plantDetails: err }));
  };
  const openPlantbookFetch = async (name) => {
    const plantName1 = name.split(' ').slice(0, 1).join(' ');
    const plantName2 = name.split(' ').slice(0, 2).join(' ');
    console.log({ plantName1, plantName2 });
    const options = {
      method: 'GET',
      url: `https://open.plantbook.io/api/v1/plant/search?alias=${plantName1}&limit=100`,
      headers: {
        'Content-type': 'application/json',

        'Authorization': 'Bearer mRou8h8PtZ0DyeoARUYG3uoEbC2lni',
      },
    };

    try {
      axios
        .request(options)
        .then((aliasResponse) => {
          let updatedList = [...aliasResponse.data.results];
          console.log({ updatedList });
          updatedList =
            aliasResponse.data.results.length > 1
              ? updatedList.filter(
                  (item) =>
                    item.pid.toLowerCase().indexOf(plantName2.toLowerCase()) !==
                    -1
                )
              : aliasResponse.data.results;
          console.log(aliasResponse.data.results, { updatedList });

          if (!!updatedList.length)
            openPlantbookFetchDetail(updatedList[0].pid);
        })
        .catch((err) => console.log({ err }));
    } catch (err) {
      console.log({ err });
    }
  };

  const searchApi = async (image) => {
    if (image) {
      const formData = new FormData();

      formData.append('images', {
        uri: image,
        name: image,
        type: 'image/jpeg',
      });
      try {
        const response = await plantNet.post(
          '/all?include-related-images=true&no-reject=true&lang=en&api-key=2b10RKUihAOQyqjtdIlcLGJWe',
          formData
        );
        setImageRec(response.data);
        console.log({ results: response.data.species });
        openPlantbookFetch(response.data.bestMatch);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      searchApi(result.uri);
    }
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.findPerfectText}>Find Perfect </Text>
        <Text style={styles.plantsVeggiesText}>Plants & Veggies</Text>
      </View>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name='search' size={17} />
        <Pressable onPress={() => navigate('PlantSearch')}>
          <View pointerEvents='none'>
            <TextInput
              style={styles.textInput}
              placeholderTextColor='rgb(171,186,181)'
              placeholder='Type a plant name'
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.shadow}>
        <Icon
          name='camera'
          size='25'
          style={styles.camera}
          onPress={pickImage}
        />
      </View>
      {/* <Text>Light requirements: {plantbookDetails.maxLight}</Text>
      <Text>Max temperature: {plantbookDetails.maxTemp} °C</Text>
      <Text>Min temperature: {plantbookDetails.minTemp} °C</Text>
      <Text>Max soil moisture: {plantbookDetails.maxSoilMoist} %</Text>
      <Text>Min soil moisture: {plantbookDetails.minSoilMoist} %</Text>
      <Text>Soil conductivity: {plantbookDetails.soilConductivity} uS/cm</Text>
      <Text>Environment humidity: {plantbookDetails.envHumid} %</Text>
      {/* <Image
        source={require('../../assets/plant.jpg')}
        style={styles.plantImage}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
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
  camera: {
    color: 'white',
    backgroundColor: 'rgb(137,190,151)',
    borderRadius: 45,
    padding: 30,
    overflow: 'hidden',
  },
  searchIcon: {
    backgroundColor:
      'radial-gradient(circle, rgba(242,192,192,1) 0%, rgba(187,69,69,1) 100%))',
    borderRadius: 14,
    overflow: 'hidden',
    padding: 7,
    left: 255,
    top: 6,
    zIndex: 99,
    position: 'absolute',
    color: 'white',
  },
  searchSection: {
    alignItems: 'center',
    marginTop: 208,
  },
  background: {
    backgroundColor: 'rgb(230,243,240)',
  },
  textInput: {
    borderRadius: '20px',
    height: 44,
    width: 270,
    backgroundColor: 'white',
    paddingLeft: 16,
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
  header: { top: -60, position: 'absolute' },
});

export default Search;
