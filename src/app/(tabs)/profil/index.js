import { Text, StyleSheet, View, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";

export default function Profil() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable onPress={() => router.push("/modale")}>
        <Text style={styles.bouton}>Ouvrir la modale</Text>
      </Pressable>
      <Link href="/profil/recherche" style={styles.lien}>
        Rechercher Rennes puis Nantes
      </Link>
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
