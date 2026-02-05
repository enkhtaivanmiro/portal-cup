<template>
	<div class="blast-sponsor">
        <div class="sponsor-logo">
             <img src="/hud/img/sponsors/blast_logo.png" onerror="this.style.display='none'" />
             <div class="logo-text" v-if="true">A</div> <!-- Fallback symbol -->
        </div>
        <div class="sponsor-text">GAMINGMALTA</div>
	</div>
</template>

<style scoped>
.blast-sponsor {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    background: var(--color-bg-dark);
    padding: 8px 15px;
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
    border-right: 4px solid white;
    gap: 15px;
}

.sponsor-logo {
    width: 40px;
    height: 40px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-text {
    color: black;
    font-weight: 900;
    font-size: 32px;
}

.sponsor-text {
    font-size: 20px;
    font-weight: 700;
    color: white;
    letter-spacing: 1px;
}
</style>
