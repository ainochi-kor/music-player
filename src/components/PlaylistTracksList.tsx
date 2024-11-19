import { fontSize } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTrackListId } from '@/helpers/miscellaneous'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import QueueControls from './QueueControls'
import TracksList from './TracksList'

interface PlaylistTracksListProps {
	playlist: Playlist
}

const PlaylistTracksList: React.FC<PlaylistTracksListProps> = ({ playlist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in playlist',
		},
	})

	const filteredPlaylistTracks = useMemo(() => {
		return playlist.tracks.filter(trackTitleFilter(search))
	}, [playlist.tracks, search])

	return (
		<TracksList
			id={generateTrackListId(playlist.name, search)}
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.playlistHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage source={{ uri: playlist.artworkPreview }} style={styles.artworkImage} />
					</View>
					<Text numberOfLines={1} style={styles.playlistNameText}>
						{playlist.name}
					</Text>
					{search.length === 0 && (
						<QueueControls style={{ paddingTop: 24 }} tracks={playlist.tracks} />
					)}
				</View>
			}
			tracks={[]}
		/>
	)
}

export default PlaylistTracksList

const styles = StyleSheet.create({
	playlistHeaderContainer: {
		flex: 1,
		paddingBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 300,
	},
	artworkImage: {
		width: '85%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	playlistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})