import { FlatList, Text, View, StyleSheet } from "react-native";
import Appartement from "@/components/appartement";
import { useFavoris } from "@/components/favorisContext";
import { Logements } from "@/data/logements";

export default function Favoris() {
  const { isFavorite } = useFavoris();

  // Seulement les logements marqués
  const logementsFavoris = Logements.filter((l) => isFavorite.includes(l.id));

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={logementsFavoris}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <Appartement logement={item} />}
      ListHeaderComponent={<Text style={styles.titre}>Mes favoris</Text>}
      ListEmptyComponent={
        <View style={styles.vide}>
          <Text style={styles.videTexte}>Aucun favori pour l'instant</Text>
          <Text style={styles.videAide}>Touchez ☆ sur un logement pour l'ajouter ici</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  titre: { 
    fontSize: 28, 
    fontWeight: "bold", 
    margin: 16 
  },
  vide: { 
    alignItems: "center", 
    marginTop: 60, 
    gap: 8 
  },
  videTexte: { 
    fontSize: 16, 
    color: "#555" 
  },
  videAide: { 
    color: "gray" 
  },
});