import React, {useState, useEffect, useRef} from 'react'
import { FlatList, Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from'expo'
import { useFonts } from 'expo-font';
import styled from 'styled-components/native';
import Rating from './components/Rating'
import Genre from './components/Genre'
import { getMovies } from './api'
import * as CONSTANTS from './constants/constants'
import { StyleSheet, View,Text } from 'react-native';

const Container = styled.View`
  flex: 1;
`

const DummyContainer = styled.View`
  width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`

const PosterContainer = styled.View`
  width: ${CONSTANTS.ITEM_SIZE}px;
`

const Poster = styled.View`
  margin-horizontal: ${CONSTANTS.SPACING}px;
  padding: ${CONSTANTS.SPACING * 2}px;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
`

const PosterImage = styled.Image`
  width: 100%;
  height: ${CONSTANTS.ITEM_SIZE * 1.2}px;
  resize-mode: cover;
  border-radius: 10px;
  margin: 0 0 10px 0;
`

const PosterTitle = styled.Text`
font-family: Syne-Mono;
font-size: 18px;
`

const PosterDescription = styled.Text`
  font-family: Syne-Mono;
  font-size: 12px;
`


export default function App() {
  const [movies, setMovies] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies()
      
      setMovies( [{key: 'left-spacer'}, ...movies, {key: 'right-spacer'}] )
      setLoaded(true)
    }
    fetchData()
  }, [])

  const [fontsLoaded] = useFonts({
    'Syne-Mono': require('./assets/fonts/SyneMono-Regular.ttf'),
  })

  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <Container>
    <StatusBar />
    <Animated.FlatList
    showsHorizontalScrollIndicator={false}
    data={movies}
    keyExtractor={item => item.key}
    horizontal
    contentContainerStyle={{
      alignItems:'center'
    }}
    snapToInterval={CONSTANTS.ITEM_SIZE}
    decelerationRate={0}
    onScroll={Animated.event(
      [{nativeEvent: {contentOffset:{x: scrollX}}}],
      {useNativeDriver:true}
    )}
    scrollEventThrottle={16}

    renderItem={({item, index}) => {
      const inputRange = [ 
        (index - 2) * CONSTANTS.ITEM_SIZE,
        (index - 1) * CONSTANTS.ITEM_SIZE,
        index * CONSTANTS.ITEM_SIZE,
      ]
      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [0, -50, 0]
      })
      if(!item.originalTitle){
        return <DummyContainer></DummyContainer>
      }
      return (
        <PosterContainer>
         <Poster as={Animated.View} style={{transform: [{translateY}]}}>
            <PosterImage source={{uri: item.posterPath }}/>
            <PosterTitle numberOfLines={1}>{item.originalTitle}</PosterTitle>
            <Rating rating={item.voteAverage} /> 
            <Genre genres={item.genres} />
            <PosterDescription numberOfLines={5}>{item.description}</PosterDescription>
          </Poster>
        </PosterContainer>
      )
    }}
    />
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
