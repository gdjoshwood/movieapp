
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
              onPress={() => {
                navigation.navigate('Detail', {movieId: item.id})
              }}>
              <View>
                <Text>{item.title}</Text>
                <Image style={{width: '100%', height: 200}} source={{uri: `${MOVIE_DB_CDN_ROOT}${item.poster_path}`}}/>
                
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
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  HomeFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
