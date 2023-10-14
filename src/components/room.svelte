<script lang="ts">
	import type { Board as BoardType } from '$lib/types/board';
	import { onDestroy, onMount } from 'svelte';
	import { disconnect, roomStore } from '$lib';
	import Board from './board.svelte';
	import type { Color } from '$lib/enums/color';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import Promotion from './promotion.svelte';
	import History from './history.svelte';
	import { boardStore } from '$lib/connection/client';
	import Info from './info.svelte';
	const modalStore = getModalStore();
	let roomId = '';
	let error: string = undefined;

	let selfId: string = '';
	let enemyId: string = '';
	//TODO: Reset button on winner
	let winner: Color = undefined;
	let check: boolean = false;
	let board: BoardType = undefined;

	const loadModal = () => {
		const modalComponent: ModalComponent = {
			// Pass a reference to your custom component
			ref: Promotion,

			props: {
				color: board?.playerColor
			}
		};

		const modal: ModalSettings = {
			type: 'component',

			component: modalComponent
		};
		modalStore.trigger(modal);
	};

	onMount(() => {
		roomStore.subscribe((state) => {
			roomId = state.roomId;
			error = state.error;
			winner = state.winner;
			enemyId = state.enemyId;
			selfId = state.selfId;
			check = state.check;
			if (state.promotion) {
				loadModal();
			}
		});

		boardStore.subscribe((boardState) => {
			board = boardState;
		});
	});

	onDestroy(() => {
		board = undefined;
		roomId = '';
		error = undefined;
		winner = undefined;
		enemyId = undefined;
		selfId = undefined;
		check = false;

		disconnect();
	});
</script>

<div>
	{#if board}
		<h1 class="font-extrabold" style="font-size: xx-large; color: sienna;">Room: {roomId}</h1>
		<br />
		{#if error}
			<h1 class="font-extrabold" style="font-size: large; color: sienna;">{error}</h1>
		{/if}
		{#if check}
			<h1 class="font-extrabold" style="font-size: large; color: sienna;">You are in check!</h1>
		{/if}
		{#if winner}
			<h1 class="font-extrabold" style="font-size: large; color: sienna;">{winner} won!</h1>
		{/if}
		{#if !enemyId}
			<h1 class="font-extrabold" style="font-size: large; color: sienna;">Waiting for enemy...</h1>
		{/if}
		<div style="display: flex; flex-direction: row;">
			<Info {selfId} {enemyId} />
			<Board {board} />
			<History {board} />
		</div>
	{:else}
		<h1 class="font-extrabold" style="font-size: xx-large; color: sienna;">Loading...</h1>
	{/if}
</div>

<style>
</style>
