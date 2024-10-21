import libraryJson from '@/assets/data/library.json'
import { TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: libraryJson,
	toggleTrackFavorite: (track: Track) => {},
	addPlaylist: (track: Track, playlistName: string) => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)
export const useFavorites = () => {
	const favorites = useLibraryStore((state) => state.tracks.filter((track) => track.rating === 1))
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return {
		favorites,
		toggleTrackFavorite,
	}
}
