<script lang="ts">
	import { onMount } from 'svelte';
	import Room from '../../../components/room.svelte';
	import type { PageData } from './$types';
	import { join } from '$lib/connection/client';

	export let data: PageData;

	onMount(() => {
		join(data.roomId);
	});
</script>

<Room />
