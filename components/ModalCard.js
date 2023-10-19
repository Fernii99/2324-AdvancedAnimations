import React, { useState } from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

const ModalCardContainer = styled.View` 
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-top: 22px;
`

const ModalCard = styled.View`
    width: 100%;
    height: 50%;
    background-color: #9c6f44;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
`

const ModalTitle = styled.Text`
    font-size: 30px;
    font-weight: bold;
    align-items: center;
` 

const ModalDescription = styled.Text`
      margin-top:40px;
      font-size: 20px;
      margin-bottom: 25px;
      text-align: justify;

      
`
const PressableOpen = styled.Pressable`
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 10px;
    elevation: 2;
    margin-top: 20px;
    background-color: transparent ;
    border: 1px solid #fff;
    height: 50px;
    width: 100px;
    width: 80%;
`
const PressableClose = styled.Pressable`
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 10px;
    elevation: 2;
    margin-top: 20px;
    background-color:  none;
    border: 1px solid #fff;
    height: 50px;
    width: 100px;
    width: 80%;
    
`

const PressableText = styled.Text`
    color: white;
    font-size: 20px;

`

const ModalCardComponent = ({item}) => {
    const [modalVisible, setModalVisible]= useState(false)
    return(
        <>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <ModalCardContainer >
            <ModalCard >
                <ModalTitle>Coffee Information: </ModalTitle>
                <ModalTitle>Name - {item.title} -</ModalTitle>
                <ModalDescription>{item.description}</ModalDescription>
                <PressableClose
                    onPress={() => setModalVisible(!modalVisible)}>
                <PressableText>Ocultar Descripcion</PressableText>
                </PressableClose>
            </ModalCard>
            </ModalCardContainer>
        </Modal>
        <PressableOpen
            onPress={() => setModalVisible(true)}>
            <PressableText> Mostrar Descripcion </PressableText>
        </PressableOpen>
    </>
        
    )

}




export default ModalCardComponent