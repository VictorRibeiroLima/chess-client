<script>
	import '../app.postcss';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Modal background={'bg-primary-300'} />
<div class="chess-background bg-primary-900">
	<slot />
</div>

<style>
	.chess-background {
		background-image: url('images/chess-background.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: white;
		z-index: 11;
	}
</style>
