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

  // const changeResponse = (): void => {
  //   if (canGenerate) {
  //     setCanGenerate(false);
  //     setResponse(Responses[Math.floor(Math.random() * 20)]);
  //     setTimeout(() => {
  //       setCanGenerate(true);
  //     }, 5000);
  //   }
  // };
  useEffect(() => {
    Accelerometer.setUpdateInterval(250);
    Accelerometer.addListener(({ x, y, z }) => {
      if (!canGenerate) return;
      if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 6) {
        const myDate1 = new Date();
        setResponse(`Thinking...`);
        console.log(`Started: ${myDate1.toString()}`);
        setCanGenerate(false);
        Accelerometer.setUpdateInterval(2250);
        setTimeout(() => {
          setResponse(Responses[Math.floor(Math.random() * 20)]);
          setCanGenerate(true);
          Accelerometer.setUpdateInterval(250);
        }, 2000);
      }
    });
    return () => {};
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: canGenerate ? "#fff" : "#ff0000" }]}>
      <Text>{response}</Text>
      <Text>Shake to Generate Response</Text>
      {/* <Button title="Test" onPress={changeResponse} /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 64,
  },
});
