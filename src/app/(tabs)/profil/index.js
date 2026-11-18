import { Text, StyleSheet, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Profil() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable onPress={() => router.push("/profil/modale")}>
        <Text style={styles.bouton}>Ouvrir la modale</Text>
      </Pressable>
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