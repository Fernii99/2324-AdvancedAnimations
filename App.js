import React, {useState, useEffect, useRef} from 'react'
import { FlatList, Animated, View, Image, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from'expo'
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import styled from 'styled-components/native';
import Rating from './components/Rating'
import Genre from './components/Genre'
import { getMovies } from './api'
import * as CONSTANTS from './constants/constants'

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  background-color: #000
`

const PosterContainer = styled.View`
  width: ${CONSTANTS.ITEM_SIZE}px;
  margin-top: ${CONSTANTS.TOP}px;
`

const Poster = styled.View`
  margin-horizontal: ${CONSTANTS.SPACING}px;
  padding: ${CONSTANTS.SPACING * 2}px;
  align-items: center;
  background-color: rgba(255,255,255, 0.1);
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
  color: #fff
`

const PosterDescription = styled.Text`
  font-family: Syne-Mono;
  font-size: 12px;
  color: #fff
`
const DummyContainer = styled.View`
  width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`
const ContentContainer = styled.View `
  position: absolute;
  width: ${CONSTANTS.WIDTH}px;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`
const BackdropContainer = styled.View`
  width: ${CONSTANTS.WIDTH}px;
  position: absolute;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
  overflow: hidden;
`

const BackdropImage = styled.Image`
  position: absolute;
  width: 100%;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
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

  useFonts({
    'Syne-Mono': require('./assets/fonts/SyneMono-Regular.ttf'),
  })

  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <Container>
    <StatusBar />
    <Backdrop movies={movies} scrollX={scrollX}/>
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
        return <DummyContainer/>
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

const Backdrop = ({movies, scrollX}) => {
  return(
      <ContentContainer>
       
        <FlatList 
          data={movies}
          keyExtractor={ item => item.key }
          removeClippedSubviews={false}
          contentContainerStyle={{ width: CONSTANTS.WIDTH, height: CONSTANTS.BACKDROP_HEIGHT }}
          renderItem={ ({item, index}) => {
            if(!item.backdropPath){
              return null
            }
            
              const translateX = scrollX.interpolate({
                inputRange: [(index - 1) * CONSTANTS.ITEM_SIZE, index * CONSTANTS.ITEM_SIZE],
                outputRange: [0, CONSTANTS.WIDTH]
              })
              return(
                <BackdropContainer 
                  as={Animated.View} 
                  style={{transform:[{translateX: translateX}]}}
                >
                  <BackdropImage source={{uri: item.backdropPath}} />
                </BackdropContainer>
              )
            
          }}
        />  
        <LinearGradient 
          colors={[ 'transparent', 'black' ]}
          style={{
            width: CONSTANTS.WIDTH,
            height: CONSTANTS.BACKDROP_HEIGHT,
            position: 'absolute',
            bottom: 0

          }}
        />
      </ContentContainer>
  )
}