<script lang="ts">
	export let x: number;
	export let y: number;
	export let column: string;
	export let row: number;
	export let onDragStart = (event: DragEvent) => {
		event.preventDefault();
	};
	export let onDragDrop = (event: DragEvent) => {
		event.preventDefault();
	};
	export let onClick = (event: MouseEvent) => {};

	export let role: string;
	let color: string;

	if ((x + y) % 2) {
		color = '#ac7d58';
	} else {
		color = '#eed4ac';
	}

	const onDragOver = (event: DragEvent) => {
		event.preventDefault();
	};
</script>

<div
	style="
    top: {x * 100}px;
    left: {y * 100}px;
    background-color: {color};
    "
	id={`${column}${row}`}
	{role}
	tabindex="-1"
	draggable="true"
	class="square"
	on:dragstart={onDragStart}
	on:dragover={onDragOver}
	on:drop={onDragDrop}
	on:click={onClick}
>
	{#if column === 'a'}
		<div class="row-label">
			{row}
		</div>
	{/if}
	{#if x === 7}
		<div class="column-label">
			{column}
		</div>
	{/if}

	<slot />
</div>

<style>
	.square {
		position: absolute;
		width: 100px;
		height: 100px;
		z-index: 9;
	}

	.row-label {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
		color: black;
	}

	.column-label {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1000;
		color: black;
	}
</style>
