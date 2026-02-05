import Center from '/hud/top-bar/center/center.vue'
import Digits from '/hud/digits/digits.vue'
import SeriesName from '/hud/top-bar/series-name/series-name.vue'
import Team from '/hud/top-bar/team/team.vue'

export default {
	components: {
		Center,
		Team,
		SeriesName,

	},

	data() {
		return {
			$teams: [
				{ name: 'HUNS', score: 0, },
				{ name: 'TEST', score: 0, },
			],
		}
	},
}
