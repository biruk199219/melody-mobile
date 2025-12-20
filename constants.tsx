import { Song, Artist } from './types';

export const GENRES = [
  'Pop', 'Hip Hop', 'Slow', 'EDM', 'Ethiopian', 'Afrobeat', 'YouTube Top 10', 'Others'
];

export const ARTISTS: Artist[] = [
  { id: '1', name: 'Teddy Afro', photo: 'https://picsum.photos/seed/teddy/1200/600', followers: 5000000 },
  { id: '2', name: 'Abel Tesfaye (The Weeknd)', photo: 'https://picsum.photos/seed/abel/1200/600', followers: 12000000 },
  { id: '3', name: 'Rihanna', photo: 'https://picsum.photos/seed/rihanna/1200/600', followers: 8000000 },
  { id: '4', name: 'Burna Boy', photo: 'https://picsum.photos/seed/burna/1200/600', followers: 3200000 },
];

export const MOCK_SONGS: Song[] = [
  { id: 's1', title: 'Ethiopia', artist: 'Teddy Afro', duration: '4:12', cover: 'https://picsum.photos/seed/song1/300/300', genre: 'Ethiopian', rating: 4.8, comments: [] },
  { id: 's2', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', cover: 'https://picsum.photos/seed/song2/300/300', genre: 'Pop', rating: 4.9, comments: [] },
  { id: 's3', title: 'Last Last', artist: 'Burna Boy', duration: '3:52', cover: 'https://picsum.photos/seed/song3/300/300', genre: 'Afrobeat', rating: 4.5, comments: [] },
  { id: 's4', title: 'Diamonds', artist: 'Rihanna', duration: '4:05', cover: 'https://picsum.photos/seed/song4/300/300', genre: 'Pop', rating: 4.7, comments: [] },
  { id: 's5', title: 'Levels', artist: 'Avicii', duration: '3:19', cover: 'https://picsum.photos/seed/song5/300/300', genre: 'EDM', rating: 5.0, comments: [] },
  { id: 's6', title: 'Godzilla', artist: 'Eminem', duration: '3:30', cover: 'https://picsum.photos/seed/song6/300/300', genre: 'Hip Hop', rating: 4.6, comments: [] },
  { id: 's7', title: 'Marakiye', artist: 'Teddy Afro', duration: '4:45', cover: 'https://picsum.photos/seed/song7/300/300', genre: 'Ethiopian', rating: 4.9, comments: [] },
];
