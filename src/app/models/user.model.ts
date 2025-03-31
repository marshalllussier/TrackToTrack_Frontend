import {Artist} from "./artist.model";

export interface User {
  spotifyUsername: string;
  spotifyPfp: string;
  topArtists: Artist[];
}
