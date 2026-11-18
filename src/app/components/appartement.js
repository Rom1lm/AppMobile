import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState } from "react";

const Logements = [{
  id:1,
  titre:"Logement",
  ville:"Lennon",
  prix:120,
  image:"https://fastly.picsum.photos/id/134/800/450.jpg?hmac=QYVmlerxizcmKZDM8QrvkgPvGHvbIGkV5nJK9sLxN5U"
},
{
  id:2,
  titre:"second Logement pour l'exercice numéro 1 etape 1 je dois rajouter du texte",
  ville:"Rennes",
  prix:400,
  image:"https://fastly.picsum.photos/id/134/800/450.jpg?hmac=QYVmlerxizcmKZDM8QrvkgPvGHvbIGkV5nJK9sLxN5U"
},
{
  id:3,
  titre:"Logement3",
  ville:"Màlaga",
  prix:600,
  image:""
}];

export default function Index() {
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
        <Text style = {styles.titre}>Liste des Logement</Text>
        {Logements.map((logement) => (
        <Pressable key={logement.id} onPress={()=>basculerfavs(logement.id)} style={styles.card}>
          {isFavorite.includes(logement.id) && <Text>⭐</Text>}
          <Image source={{url : logement.image}} style={styles.img}/>
          <View style={styles.texte}>
            <Text numberOfLines={2}>Titre :{logement.titre}</Text>
            <Text>Ville : {logement.ville}</Text>
          </View>
          <Text>Prix : {logement.prix}€</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titre: {
  fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
    marginBottom: 35,   
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