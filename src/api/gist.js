// Vrai réseau : les 100 logements du gist (Internet nécessaire).
const URL =
  "https://gist.githubusercontent.com/Fabsforce/a76097aa83d4f5d1b3c5c9868e2d51d3/raw/25d6501b6a6969268b47b489b32629f2d0eb223d/logements.json";

export async function chargerLogements() {
  const res = await fetch(URL);
  // fetch ne rejette PAS sur une erreur HTTP (404, 500…) : c'est à nous de vérifier
  if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
  const data = await res.json();

  console.log("Premier logement du gist :", data[0]);   // 👈 TEST : pour voir les vrais noms des champs

  // 👈 On traduit les champs anglais vers les noms utilisés dans l'appli
  return data.map((l) => ({
    id: l.id,
    titre: l.title ?? l.titre,
    ville: l.city ?? l.ville,
    prix: l.price ?? l.prix,
    image: l.image ?? l.imageUrl ?? l.photo ?? "",
  }));
}