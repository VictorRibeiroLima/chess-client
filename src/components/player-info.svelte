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
<div class="timer">
	{stringTimer}
</div>

<style>
	.player-id {
		width: 100%;
		height: 50%;
		background-color: red;
	}
	.timer {
		width: 100%;
		height: 50%;
		background-color: blue;
	}
</style>
