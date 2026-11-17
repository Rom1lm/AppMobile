import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

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
  return (
    <ScrollView style={styles.container}> 
        {Logements.map((logement) => (
        <View key={logement.id} style={styles.card}>
          <Image source={{url : logement.image}} style={styles.img}/>
          <View style={styles.texte}>
            <Text>Titre :{logement.titre}</Text>
            <Text>Ville : {logement.ville}</Text>
          </View>
          <Text>Prix : {logement.prix}€</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom : 25,
    gap: 15,
  },
  texte: {
    flex: 1,
    alignItems: "left",
    justifyContent :"center",
  },
  img : {
    height: 100,
    width: 100,
    borderWidth: 5,
    borderRadius: 15,
  }
});