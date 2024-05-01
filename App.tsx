import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics";
import { Responses } from "./assets/data/Responses";
import Magic8Ball from "./assets/components/Magic8Ball";

export default function App() {
  const [response, setResponse] = useState<String>("Shake the Magic 8 Ball!");
  const [canGenerate, setCanGenerate] = useState<Boolean>(true);
  const [isGenerating, setIsGenerating] = useState<Boolean>(false);
  useEffect(() => {
    Accelerometer.setUpdateInterval(250);
    Accelerometer.addListener(({ x, y, z }) => {
      if (!canGenerate) return;
      if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 6) {
        setIsGenerating(true);
        setResponse(`Thinking...`);
        setCanGenerate(false);
        Accelerometer.setUpdateInterval(2250);
        setTimeout(() => {
          setResponse(Responses[Math.floor(Math.random() * 20)]);
          setCanGenerate(true);
          Accelerometer.setUpdateInterval(250);
          setIsGenerating(false);
        }, 2000);
      }
    });
    return () => {};
  }, []);
  return (
    <View style={[styles.container]}>
      <Magic8Ball response={response} />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555555",
    alignItems: "center",
    justifyContent: "center",
    gap: 64,
  },
});
