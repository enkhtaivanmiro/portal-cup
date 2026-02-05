<template>
	<div class="scoreboard">
        <!-- Center Block containing everything -->
        <div class="scoreboard-inner">
            <!-- CT TEAM (Left) -->
            <div class="team-block ct">
                <div class="team-logo">
                    <img v-if="teamLeft.logo" :src="`/hud/img/teams/${teamLeft.logo}`" />
                    <span v-else class="fallback-logo">{{ teamLeftName.substring(0,1) }}</span>
                </div>
                <!-- Rounds Won Dots (Optional/Advanced, skipping for now to focus on main layout) -->
                <div class="team-score">{{ teamLeftScore }}</div>
                <div class="team-background"></div>
            </div>

            <!-- TIMER -->
            <div class="timer-block">
                <div class="round-timer" :class="{ 'red': isTimeLow }">{{ formattedTimer }}</div>
                <div class="round-num">ROUND {{ currentRound }} / {{ maxRounds }}</div>
            </div>

            <!-- T TEAM (Right) -->
            <div class="team-block t">
                 <div class="team-score">{{ teamRightScore }}</div>
                 <div class="team-logo">
                    <img v-if="teamRight.logo" :src="`/hud/img/teams/${teamRight.logo}`" />
                    <span v-else class="fallback-logo">{{ teamRightName.substring(0,1) }}</span>
                </div>
                <div class="team-background"></div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
    props: ['teams', 'round', 'map'],
	computed: {
        teamLeft() { return this.teams[0] || {} },
        teamRight() { return this.teams[1] || {} },
        teamLeftName() { return this.teamLeft.name || 'CT' },
        teamRightName() { return this.teamRight.name || 'T' },
        teamLeftScore() { return this.teamLeft.score || 0 },
        teamRightScore() { return this.teamRight.score || 0 },

        currentRound() { return (this.map && this.map.round) ? this.map.round + 1 : 1 },
        maxRounds() { return 24 }, 

        formattedTimer() {
            if (!this.round) return '00:00';
            const time = Math.abs(this.round.phase_ends_in || 0);
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        },
        
        isTimeLow() {
             return (this.round && this.round.phase_ends_in < 10 && this.round.phase === 'live');
        }
	}
}
</script>

<style scoped>
.scoreboard {
	display: flex;
    justify-content: center;
    width: 600px;
    margin: 0 auto;
    padding-top: 0;
    position: relative;
    top: 10px; 
}

.scoreboard-inner {
    display: flex;
    height: 60px;
    width: 100%;
}

.team-block {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    color: white;
    font-weight: 800;
}

.ct { justify-content: flex-end; padding-right: 15px; }
.t { justify-content: flex-start; padding-left: 15px; }

.team-background {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 0;
    background: #0d1015; /* Dark BG */
    border-bottom: 4px solid;
}

/* CT Styling */
.ct .team-background {
    border-color: #0088cc;
    clip-path: polygon(0 0, 100% 0, 92% 100%, 0% 100%);
}
.ct .team-logo { margin-right: 15px; z-index: 2; height: 32px; width: 32px; }
.ct .team-score { font-size: 36px; z-index: 2; min-width: 40px; text-align: center; }

/* T Styling */
.t .team-background {
    border-color: #d39e00;
    clip-path: polygon(8% 0, 100% 0, 100% 100%, 0% 100%);
}
.t .team-logo { margin-left: 15px; z-index: 2; height: 32px; width: 32px; order: 2; }
.t .team-score { font-size: 36px; z-index: 2; min-width: 40px; text-align: center; order: 1; }

.team-logo img { width: 100%; height: 100%; object-fit: contain; }
.fallback-logo { font-size: 20px; }


/* Timer Block */
.timer-block {
    width: 90px;
    background: white;
    z-index: 10;
    clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 -10px; /* Overlap slightly */
    padding-bottom: 5px;
    height: 65px; /* Taller popping out */
    box-shadow: 0 5px 10px rgba(0,0,0,0.5);
}

.round-timer {
    font-size: 26px;
    color: #111;
    font-weight: 800;
}

.round-timer.red { color: #d00; }

.round-num {
    font-size: 10px;
    color: #555;
    font-weight: 700;
}
</style>
