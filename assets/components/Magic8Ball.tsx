import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const Magic8Ball = ({ response }: { response: String }) => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View
      style={[
        styles.container,
        {
          width: windowWidth * 0.9,
          height: windowWidth * 0.9,
          borderRadius: windowWidth / 2,
          backgroundColor: "#000",
        },
      ]}
    >
      <View
        style={[
          styles.innerContainer,
          {
            width: windowWidth * 0.45,
            height: windowWidth * 0.45,
            borderRadius: windowWidth / 2,
            backgroundColor: "#11168f",
          },
        ]}
      >
        <Text style={styles.text}>{response}</Text>
      </View>
    </View>
  );
};

export default Magic8Ball;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});
