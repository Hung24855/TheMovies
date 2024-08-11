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

type InitAction = {
  type: "Init";
  payload: InfoMovie[];
};

type AddAction = {
  type: "Add";
  payload: InfoMovie;
};

type RemoveAction = {
  type: "Remove";
  payload: string;
};


export type ContextAction = InitAction | AddAction | RemoveAction;