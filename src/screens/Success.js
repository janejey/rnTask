import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../components/Button";

const Success = ({navigation}) => {
  return (
    <View
    style={styles.screen}>
      <View
      style={{
        width: '100%'
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: 'flex-start'
          }}>
          <Image
            style={{
              width: 30,
              height: 30
            }}
            source={require('../assets/arrow.png')} />
        </TouchableOpacity>
      </View>
      <View
      style={styles.firstContainer}>
        <Image
          style={{
            width: 120,
            height: 120,
          }}
          source={require('../assets/success.png')} />
        <Text
        style={styles.done}>
          Готово!
        </Text>
        <Text
        style={styles.message}>
          Заявка отправлена. Мы с вами свяжемся в ближайший час.
        </Text>
      </View>
      <Button
        isEnabled={true}
        text='Ок'
        handlePress={() => navigation.navigate('Home')}
        />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  firstContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -70
  },
  done: {
    color: "#1E1E20",
    fontSize: 26,
    fontWeight: "500",
    marginTop: 50
  },
  message: {
    marginTop: 5,
    textAlign: 'center',
    color: "#60626D",
    fontSize: 15
  }
})

export default Success
