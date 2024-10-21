import TracksList from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const FavoritesScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const favoriteTracks = useFavorites().favorites

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoriteTracks

		return favoriteTracks.filter(trackTitleFilter(search))
	}, [])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList scrollEnabled={false} tracks={favoriteTracks} />
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen
