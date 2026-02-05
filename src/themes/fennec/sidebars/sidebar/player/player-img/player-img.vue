<template>
  <Transition name="fade">
    <div class="player-card">
      <!-- Show player image only if alive -->
            <img
            v-if="player.isAlive"
            :src="playerImage(player.steam64Id)"
            class="player-img"
            alt="player portrait"
            />

      <!-- Show dead icon if player is dead -->
      <div v-else class="dead-icon">
        <img src="/hud/img/icons/dead.svg" alt="dead player">
      </div>
    </div>
  </Transition>
</template>

<style>

.player-img {
  width: 72px;
  height: 72px;

  object-fit: cover;

}

</style>

<script>
export default {
    props: {
    steam64Id: String,
    player: Object,
    },
    methods: {
    playerImage(steam64Id) {
        return steam64Id
        ? `/hud/img/players/${steam64Id}.png`
        : `/hud/img/players/donk.webp`;
    },
    },
};
</script>
