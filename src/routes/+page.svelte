<script>
</script>

<svelte:head>
	<title>Phil's Computer</title>
	<meta name="description" content="Freelance web developer" />
</svelte:head>

<section>
	<h1>
		Phil's Computer
	</h1>

	<iframe src="https://app.vectary.com/p/25dQk4aOavdhC8SOnjL1NQ" frameborder="0" width="100vw" height="100vh"></iframe>
</section>

<style lang="scss">
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	h1 {
		pointer-events: none;
		width: 100%;
		font-size: 9.88vh;
		line-height: 0.666;
		z-index: 2;
		margin-bottom: 10vh;

		:global(.dark) & {
			font-family: 'New Rocker', serif;
		}

		@media (min-width: $mobile) {
			font-size: 16.66vw;
			margin-bottom: 20vh;
		}

		@supports (mix-blend-mode: exclusion) {
			color: $white;
			mix-blend-mode: exclusion;
		}
	}

	iframe {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		:global(.dark) & {
			@supports (mix-blend-mode: exclusion) {
				mix-blend-mode: hard-light;
			}
		}
	}
</style>
