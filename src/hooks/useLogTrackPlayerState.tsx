import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged]

export const useLogTrackPlayerState = () => {
	useTrackPlayerEvents(events, async (event) => {
		if (event.type === Event.PlaybackState) {
			console.log('playback state', event.state)
		}

		switch (event.type) {
			case Event.PlaybackState:
				console.log('playback state', event)
				break
			case Event.PlaybackError:
				console.error('playback error', event.code)
				break
			case Event.PlaybackActiveTrackChanged:
				console.log('playback track changed', event.index)
				break
		}
	})
}
