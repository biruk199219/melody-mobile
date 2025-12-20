export enum UserAccountType {
  FREE = 'FREE',
  PRIMARY = 'PRIMARY'
}

export interface User {
  id: string;
  email: string;
  type: UserAccountType;
  followedArtists: string[];
  likedSongs: string[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  genre: string;
  rating: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userEmail: string;
  text: string;
  timestamp: number;
}

export interface Artist {
  id: string;
  name: string;
  photo: string;
  followers: number;
}
