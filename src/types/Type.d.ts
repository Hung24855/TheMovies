type Genres = {
  _id: string;
  name: string;
  slug: string;
};

type Country = {
  _id: string;
  name: string;
  slug: string;
};

type ResponseGenres = {
  items: Genres[];
};

type ResponseCountries = {
  items: Country[];
};

type ResponseMovies = {
  seoOnPage: {
    titleHead: string;
    descriptionHead: string;
  };
  breadCrumb: {
    name: string;
    slug?: string;
    isCurrent: boolean;
    position: number;
  }[];
  titlePage: string;
  items: {
    modified: {
      time: Date;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    type: string;
    thumb_url: string;
    poster_url: string;
    sub_docquyen: boolean;
    chieurap: boolean;
    time: string;
    episode_current: string;
    quality: string;
    lang: string;
    year: number;
  }[];
  params: {
    type_slug: string;
    filterCategory: string[];
    filterCountry: string[];
    filterYear: string;
    filterType: string;
    sortField: string;
    sortType: desc | asc;
    pagination: {
      totalItems: number;
      totalItemsPerPage: number;
      currentPage: number;
      pageRanges: number;
    };
  };
};

type MovieDetail = {
  seoOnPage: {
    titleHead: string;
    seoSchema: {
      image: string;
      name: string;
    };
    descriptionHead: string;
  };
  item: {
    tmdb: {
      type: string;
      id: string;
      season: number | null;
      vote_average: number;
      vote_count: number;
    };
    modified: {
      time: Date;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    content: string;
    type: string;
    status: "completed" | "ongoing" | "trailer";
    thumb_url: string;
    poster_url: string;
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    year: number;
    view: number;
    actor: string[];
    director: string[];
    category: {
      id: string;
      name: string;
      slug: string;
    }[];
    country: {
      name: string;
    }[];
    episodes: {
      server_name: string;
      server_data: {
        name: string;
        slug: string;
        link_embed: string;
      }[];
    }[];
  };
};

type MovieType = {
  slug: string|number;
  name: string|number;
};

type MovieContext = {
  params: {
    typeParam?: string;
    slug?: string;
  };
  searchParams: {
    page?: number;
    q?: string;
    sort_field?: string;
    sort_type?: string;
    country?: string;
    category?: string;
    year?: string;
  };
};
