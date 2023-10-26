<script lang="ts">
	import { millisecondsToString } from '$lib/utils/time';
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';

	export let playerId: string;
	export let timerSubscriber: Readable<number>;
	let timer = 0;

	onMount(() => {
		timerSubscriber.subscribe((state) => {
			timer = state;
		});
	});

	$: stringTimer = millisecondsToString(timer);
</script>

<div class="player-id">
	{#if playerId}
		{playerId}
	{:else}
		Waiting...
	{/if}
</div>
<div class="timer-container">
	<img
		src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Another-Clock.gif?20220725113054"
		alt="Clock GIF"
		class="clock-gif"
	/>
	<div class="timer">
		{stringTimer}
	</div>
</div>

<style>
	.player-id {
		width: 100%;
		height: 50%;
		font-size: small;
	}

	.timer-container {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		height: 50%;
	}

	.timer {
		width: 50%;
		height: 35%;
		text-align: center;
	}

	.clock-gif {
		max-width: 20%;
		height: auto;
	}
</style>
