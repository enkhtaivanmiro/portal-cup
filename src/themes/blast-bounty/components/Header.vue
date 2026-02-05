<template>
	<div class="blast-header">
        <div class="header-top">BLAST BOUNTY</div>
        <div class="header-bottom">QUARTER-FINALS</div>
	</div>
</template>

<style scoped>
.blast-header {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 280px;
    background: var(--color-bg-dark);
    border-left: 4px solid white;
    font-family: 'Quantico', sans-serif;
    color: white;
    display: flex;
    flex-direction: column;
}

.header-top {
    font-size: 14px;
    font-weight: 700;
    padding: 2px 10px;
    background: #111;
    color: #ccc;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.header-bottom {
    font-size: 24px;
    font-weight: 700;
    padding: 5px 10px;
    text-transform: uppercase;
}
</style>
