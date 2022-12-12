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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import plantCare from '../api/plantCare.json';
import Card from '../components/Card';
import FilterButton from '../components/FilterButton';
import commonProblems from '../api/commonProblems.json';

const Diagnose = ({ navigation }) => {
  console.log({ plantCare });
  const { navigate } = navigation;
  const [buttonPressed, setButtonPressed] = useState(0);
  const buttons = ['All', 'Saved', 'New'];
  const numColumns = buttons.length;
  const plantCareCards = [1, 2, 3];
  // backgroundColor: 'rgb(249,247,245)',
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const [startCamera, setStartCamera] = useState(false);

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync();
    // if (!result.cancelled) {
    //   console.log({ result: result.uri });
    // }
    console.log('camera');
    // const { status } = await Camera.requestCameraPermissionsAsync();
    // if (status === 'granted') {
    //   console.log({ status });
    //   setStartCamera(true);
    // }
  };

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
  return (
    <>
      <FlatList
        ListHeaderComponentStyle={{
          backgroundColor: 'rgb(249,247,245)',
        }}
        ListFooterComponentStyle={{
          backgroundColor: 'rgb(249,247,245)',
          zIndex: -1,
          height: 850,
        }}
        numColumns={numColumns}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.smallTitle}>Pests and diseases</Text>
              <Text style={styles.largeTitle}>Diagnose</Text>
            </View>
            <Image
              source={require('../../assets/pests.png')}
              style={styles.bugsImage}
              resizeMode='contain'
            />
            <Text style={styles.plantCareTitle}>Identify a plant problem</Text>

            <View>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text
                  style={{
                    color: '#fff',
                    alignSelf: 'center',
                    fontSize: 16,
                    fontWeight: '600',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  Take a photo
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.recentText}>Recent snapshots</Text>
            <Text style={styles.commonProblems}>Common problems</Text>
          </>
        }
        ListFooterComponent={
          <>
            <View>
              <Image
                source={require('../../assets/diagnose_leaves.webp')}
                style={styles.leavesImage}
                resizeMode='cover'
              />
            </View>
            <FlatList
              horizontal
              style={styles.cards}
              keyExtractor={(card) => card.title}
              data={commonProblems.data}
              renderItem={({ item }) => <Card item={item} />}
            />
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  cards: {
    position: 'absolute',
    marginTop: 360,
    marginBottom: 300,
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
  leavesImage: {
    position: 'absolute',
    opacity: 0.3,
    width: Dimensions.get('window').width + 100,
    height: Dimensions.get('window').height + 100,
    zIndex: 100,
    backgroundColor: 'rgb(249,247,245)',
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
  recentText: {
    position: 'absolute',
    color: 'rgb(119,181,144)',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 350,
    fontWeight: '600',
    fontSize: 16,
    // borderBottomStyle: 'dotted',
    borderRadius: 1,
    // borderColor: 'grey',
    // borderWidth: 4,
    borderStyle: 'dashed',
    borderBottomWidth: 1,

    borderColor: 'red',
  },
  commonProblems: {
    color: 'rgb(59,99,86)',
    fontWeight: '600',
    fontSize: 24,
    position: 'absolute',
    marginTop: 400,
    marginLeft: 20,
  },
});

export default Diagnose;
