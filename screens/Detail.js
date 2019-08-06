import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import {detailData} from '../api/get';
MOVIE_DB_CDN_ROOT = 'https://image.tmdb.org/t/p/w500'

const emptyState = () => (<View>
  Fetching Data...
</View>);

const hydratedState = props => (<View>

</View>);
export default function Detail ({navigation}) {
  const movieId = navigation.getParam('movieId');
  const [detail, setDetail] = useState({});
  async function hydrate () {
    const responseDetail = await detailData(movieId);
    const detail = responseDetail;
    setDetail(detail);
  }

  useEffect(() => {
    hydrate();
  }, []);

  return (<View style={styles.container}>   

      <ScrollView style={styles.container}>
        <Text>{detail.title}</Text>
        <Image style={{width: '100%', height: 200}} source={{uri: `${MOVIE_DB_CDN_ROOT}${detail.poster_path}`}}/>
        <Text>{detail.release_date}</Text>
        <Text>{detail.overview}</Text>
      </ScrollView>
    </View>
  );
}

Detail.navigationOptions = {
  title: 'Detail',
  header: null,
  tabBarVisible: false
};

const styles = StyleSheet.create({
  backNav: {flex: 1},
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
