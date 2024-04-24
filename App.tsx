import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Responses } from "./assets/data/Responses";
import { useEffect, useState } from "react";

export default function App() {
  const [response, setResponse] = useState<String>("Shake the Magic 8 Ball!");
  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    Accelerometer.addListener(({ x, y, z }) => {
      if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 5) {
        setResponse(Responses[Math.floor(Math.random() * 20)]);
      }
    });
  }, []);
  const changeResponse = (): void => {
    setResponse(Responses[Math.floor(Math.random() * 20)]);
  };
  return (
    <View style={styles.container}>
      <Text>{response}</Text>
      <Text>Shake to Generate Response</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 64,
  },
});
