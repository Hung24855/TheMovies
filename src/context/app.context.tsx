"use client";

import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
} from "react";

export type InfoMovie = {
  slug: string;
  name: string;
  thumb_url: string;
  lang: string;
  year: number;
  quality: string;
  episode_current: string;
  status: string;
};

export type stateType = {
  favoriteMovies: InfoMovie[];
};

export type ContextAction = {
  type: "Init" | "Add" | "Remove";
  payload?: any;
};

export const reducer = (state: stateType, action: ContextAction) => {
  switch (action.type) {
    case "Init":
      return {
        ...state,
        favoriteMovies: action.payload,
      };
    case "Add": {
      const favMovies = [...state.favoriteMovies, action.payload];
      localStorage.setItem("fav-movies", JSON.stringify(favMovies));
      return {
        ...state,
        favoriteMovies: favMovies,
      };
    }
    case "Remove": {
      const favMovies = state.favoriteMovies.filter(
        (item) => item.slug !== action.payload,
      );

      localStorage.setItem("fav-movies", JSON.stringify(favMovies));
      return {
        ...state,
        favoriteMovies: favMovies,
      };
    }
    default:
      return state;
  }
};

const initialState: stateType = {
  favoriteMovies: [],
};
// Tạo context
export const AppContext = createContext<{
  state: stateType;
  dispatch: Dispatch<ContextAction>;
}>({
  state: initialState,
  dispatch: () => null,
});



// Bọc context
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    const favMovies = JSON.parse(localStorage.getItem("fav-movies") || "[]");
    dispatch({
      type: "Init",
      payload: favMovies,
    });
  }, []);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
