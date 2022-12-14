import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

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

const PlantIdentification = () => {
  const [imageRec, setImageRec] = useState();

  const [plantbookDetails, setPlantbookDetails] = useState({});
  const openPlantbookFetchDetail = async (name) => {
    const optionsDetail = {
      method: 'GET',
      url: `https://open.plantbook.io/api/v1/plant/detail/${name}/`,
      headers: {
        'Content-type': 'application/json',

        'Authorization': 'Bearer 287KHpy4Z0RBApu38kq5cvDe4i6qrr',
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

        'Authorization': 'Bearer 287KHpy4Z0RBApu38kq5cvDe4i6qrr',
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Pick an image from camera roll' onPress={pickImage} />

      {imageRec && <Text>{imageRec.bestMatch}</Text>}
      <Image
        source={{ uri: plantbookDetails.image }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Light requirements: {plantbookDetails.maxLight}</Text>
      <Text>Max temperature: {plantbookDetails.maxTemp} °C</Text>
      <Text>Min temperature: {plantbookDetails.minTemp} °C</Text>
      <Text>Max soil moisture: {plantbookDetails.maxSoilMoist} %</Text>
      <Text>Min soil moisture: {plantbookDetails.minSoilMoist} %</Text>
      <Text>Soil conductivity: {plantbookDetails.soilConductivity} uS/cm</Text>
      <Text>Environment humidity: {plantbookDetails.envHumid} %</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default PlantIdentification;
