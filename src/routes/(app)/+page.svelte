<script lang="ts">
	import { goto } from '$app/navigation';

	let roomId = '';

	const createRoom = () => {
		goto('/room');
	};

	const findMatch = () => {
		console.log('find match');
	};

	const joinRoom = () => {
		console.log('join room ' + roomId);
	};
</script>

<div class="w-full h-full grid grid-cols-1 gap-4 place-items-center items-center">
	<h1 class="font-extrabold" style="font-size: xx-large; color: sienna;">Online chess</h1>
	<div>
		<div class="card p-10 grid grid-cols-1 gap-4 space-y-5">
			<button type="button" class="btn variant-filled" on:click={createRoom}>Create Room</button>
			<button type="button" class="btn variant-filled" on:click={findMatch}>Find match</button>
			<label class="flex flex-col space-y-1">
				<input type="text" class="input text-amber-600" placeholder="room id" bind:value={roomId} />
				<button type="button" class="btn variant-filled" on:click={joinRoom}>Join room</button>
			</label>
		</div>
	</div>
</div>
