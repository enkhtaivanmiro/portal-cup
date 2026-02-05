<template>
	<div class="current-player" v-if="player">
        <div class="camera-frame">
             <!-- Real Camera Feed Placeholder (Spectator would chromakey this) -->
             <div class="camera-placeholder">
                 <img :src="`/hud/img/players/${player.steam64Id}_action.png`" class="action-shot" @error="handleActionError" />
             </div>
             
             <!-- Overlay Info -->
             <div class="player-overlay">
                 <div class="info-row">
                     <div class="hp-armor">
                         <span class="hp">{{ player.state.health }}</span>
                         <div class="armor-icon" v-if="player.state.armor > 0">
                             <img src="/hud/img/icons/armor.svg" />
                         </div>
                     </div>
                     <div class="name-col">
                         <div class="p-name">{{ player.name }}</div>
                         <div class="p-weapon" v-if="activeWeapon">{{ activeWeapon.name.replace('weapon_','') }}</div>
                     </div>
                     <div class="ammo-col" v-if="activeWeapon">
                         {{ activeWeapon.ammo_clip }} / {{ activeWeapon.ammo_reserve }}
                     </div>
                 </div>
                 <div class="stats-row">
                     <!-- Minimal stats on bottom strip -->
                 </div>
             </div>
        </div>
	</div>
</template>

<script>
export default {
    props: ['players', 'spectatingId'],
    computed: {
        player() {
            if (!this.spectatingId || !this.players) return null;
            return this.players.find(p => p.steam64Id === this.spectatingId);
        },
        activeWeapon() {
            if (!this.player || !this.player.weapons) return null;
            return Object.values(this.player.weapons).find(w => w.state === 'active');
        }
    },
    methods: {
        handleActionError(e) { e.target.style.display='none'; }
    }
}
</script>

<style scoped>
.current-player {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 320px;
    height: 180px; /* Taller for cam */
    z-index: 5;
    background: #000; /* Chroma key usually */
    border: 2px solid #555;
    border-bottom: 0;
}

.camera-frame {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.camera-placeholder {
    width: 100%;
    height: 100%;
    background: #222;
}

.action-shot { width: 100%; height: 100%; object-fit: cover; }

.player-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    padding: 10px;
    color: white;
}

.info-row {
    display: flex;
    align-items: flex-end;
    gap: 10px;
}

.hp { font-size: 32px; font-weight: 800; color: #4CAF50; }

.name-col { flex: 1; }
.p-name { font-size: 20px; font-weight: 700; text-transform: uppercase; }
.p-weapon { font-size: 14px; color: #ddd; }

.ammo-col { font-size: 20px; font-weight: 600; }
</style>
