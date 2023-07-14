import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, FlatList } from "react-native";

export const MyTextInput = (props) => {
  const {
    value,
    setEnabled,
    inputValue,
    type,
    setOpened,
    opened,
    dialCode,
    change,
  } = props
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [startValidation, setStartValidation] = useState(false)
  const [inputText, setInputText] = useState('');

  const formatInputText = (text) => {
    const sanitizedText = text.replace(/\D/g, '');

    const groups = sanitizedText.match(/(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?(\d{1,10})?/);

    const formattedText = groups
      .slice(1)
      .filter((group) => !!group)
      .join(' - ');

    return formattedText;
  };

  const isNameValid = (text) => {
    const russianLettersPattern = /^[а-яА-ЯёЁ ]+$/;
    if (text.length < 3 || text.length > 10 || !russianLettersPattern.test(text)) {
      setText(text.replace(/[^а-яёА-ЯЁ\s]/g, ''))
      setNameError("Введите корректное имя")
      setEnabled(false)
      inputValue('')
    }else {
      setNameError('')
      setEnabled(true)
      inputValue(text)
    }
  }
  const isEmailValid = (text) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}[a-zA-Z]*$/;
    if (text.length < 10 || text.length > 30 || !emailPattern.test(text)) {
      setEmailError("Введите корректный e-mail")
      setEnabled(false)
      inputValue('')
    }else {
        setEmailError("")
        setEnabled(true)
      inputValue(text)
    }
  }
  const isPhoneValid = (text) => {
    if (text.replace(/\\D/g, "").length < 10 || text.replace(/\D/g, "").length > 13) {
     setPhoneError("Введите корректный номер телефона")
      setEnabled(false)
      inputValue('')
    }else {
      setPhoneError('')
      setEnabled(true)
      inputValue(text)
    }
  }

  const handleFocus = (value) => {
    setIsFocused(true);
    setStartValidation(true)
    if(type === 'name' ) {
      setNameError(true)
    }
    if(type === 'email') {
      setEmailError(true)
    }
    if(type === 'phone') {
      setPhoneError(true)
    }
  }

  const handleTextChange = (text) => {
    setInputText(formatInputText(text));
  };
  const handleBlur = () => {
    setIsFocused(false);
    setStartValidation(false);
  }

  const handleOpenCode = () => {
    setOpened(!opened)
    setIsFocused(true)
  }

  useEffect(() => {
    (phoneError || nameError || emailError) ?
      setEnabled(false) :
      setEnabled(true)
  } ,[phoneError, nameError, emailError])

  useEffect(() => {
    if(startValidation){
      if(value === "Имя") {
        isNameValid(text)
      } else if ( value === 'E-mail') {
        isEmailValid(text)
      } else if (value === 'Номер телефона') {
        isPhoneValid(inputText)
      }
    } else {
      null
    }
  }, [startValidation, text.length, inputText.length])

  useEffect(() => {
    change &&
    setText('')
    setInputText('')
    setEnabled(false)
    setStartValidation(false)
  },[change])

  return (
    <View
    style={styles.inputComponent}>
    <View
      style={[styles.mainContainer,
        {borderColor:
            (phoneError || nameError || emailError) ? "#FF450B": "#fff",
          backgroundColor: type === 'phone' && !isFocused ? "#fff" : 'transparent'}]}>
      {type !== 'phone' || (!isFocused && !inputText) ?
        <View
        style={[isFocused ? styles.focusedContainer : styles.container, {backgroundColor: type !=='phone' ? "#fff" : 'transparent'}]}>
      {isFocused && type !== 'phone' &&
        <Text
          style={styles.topText}>
          {value}
        </Text>}
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={!isFocused ? value : ""}
          placeholderTextColor="#1E1E20"
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View> :
      <View
        style={styles.phoneInput}>
        <TouchableOpacity
          onPress={handleOpenCode}
        style={styles.dialCode}>
          <Text
          style={{
            color: "#000"
          }}>
            {dialCode}
          </Text>
        </TouchableOpacity>
        <TextInput
          keyboardType='numeric'
          placeholder="(***) - ***--**--**"
          onChangeText={handleTextChange}
          value={inputText}
          placeholderTextColor="#1E1E20"
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>}
    </View>
      {(nameError || emailError || phoneError) &&
        <Text
          style={styles.errorText}>
          {nameError || emailError || phoneError}
        </Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputComponent: {
    width: '100%',
  },
  mainContainer: {
    width: '100%',
    borderRadius: 12,
    marginTop: 16,
    height: 60,
    borderWidth: 1,
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  focusedContainer: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  topText: {
    color: "#60626D",
    fontSize: 12,
    fontWeight: '400'
  },
  input: {
    width: '90%',
    padding: 0,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.25,
    backgroundColor: '#fff',
    color: "#000"
  },
  errorText: {
    fontSize: 13,
    color: "#FF450B",
    marginLeft: 13,
    marginTop: 8
  },
  phoneInput: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    color: "#000"
  },
  dialCode: {
    backgroundColor: '#fff',
    width: '15%',
    marginRight: 5,
    height: '100%',
    color: "#000",
    justifyContent: 'center',
    alignItems: 'center'
  },
})
