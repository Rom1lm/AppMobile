import { Text, StyleSheet, View, Pressable, Link } from "react-native";
import { useRouter } from "expo-router";

export default function Profil() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Réglages</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    bouton: {
        backgroundColor: "lightgray",
        paddingVertical: 10,
        paddingHorizontal: 20, 
        borderRadius: 8
    }
  });
