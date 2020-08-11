import * as React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
// import MapView from 'react-native-maps';

export default function PurdueMapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purdue University</Text>
      {/*<MapView style={styles.mapStyle}/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
