import { StyleSheet, Text, FlatList, TextInput, View, Pressable } from "react-native";
import { useState } from "react"; 
import { SafeAreaView } from "react-native-safe-area-context";
import Appartement from "@/components/appartement.js";

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
  const [ville, setVille] = useState("");   // 👈 un seul état : la ville saisie

  // 👈 la liste filtrée est CALCULÉE à chaque rendu, pas stockée
  const recherche = ville.trim().toLowerCase();
  const logementsFiltres = recherche
    ? Logements.filter((l) => l.ville.toLowerCase() === recherche)   // 👈 l.ville (et pas l.city)
    : Logements;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.titre}>Liste des Logement</Text>  

      <TextInput                                            
        style={styles.input}
        value={ville}
        onChangeText={setVille}
        placeholder="Filtrer par ville (ex. Rennes)"
        autoCapitalize="words"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <FlatList                     
        data={logementsFiltres}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Appartement logement={item} />}
        ListHeaderComponent={
          <Text style={styles.compteur}>
            {logementsFiltres.length} logement{logementsFiltres.length > 1 ? "s" : ""}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.vide}>
            <Text style={styles.videTexte}>Aucun logement à « {ville.trim()} »</Text>
            <Pressable onPress={() => setVille("")} style={styles.bouton}>
              <Text style={styles.boutonTexte}>Effacer le filtre</Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titre: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
    marginBottom: 35,   
  },
  input: {
    margin: 16,
    marginBottom: 0,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  compteur: { 
    color: "gray", 
    marginBottom: 12, 
    marginStart: 5 
  },
  vide: { 
    alignItems: "center", 
    marginTop: 40, gap: 12 
  },
  videTexte: { 
    fontSize: 16, 
    color: "#555" 
  },
  bouton: { 
    backgroundColor: "#FF5A5F", 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 8 
  },
  boutonTexte: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
});