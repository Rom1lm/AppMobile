import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Logements } from "@/data/logements";

export default function FicheFavori() {
  const { id } = useLocalSearchParams();

  const logement = Logements.find((l) => String(l.id) === id);

  if (!logement) {
    return (
      <View style={styles.vide}>
        <Text>Logement introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      {logement.image ? (
        <Image source={{ uri: logement.image }} style={styles.img} />
      ) : (
        <View style={[styles.img, styles.pasImage]} />
      )}

      <View style={styles.infos}>
        <Text style={styles.titre}>{logement.titre}</Text>
        <Text style={styles.ville}>📍 {logement.ville}</Text>
        <Text style={styles.prix}>{logement.prix} € / nuit</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    height: 250,
  },
  pasImage: {
    backgroundColor: "#ccc",
  },
  infos: {
    padding: 20,
    gap: 10,
  },
  titre: {
    fontSize: 22,
    fontWeight: "bold",
  },
  ville: {
    fontSize: 16,
    color: "gray",
  },
  prix: {
    fontSize: 18,
    fontWeight: "600",
  },
  vide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});