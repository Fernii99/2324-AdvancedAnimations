import React, {useState, useEffect, useRef} from 'react'
import { Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import styled from 'styled-components/native';
import { getCoffees } from './api'
import Backdrop from './components/Backdrop'
import CoffeeFlatlist from './components/CoffeeFlatlist'


const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  background-color: #000
`

export default function App() {
  const [coffees, setCoffees] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const coffees = await getCoffees()
      setCoffees( [{key: 'left-spacer'}, ...coffees, {key: 'right-spacer'}] )
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
    <Backdrop coffees={coffees} scrollX={scrollX}/>
    <CoffeeFlatlist coffees={coffees} scrollX={scrollX} />
    </Container>
  );
}


