import { utilsStyles } from '@/styles'
import React from 'react'
import { FlatList, FlatListProps, View } from 'react-native'
import { Track } from 'react-native-track-player'
import TrackListItem from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => <View style={{ ...utilsStyles.itemSeparator }} />

const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	const handleTrackSelect = (track: Track) => {
		console.log('Selected track', track)
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}

export default TracksList
