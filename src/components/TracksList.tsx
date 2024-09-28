import library from '@/assets/data/library.json'
import React from 'react'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'

export type TracksListProps = Partial<FlatListProps<unknown>>

const ItemDivider = () => (
	<View style={{...utilsStyles.itemSeparator}} />
)

const TracksList = ({ ...flatlistProps }: TracksListProps) => {
	return (
		<FlatList
			data={library}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem
					track={{
						...track,
						image: track.artwork,
					}}
				/>
			)}
			{...flatlistProps}
		/>
	)
}

export default TracksList
