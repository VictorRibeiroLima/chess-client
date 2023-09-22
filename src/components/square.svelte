<script lang="ts">
	export let x: number;
	export let y: number;
	export let column: string;
	export let row: number;
	export let onDragStart = (event: DragEvent) => {
		event.preventDefault();
	};
	export let onDragDrop: (event: DragEvent) => void;
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
    position: absolute;
    top: {x * 100}px;
    left: {y * 100}px;
    width: 100px;
    height: 100px;
    background-color: {color};
    z-index: 9;
    "
	id={`${column}${row}`}
	{role}
	tabindex="-1"
	draggable="true"
	on:dragstart={onDragStart}
	on:dragover={onDragOver}
	on:drop={onDragDrop}
>
	<slot />
</div>
