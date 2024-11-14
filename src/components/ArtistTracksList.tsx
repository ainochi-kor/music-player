import { unknownArtistImageUri } from '@/constants/images'
import { fontSize } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTrackListId } from '@/helpers/miscellaneous'
import { Artist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import QueueControls from './QueueControls'
import TracksList from './TracksList'

interface ArtistTracksListProps {
	artist: Artist
}

const ArtistTracksList: React.FC<ArtistTracksListProps> = ({ artist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in songs ',
		},
	})

	const filteredArtistTracks = useMemo(() => {
		return artist.tracks.filter(trackTitleFilter(search))
	}, [artist.tracks, search])

	return (
		<TracksList
			id={generateTrackListId(artist.name, search)}
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.artworkHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artwortImageContainer}>
						<FastImage
							source={{ uri: unknownArtistImageUri, priority: FastImage.priority.high }}
							style={styles.artistImage}
						/>
					</View>
					<Text numberOfLines={1} style={styles.artistNameText}>
						{artist.name}
					</Text>
					{search.length === 0 && (
						<QueueControls tracks={filteredArtistTracks} style={{ paddingTop: 24 }} />
					)}
				</View>
			}
			tracks={artist.tracks}
		/>
	)
}

export default ArtistTracksList

const styles = StyleSheet.create({
	artworkHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artwortImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
	},
	artistImage: {
		width: '60%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
