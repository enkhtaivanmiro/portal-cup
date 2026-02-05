<template>
	<div class="blast-shell">
        <div v-if="!isConnected" class="waiting-screen">
            WAITING FOR GAME DATA...
        </div>

        <template v-else>
            <Header />
            <Sponsor />
            <Radar />
            
            <Scoreboard 
                :teams="teams" 
                :round="round" 
                :map="map" 
            />
            
            <div class="center-stage">
                <CurrentPlayer 
                    :players="players" 
                    :spectating-id="misc.playerID" 
                />
            </div>

            <PlayerBars 
                :players="players" 
                :teams="teams" 
            />
        </template>
	</div>
</template>

<script>
import Header from '../components/Header.vue'
import Sponsor from '../components/Sponsor.vue'
import Radar from '../components/Radar.vue'
import Scoreboard from '../components/Scoreboard.vue'
import PlayerBars from '../components/PlayerBars.vue'
import CurrentPlayer from '../components/CurrentPlayer.vue'

export default {
	components: {
        Header,
        Sponsor,
        Radar,
		Scoreboard,
		PlayerBars,
        CurrentPlayer
	},
    data() {
        return {
            isConnected: false,
            players: [],
            teams: [],
            round: {},
            map: {},
            misc: {},
            bomb: {}
        }
    },
    watch: {
        $players: {
            deep: true,
            handler(v) { this.players = v || []; }
        },
        $teams: {
            deep: true,
            handler(v) { this.teams = v || []; }
        },
        $round: {
            deep: true,
            handler(v) { this.round = v || {}; }
        },
        $map: {
            deep: true,
            handler(v) { 
                this.map = v || {}; 
                if (this.map.name) this.isConnected = true; 
            }
        },
        $misc: {
            deep: true,
            handler(v) { this.misc = v || {}; }
        },
        $bomb: {
            deep: true,
            handler(v) { this.bomb = v || {}; }
        }
    },
    mounted() {
        // Initial populate if data already exists
        if (this.$map && this.$map.name) {
            this.map = this.$map;
            this.isConnected = true;
        }
        if (this.$players) this.players = this.$players;
        if (this.$teams) this.teams = this.$teams;
        if (this.$round) this.round = this.$round;
        if (this.$misc) this.misc = this.$misc;
    }
}
</script>

<style scoped>
.blast-shell {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
    pointer-events: none;
    /* Ensure transparent background for OBS */
    background: transparent; 
}

.waiting-screen {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 4px black;
    pointer-events: none;
}

.blast-shell > * {
    pointer-events: auto;
}

.center-stage {
    flex: 1;
    position: relative;
}
</style>
