import { Animated } from 'react-native'

import styled from "styled-components/native"
import * as CONSTANTS from '../constants/constants'
import ModalCardComponent from './ModalCard'



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


const DummyContainer = styled.View`
  width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`

const AnimatedFlatlist = ({coffees, scrollX}) => {
    return ( 
        <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={coffees}
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
            if(!item.title){
                return <DummyContainer/>
            }
            return (
                <PosterContainer>
                <Poster as={Animated.View} style={{transform: [{translateY}]}}>
                    <PosterImage source={{uri: item.image }}/>
                    <PosterTitle numberOfLines={1}>COFFEE TYPE: {item.title}</PosterTitle>
                    <ModalCardComponent item={ item }/>
                </Poster>
                
                </PosterContainer>
            )
            }}
        /> 
    )
}

export default AnimatedFlatlist