import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import {detailData} from '../api/get';
import {MOVIE_DB_CDN_ROOT} from 'react-native-dotenv';

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
    return () => {
      setDetail({});
    }
  }, [movieId]);
  const hasData = (detail.title);
  return (<View style={styles.container}>   

      {hasData && <ScrollView style={styles.container}>
        <Text style={styles.heading}>{detail.title}</Text>        
        <Text style={styles.releaseDate}>Release Date {new Date(detail.release_date).toLocaleString('en-US')}</Text>
        <Text style={styles.overview}>{detail.overview}</Text>
        <Image style={styles.poster} source={{uri: `${MOVIE_DB_CDN_ROOT}${detail.poster_path}`}}/>
      </ScrollView>}
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
    backgroundColor: '#222',
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fafafa',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  poster: {
    width: '100%',
    height: 800,
    resizeMode: 'contain',
    marginBottom: 20
  },
  releaseDate: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#C0AC1B',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    marginBottom: 20
  },
  overview: {
    textAlign: 'justify',
    letterSpacing: 2,
    color: '#fafafa',
    fontSize: 20,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  }
});
