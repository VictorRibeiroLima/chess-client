<script lang="ts">
	import { onMount } from 'svelte';
	import Room from '../../../components/room.svelte';
	import { start } from '$lib';

	onMount(() => {
		start();
	});
</script>

<Room />
