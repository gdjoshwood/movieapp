
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
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {popularData} from '../api/get';
MOVIE_DB_CDN_ROOT = 'https://image.tmdb.org/t/p/w500'

const _keyExtractor = item => (`${item.id}`);
const emptyState = () => (<View>
  Fetching Data...
</View>);

const hydratedState = props => (<View>

</View>);

export default function Home ({navigation}) {
  const [movies, setMovies] = useState([]);
  async function hydrate() {
    const responsePopular = await popularData();
    const movies = responsePopular.results;
    setMovies(movies);
  }
  useEffect(() => {
    hydrate();
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

        <View style={styles.getStartedContainer}>
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
                <Image style={{width: '100%', resizeMode: 'contain', height: 400}} source={{uri: `${MOVIE_DB_CDN_ROOT}${item.poster_path}`}}/>
                
              </View>
            </TouchableOpacity>}
          />
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
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fafafa',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  listItem: {
    marginBottom: 50
  }
});
