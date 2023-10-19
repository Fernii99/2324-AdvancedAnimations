import React from "react"
import { FlatList, Animated } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'
import styled from "styled-components"
import * as CONSTANTS from '../constants/constants'

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

const ViewCoffee = styled.Button`
  margin-top: 20px;
  height: 40px;
  background-color: #9c6f44;
  border: 1px solid;
`

const Backdrop = ({coffees, scrollX}) => {
    return(
        <ContentContainer>
         
          <FlatList 
            data={coffees}
            keyExtractor={ item => item.key }
            removeClippedSubviews={false}
            contentContainerStyle={{ width: CONSTANTS.WIDTH, height: CONSTANTS.BACKDROP_HEIGHT }}
            renderItem={ ({item, index}) => {
              if(!item.image){
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
                    <BackdropImage source={{uri: item.image}} />
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

export default Backdrop