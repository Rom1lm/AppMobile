import { createContext, useContext, useState } from "react";

const FavorisContext = createContext();

export function FavorisProvider({ children }) {
  const [isFavorite, setFavorite] = useState([]);

  const basculerfavs = (id) => {
    if (isFavorite.includes(id)) {
      setFavorite(isFavorite.filter((fav) => fav !== id));
    } else {
      setFavorite([...isFavorite, id]);
    }
  };

  return (
    <FavorisContext.Provider value={{ isFavorite, basculerfavs }}>
      {children}
    </FavorisContext.Provider>
  );
}

export function useFavoris() {
  return useContext(FavorisContext);
}