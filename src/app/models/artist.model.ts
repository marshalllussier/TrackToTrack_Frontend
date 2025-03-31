import {Event} from "./event.model";


export interface Artist {
  name: string;
  profilePicture: string;
  spotifyId: string;
  numFollowers: number;
  upcomingEvents: Event[];
}
