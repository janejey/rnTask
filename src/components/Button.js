import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = (props) => {
  const {
    text,
    handlePress,
    isEnabled
  } = props

  return (
    <TouchableOpacity
      disabled={!isEnabled}
      style={[styles.container, {backgroundColor: isEnabled ? "#413DFF" : "#A09EFF"}]}
    onPress={handlePress}>
      <Text
      style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
})
