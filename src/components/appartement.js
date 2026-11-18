import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Appartement({logement}) {
  const [isFavorite, setFavorite] = useState([]);
  const router = useRouter();

  const basculerfavs = (id) =>{
    if(isFavorite.includes(id)){
      setFavorite(isFavorite.filter((fav) => fav !== id))
    }else{
      setFavorite([...isFavorite, id])
    }
  }

  const ouvrirFiche = () => {
    router.push(`/logement/${logement.id}`);
  }

  return (
    <Pressable
      onPress={ouvrirFiche}
      style={styles.card}
    >
      <Image source={{url : logement.image}} style={styles.img}/>
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
  container: {
    flex: 1,
    flexDirection: "column",
  },
  card: {
    backgroundColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    marginBottom : 25,
    marginStart: 5,
    marginEnd: 5,
    borderRadius: 15,
    gap: 15,
  },
  texte: {
    flex: 1,
    alignItems: "start",
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
  }
});