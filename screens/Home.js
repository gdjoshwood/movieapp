
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Button
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {popularData} from '../api/get';
import {MOVIE_DB_CDN_ROOT} from 'react-native-dotenv';

import {formatDate} from '../utils/date';

const _keyExtractor = item => (`${item.id}`);

const MOVIE_ITEM_RENDER_THRESHOLD = 160;

export default function Home ({navigation}) {
  const [movies, setMovies] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  async function hydrate({append, page} = {append: true, page: 1}) {
    setRefreshing(true);
    const responsePopular = await popularData(page);
    let newMovieList = (append)
      ? movies.concat(responsePopular.results)
      : responsePopular.results;

    if (newMovieList.length > MOVIE_ITEM_RENDER_THRESHOLD) {
      newMovieList.splice(0, responsePopular.results.length);
    }

    setMovies(newMovieList);
    setRefreshing(false);
  }

  const onRefresh = () => {
    hydrate({append: false});
  }

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.listWrapper}>
        <FlatList
          data={movies}
          keyExtractor={_keyExtractor}
          renderItem={({item}) => 
            <TouchableOpacity key={item.id}
              style={styles.listItem} 
              onPress={() => {
                navigation.navigate('Detail', {movieId: item.id})
              }}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.releaseDate}>Release Date {formatDate(new Date(item.release_date))}</Text>
                <Image style={styles.thumbnail} source={{uri: `${MOVIE_DB_CDN_ROOT}${item.backdrop_path}`}}/>
                
              </View>
            </TouchableOpacity>}
          />
        </View>
        <View>
          <Button style={styles.button} 
            title="Load More"
            onPress={() => {
              setPage(page + 1);
              hydrate({page: page + 1, append: true});
            }}/>
        </View>
      </ScrollView>
    </View>
  );
}

Home.navigationOptions = {
  header: null,
  tabBarVisible: false
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  contentContainer: {
    paddingTop: 30,
  },
  listWrapper: {
    width: '90%'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fafafa',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  
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
  listItem: {
    marginBottom: 50
  },
  thumbnail: {width: '100%', resizeMode: 'contain', height: 200},
  button: {
    backgroundColor: '#C0AC1B',
    letterSpacing: 2
  },
});
