import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Responses } from "./assets/data/Responses";
import { useEffect, useState } from "react";

export default function App() {
  const [response, setResponse] = useState<String>("Shake the Magic 8 Ball!");
  const [canGenerate, setCanGenerate] = useState(true);

  /* 
  TODO: Fix this portion of the code
  - Make the response say "Thinking" when function triggered
  - Prevent function to retrigger when started to trigger
  - Rewrite this logic since it is slightly buggy right now.
  */
  Accelerometer.setUpdateInterval(500);
  const changeResponse = (): void => {
    if (canGenerate) {
      setCanGenerate(false);
      setResponse(Responses[Math.floor(Math.random() * 20)]);
      setTimeout(() => {
        setCanGenerate(true);
      }, 5000);
    }
  };
  useEffect(() => {
    Accelerometer.addListener(({ x, y, z }) => {
      if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 5) {
        console.log("Enabled");
        changeResponse();
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>{response}</Text>
      <Text>Shake to Generate Response</Text>
      <Button title="Test" onPress={changeResponse} />
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
