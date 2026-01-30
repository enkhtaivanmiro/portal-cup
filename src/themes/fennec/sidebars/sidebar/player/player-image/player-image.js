import { positionClass } from '/hud/helpers/position-class.js'

export default {
	props: [
		'position',
		'player',
	],

	computed: {
		positionClass,

		playerPicture() {
			if (!this.player) {
				return '/hud/img/players/donk.webp'
			}

			// adjust to whatever identifier you use
			return `/hud/img/players/${this.player.steamid}.png`
		},
	},
}
