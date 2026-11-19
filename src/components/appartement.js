import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useFavoris } from "@/components/favorisContext";

export default function Appartement({ logement }) {
  const { isFavorite, basculerfavs } = useFavoris();
  const router = useRouter();
  const segments = useSegments();

  const ouvrirFiche = () => {
    const onglet = segments[1];
    console.log("Ouverture de :", `/${onglet}/${logement.id}`); 
    router.push(`/${onglet}/${logement.id}`);
  }

  return (
    <Pressable onPress={ouvrirFiche} style={styles.card}>
      <Image source={{uri : logement.image}} style={styles.img}/>
      <View style={styles.texte}>
        <Text numberOfLines={2}>Titre :{logement.titre}</Text>
        <Text>Ville : {logement.ville}</Text>
      </View>
      <Text>Prix : {logement.prix}€</Text>
      <Pressable onPress={() => basculerfavs(logement.id)} hitSlop={10}>
        <Text style={styles.star}>{isFavorite.includes(logement.id) ? "★" : "☆"}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    marginBottom : 25,
    marginStart: 5,
    marginEnd: 5,
    paddingEnd: 15,
    borderRadius: 15,
    gap: 15,
  },
  texte: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent :"center",
  },
  img : {
    height: 100,
    width: 100,
    borderWidth: 5,
    borderRadius: 15,
  },
  star: {
    fontSize: 28,
    color: "#f5b301",
  },
});