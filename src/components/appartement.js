import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState } from "react";



export default function Appartement({logement}) {
  const [isFavorite, setFavorite] = useState([]);

  const basculerfavs = (id) =>{
    if(isFavorite.includes(id)){
      setFavorite(isFavorite.filter((fav) => fav !== id))
    }else{
      setFavorite([...isFavorite, id])
    }
  }

  return (
    <ScrollView style={styles.container}> 
        <Pressable key={logement.id} onPress={()=>basculerfavs(logement.id)} style={styles.card}>
          {isFavorite.includes(logement.id) && <Text>⭐</Text>}
          <Image source={{url : logement.image}} style={styles.img}/>
          <View style={styles.texte}>
            <Text numberOfLines={2}>Titre :{logement.titre}</Text>
            <Text>Ville : {logement.ville}</Text>
          </View>
          <Text>Prix : {logement.prix}€</Text>
        </Pressable>
    </ScrollView>
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
  }
});