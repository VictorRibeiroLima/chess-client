<script lang="ts">
	import { enemyTimerStore, selfTimerStore } from '$lib/connection/client';
	import PlayerInfo from './player-info.svelte';

	export let selfId: string;
	export let enemyId: string;
</script>

<div class="info">
	<div class="player-info">
		<PlayerInfo timerSubscriber={enemyTimerStore} playerId={enemyId} />
	</div>
	<div class="spacer" />
	<div class="player-info">
		<PlayerInfo timerSubscriber={selfTimerStore} playerId={selfId} />
	</div>
</div>

<style>
	.info {
		margin-right: 10px;
		width: 155px;
		height: 800px;
		display: flex;
		flex-direction: column;
		overflow: auto;
		background-color: rgba(238, 212, 172, 0.75);
	}

	.player-info {
		background-color: red;
		width: 100%;
		height: 20%;
	}

	.spacer {
		height: 60%;
		width: 100%;
	}
</style>
