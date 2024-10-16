import { colors } from '@/constants/tokens'
import useTrackPlayerVolume from '@/hooks/useTrackPlayerVolume'
import { utilsStyles } from '@/styles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'

const PlayerVolumeBar = ({ style }: ViewProps) => {
  
  const {volume, updateVolume} = useTrackPlayerVolume()
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(0)

  progress.value = volume ?? 0

	return (
		<View style={style}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Ionicons name="volume-low" size={24} color={colors.icon} style={{ opacity: 0.8 }} />
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						paddingHorizontal: 10,
					}}
				>
					<Slider
						progress={progress}
						minimumValue={min}
						maximumValue={max}
						containerStyle={utilsStyles.container}
						thumbWidth={0}
						renderBubble={() => null}
						theme={{
							minimumTrackTintColor: colors.minimumTrackTintColor,
							maximumTrackTintColor: colors.maximumTrackTintColor,
						}}
						onValueChange={ (value) => {
              updateVolume(value)
						}}
					/>
				</View>
			</View>
		</View>
	)
}

export default PlayerVolumeBar

const styles = StyleSheet.create({})
