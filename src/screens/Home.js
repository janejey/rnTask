import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Dimensions,
  ScrollView,
} from "react-native";
import { Button } from "../components/Button";
import { MyTextInput } from "../components/TextInput";
import { codes } from "../assets/codes";
import { useNavigation } from "@react-navigation/native";

const Home = ({ navigation, route }) => {
  const navi = useNavigation();
  const [enabled, setEnabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhonNum] = useState("");
  const [lengthValid, setLenghtValid] = useState(false);
  const [opened, setOpened] = useState(false);
  const [dialCode, setDialCode] = useState("+7");
  const [update, setUpdate] = useState(false);
  const [clicked, setClicked] = useState(true);
  const [orientation, setOrientation] = useState("PORTRAIT");
  const handleSend = () => {
    navigation.navigate("Success");
    setUpdate(false);
  };

  const handleSetDialCode = (e) => {
    setDialCode(e);
    setOpened(false);
  };
  useEffect(() => {
    name.length && email.length && phoneNum.length
      ? setLenghtValid(true)
      : setLenghtValid(false);
  }, [name, email, phoneNum]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUpdate(true);
    });
    return unsubscribe;
  }, [navi]);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      if (width<height) {
        setOrientation("PORTRAIT")
      } else {
        setOrientation("LANDSCAPE")

      }
    })
  }, []);

  return (
    orientation === 'PORTRAIT' ?
    <View
      style={styles.container}
    >
      <View
        style={styles.firstContainer}>
        <Text style={styles.header}>Забронировать слот</Text>
        <Text style={styles.text}>
          Оставьте контактные данные, и мы с вами свяжемся в ближайший час.
        </Text>
        <MyTextInput
          change={update}
          type="name"
          inputValue={setName}
          setEnabled={setEnabled}
          value="Имя"
        />
        <MyTextInput
          change={update}
          type="email"
          inputValue={setEmail}
          setEnabled={setEnabled}
          value="E-mail"
        />
        <MyTextInput
          change={update}
          dialCode={dialCode}
          setDialCode={setDialCode}
          setOpened={setOpened}
          opened={opened}
          type="phone"
          inputValue={setPhonNum}
          setEnabled={setEnabled}
          value="Номер телефона"
        />
        {opened && (
          <View style={styles.dialCodeContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={codes}
              renderItem={(e) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleSetDialCode(e.item.value)}
                    style={styles.dialCode}
                  >
                    <Text
                      style={{ color: "#000" }}>
                      {e.item.value}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
      <View
        style={{
        width: "100%",
        alignItems: "center",
        marginTop: 20
      }}>
      <View style={styles.buttonContainer}>
        <Button
          isEnabled={enabled && lengthValid && clicked}
          handlePress={handleSend}
          text="Отправить"
        />
      </View>
      <View style={styles.last}>
        {clicked ? (
          <TouchableHighlight
            onPress={() => setClicked(!clicked)}
            style={styles.clicked}
          >
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              source={require("../assets/img.png")}
            />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            onPress={() => setClicked(!clicked)}
            style={{
              overflow: 'hidden',
              borderRadius: 12,
              width: 30,
              height: 30,
              borderWidth: 1,
              borderColor: "#000",
            }}
          >
            <Text></Text>
          </TouchableHighlight>
        )}
        <Text style={{ color: "#60626D", marginLeft: 10, fontSize: 13 }}>
          Я даю согласие на обработку своих данных.
        </Text>
      </View>
      </View>
    </View> :
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.firstContainer}>
          <Text style={styles.header}>Забронировать слот</Text>
          <Text style={styles.text}>
            Оставьте контактные данные, и мы с вами свяжемся в ближайший час.
          </Text>
          <MyTextInput
            change={update}
            type="name"
            inputValue={setName}
            setEnabled={setEnabled}
            value="Имя"
          />
          <MyTextInput
            change={update}
            type="email"
            inputValue={setEmail}
            setEnabled={setEnabled}
            value="E-mail"
          />
          <MyTextInput
            change={update}
            dialCode={dialCode}
            setDialCode={setDialCode}
            setOpened={setOpened}
            opened={opened}
            type="phone"
            inputValue={setPhonNum}
            setEnabled={setEnabled}
            value="Номер телефона"
          />
          {opened && (
            <View style={styles.dialCodeContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={codes}
                renderItem={(e) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleSetDialCode(e.item.value)}
                      style={styles.dialCodeButtons}
                    >
                      <Text
                        style={{ color: "#000" }}>
                        {e.item.value}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 20
          }}>
          <View style={styles.buttonContainer}>
            <Button
              isEnabled={enabled && lengthValid && clicked}
              handlePress={handleSend}
              text="Отправить"
            />
          </View>
          <View style={styles.last}>
            {clicked ? (
              <TouchableHighlight
                onPress={() => setClicked(!clicked)}
                style={styles.clickButton}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  source={require("../assets/img.png")}
                />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                onPress={() => setClicked(!clicked)}
                style={styles.clickedInactive}
              >
              </TouchableHighlight>
            )}
            <Text
              style={{ color: "#60626D", marginLeft: 10, fontSize: 13 }}>
              Я даю согласие на обработку своих данных.
            </Text>
          </View>
        </View>
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "space-between",
  },
  firstContainer: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 33.6,
    color: "#1E1E20",
  },
  text: {
    color: "#60626D",
    textAlign: "center",
    fontFamily: "Raleway",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 21,
    marginTop: 10,
  },
  dialCodeContainer: {
    width: 100,
    height: 200,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  last: {
    flexDirection: "row",
    alignItems: "center",
  },
  dialCode: {
  height: "100$",
  width: "100%",
  borderBottomWidth: 0.5,
  borderBottomColor: "#60626D",
  padding: 5,
  },
  clicked: {
    backgroundColor: "#413DFF",
    borderRadius: 12,
    width: 30,
    height: 30,
    overflow: 'hidden'
  },
  dialCodeButtons: {
    height: "100$",
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#60626D",
    padding: 5,
  },
  clickButton: {
    backgroundColor: "#413DFF",
    borderRadius: 12,
    width: 30,
    height: 30,
    overflow: 'hidden'
  },
  clickedInactive: {
    overflow: 'hidden',
    borderRadius: 12,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#000",
  }
});

export default Home;
