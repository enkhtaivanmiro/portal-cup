<template>
	<div class="player-bars">
        <div class="side left">
            <div v-for="player in teamLeftPlayers" :key="player.steam64Id" 
                 class="player-panel" :class="{ 'dead': player.state.health == 0, 'active': isSpectating(player) }">
                 
                 <!-- Avatar -->
                 <div class="avatar-box">
                     <img :src="`https://avatars.steamstatic.com/${player.steam64Id}`" @error="handleImgError" class="p-avatar"/> 
                     <!-- Note: using steam CDN as fallback/default if local not present, or use local if preferred -->
                     <img :src="`/hud/img/players/${player.steam64Id}.png`" class="p-avatar local" />
                     <div class="hp-val">{{player.state.health}}</div>
                 </div>

                 <!-- Stats/Info -->
                 <div class="info-box">
                     <div class="name-row">
                         <span class="p-name">{{ player.name }}</span>
                         <span class="p-money">${{ player.state.money }}</span>
                     </div>
                     <div class="eq-row">
                         <!-- Health Bar -->
                         <div class="hp-bar-bg"><div class="hp-bar-fill" :style="{width: player.state.health+'%'}"></div></div>
                         
                         <!-- Weapons -->
                         <div class="weapons">
                              <img v-if="getWeapon(player,'primary')" :src="getWeaponIcon(getWeapon(player,'primary'))" class="w-icon primary"/>
                              <img v-if="getWeapon(player,'secondary')" :src="getWeaponIcon(getWeapon(player,'secondary'))" class="w-icon secondary"/>
                              <div class="nades">
                                  <span v-for="(n,i) in player.grenades" :key="i" class="nade-dot"></span>
                              </div>
                         </div>
                     </div>
                     <div class="kda">
                         <span class="k">{{player.match_stats.kills}}</span> / <span class="d">{{player.match_stats.deaths}}</span>
                     </div>
                 </div>
            </div>
        </div>

        <div class="side right">
             <div v-for="player in teamRightPlayers" :key="player.steam64Id" 
                 class="player-panel" :class="{ 'dead': player.state.health == 0, 'active': isSpectating(player) }">
                 
                 <div class="info-box">
                     <div class="name-row">
                         <span class="p-money">${{ player.state.money }}</span>
                         <span class="p-name">{{ player.name }}</span>
                     </div>
                     <div class="eq-row">
                         <div class="weapons">
                              <div class="nades">
                                  <span v-for="(n,i) in player.grenades" :key="i" class="nade-dot"></span>
                              </div>
                              <img v-if="getWeapon(player,'secondary')" :src="getWeaponIcon(getWeapon(player,'secondary'))" class="w-icon secondary"/>
                              <img v-if="getWeapon(player,'primary')" :src="getWeaponIcon(getWeapon(player,'primary'))" class="w-icon primary"/>
                         </div>
                         <div class="hp-bar-bg"><div class="hp-bar-fill" :style="{width: player.state.health+'%'}"></div></div>
                     </div>
                      <div class="kda">
                         <span class="k">{{player.match_stats.kills}}</span> / <span class="d">{{player.match_stats.deaths}}</span>
                     </div>
                 </div>

                  <div class="avatar-box">
                    <img :src="`/hud/img/players/${player.steam64Id}.png`" class="p-avatar local" />
                     <div class="hp-val">{{player.state.health}}</div>
                 </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
    props: ['players', 'teams'],
	computed: {
        teamLeftPlayers() {
            // Usually Team 0 is CT, verify side
            // Note: teams prop might need better handling if we want to confirm side
            // But players usually have .team.side: 2 (T) or 3 (CT)
            if (!this.players) return [];
            const p = this.players.filter(p => p.team.side === 3); // CT
            return p.length ? p : this.players.slice(0,5); 
        },
        teamRightPlayers() {
             if (!this.players) return [];
             const p = this.players.filter(p => p.team.side === 2); // T
             return p.length ? p : this.players.slice(5,10); 
        },
        spectatingId() { 
            // We can pass this as prop too, but for now we can read global or use a prop if we update shell
            // Let's rely on the miscellaneous global for ID if strictly needed, OR better:
            // Shell should pass it. But I didn't pass it in Shell update above (wait, I passed spectating-id to CurrentPlayer, not PlayerBars).
            // Let's use this.$misc.playerID here as fallback or check if I should update shell again.
            // Using global $misc is usually safe if it's reactive, but props are safer.
            // I'll stick to $misc for ID for now as it's a simple primitive value usually.
            return this.$misc.playerID; 
        }
	},
    methods: {
        isSpectating(p) { return p.steam64Id === this.spectatingId; },
        handleImgError(e) { e.target.style.display='none'; },
        getWeapon(p, slot) {
             if(!p.weapons) return null;
             if(slot === 'primary') return Object.values(p.weapons).find(w => ['Rifle','SniperRifle','Submachine Gun','Machine Gun','Shotgun'].includes(w.type));
             if(slot === 'secondary') return Object.values(p.weapons).find(w => w.type === 'Pistol');
             return null;
        },
        getWeaponIcon(w) {
            if(!w) return '';
            return `/hud/img/weapons/${w.name.replace('weapon_','')}.svg`;
        }
    }
}
</script>

<style scoped>
.player-bars {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px 20px;
    align-items: flex-end;
}

.side {
    display: flex;
    gap: 5px;
}

.player-panel {
    background: rgba(10,15,20,0.9);
    width: 250px;
    height: 70px;
    display: flex;
    border-top: 3px solid #555;
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.left .player-panel { border-color: #0088cc; }
.right .player-panel { border-color: #d39e00; justify-content: flex-end; }
.right .info-box { align-items: flex-end; text-align: right; }

.player-panel.active {
    background: #222;
    transform: translateY(-10px);
}

.avatar-box {
    width: 70px;
    position: relative;
    overflow: hidden;
}

.p-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hp-val {
    position: absolute;
    bottom: 2px;
    left: 2px;
    font-size: 24px;
    font-weight: 800;
    color: white;
    text-shadow: 1px 1px 2px black;
    z-index: 10;
}

.info-box {
    flex: 1;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.name-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 14px;
    font-weight: 700;
}

.eq-row {
    width: 100%;
}

.hp-bar-bg {
    width: 100%;
    height: 4px;
    background: #333;
    margin: 3px 0;
}
.hp-bar-fill {
    height: 100%;
    background: white;
}
.left .hp-bar-fill { background: #0088cc; }
.right .hp-bar-fill { background: #d39e00; }

.weapons {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 20px;
}

.w-icon { height: 16px; filter: invert(1); }

.kda {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #aaa;
    display: none; /* Hide for now unless needed */
}
.active .kda { display: block; }
</style>
