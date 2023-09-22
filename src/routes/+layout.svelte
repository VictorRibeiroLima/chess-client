<script>
	import '../app.postcss';
</script>

<div class="chess-background">
	<slot />
</div>

<style>
	.chess-background {
		background-image: url('src/assets/chess-background.jpg');
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
	}
</style>
