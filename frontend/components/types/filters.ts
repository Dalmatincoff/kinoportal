import { SortingNames } from "@redux/filtersApi";

export interface FilterProps {
  title: string;
}

export interface FilterGenre {
  value: string;
  title: string;
}

export interface FilterCountry {
  value: string;
  title: string;
}
export interface FilterYear {
  value: number[];
  title: string;
}

export interface FilmsSorting {
  name: SortingNames;
  title: string;
}

export interface FiltersFromPathDynamicKeys {
  [key: string]: string[] | number[];
}

export interface FiltersFromQueryDynamicKeys {
  [key: string]: string | number;
}

export interface FiltersFromPath extends FiltersFromPathDynamicKeys {
  genre: string[];
  country: string[];
  year: number[];
}

export interface FiltersFromQuery extends FiltersFromQueryDynamicKeys {
  rating: number;
  mark: number;
  director: string;
  actor: string;
}
