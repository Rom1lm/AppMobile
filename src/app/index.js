import { Text, View, StyleSheet } from "react-native";
import Appartement from "@/app/components/appartement.js";

export default function Index() {
  return (
    <View style={styles.container}>
      <Appartement/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img : {
    height: 50,
    width: 50,
  }
});

