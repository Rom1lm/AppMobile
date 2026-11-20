import { useState, useRef } from "react";
import { Text, View, StyleSheet, Pressable, FlatList, Switch } from "react-native";
import { rechercherParVille } from "@/api/simule";

export default function Recherche() {
  const [ville, setVille] = useState(null);
  const [resultats, setResultats] = useState([]);
  const [statut, setStatut] = useState("attente");
  const [ignorer, setIgnorer] = useState(true);
  const [journal, setJournal] = useState([]);

  const derniereRecherche = useRef(0);
  const derniereVille = useRef(null);
  const villeAffichee = useRef(null);
  const debut = useRef(0);

  const ajouterAuJournal = (message) => {
    const temps = `${Date.now() - debut.current} ms`.padEnd(8);
    setJournal((ancien) => [...ancien, `${temps}→ ${message}`]);
  };

  const rechercher = (nom, delai) => {
    const numero = ++derniereRecherche.current;
    derniereVille.current = nom;
    setStatut("chargement");
    ajouterAuJournal(`recherche ${nom} lancée (${delai} ms)`);

    rechercherParVille(nom, delai).then((data) => {
      const demandee = derniereVille.current;

      if (ignorer && numero !== derniereRecherche.current) {
        ajouterAuJournal(`réponse ${nom.padEnd(7)}→ ignorée (${demandee} reste affiché)`);
        return;
      }

      if (villeAffichee.current && villeAffichee.current !== nom && nom !== demandee) {
        ajouterAuJournal(
          `réponse ${nom.padEnd(7)}→ écrase ${villeAffichee.current}`
        );
      } else {
        ajouterAuJournal(`réponse ${nom.padEnd(7)}→ affiche ${nom}`);
      }

      villeAffichee.current = nom;
      setVille(nom);
      setResultats(data);
      setStatut("succes");
    });
  };

  const lancer = () => {
    debut.current = Date.now();
    villeAffichee.current = null;
    setJournal([]);
    setResultats([]);
    rechercher("Rennes", 2000);
    rechercher("Nantes", 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.optionTexte}>Ignorer les réponses périmées</Text>
        <Switch value={ignorer} onValueChange={setIgnorer} />
      </View>

      <Pressable onPress={lancer} style={styles.bouton}>
        <Text style={styles.boutonTexte}>Rechercher Rennes puis Nantes</Text>
      </Pressable>

      {journal.length > 0 && (
        <View style={styles.journal}>
          {journal.map((ligne, index) => (
            <Text key={index} style={styles.journalLigne}>{ligne}</Text>
          ))}
        </View>
      )}

      {statut === "succes" && (
        <FlatList
          data={resultats}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={
            <Text style={styles.titre}>
              {resultats.length} logement{resultats.length > 1 ? "s" : ""} à {ville}
            </Text>
          }
          ListEmptyComponent={<Text style={styles.vide}>Aucun logement à {ville}</Text>}
          renderItem={({ item }) => (
            <View style={styles.ligne}>
              <Text style={styles.nom}>{item.titre}</Text>
              <Text>{item.ville} · {item.prix} €</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    gap: 16 
},
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  optionTexte: { 
    fontSize: 16 
},
  bouton: { 
    backgroundColor: "#ff5a6098", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center" 

  },
  boutonTexte: { 
    color: "#fff", 
    fontWeight: "bold" 
},
  journal: { 
    backgroundColor: "#222", 
    padding: 12, 
    borderRadius: 8, 
    gap: 4 

  },
  journalTitre: { 
    color: "#fff", 
    fontWeight: "bold", 
    marginBottom: 4 
},
  journalLigne: { 
    color: "#20782fff", 
    fontFamily: "Courier" 
},
  centre: { 
    alignItems: "center", 
    gap: 8, 
    marginTop: 20 
},
  titre: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 12 
},
  vide: { 
    color: "gray", 
    textAlign: "center", 
    marginTop: 20 
},
  ligne: { 
    backgroundColor: "lightgrey", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 10 
},
  nom: { 
    fontWeight: "bold" 
},
});