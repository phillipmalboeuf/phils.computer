<script lang="ts">
	import '../styles.scss'

	import { DateTime } from 'luxon'
	const available = DateTime.now().plus({ months: 3 }).monthLong
</script>

<div class="app">
	<header>

	</header>

	<main>
		<slot />
	</main>

	<footer>
		<aside>
			<p>140 CAD/hour<br>
			Available as of <strong>{available}</strong></p>
		</aside>

		<nav>
			<a href="mailto:phil@phils.computer" target="_blank" rel="external">phil@phils.computer</a><br>
			<!-- <a href="https://twitter.com/phillipmalboeuf" rel="external">twitter.com/phillipmalboeuf</a><br> -->
			<a href="https://github.com/phillipmalboeuf" target="_blank" rel="external">github.com/phillipmalboeuf</a>
		</nav>
	</footer>
</div>

<style lang="scss">

	main {
	}

	footer {
		position: fixed;
		bottom: 0;
		width: 100vw;
		padding: $base * $scale;

		@media (max-width: $mobile) {
			padding: $mobile_base / $mobile_scale;
		}

		display: flex;
		justify-content: space-between;
		align-items: flex-end;

		aside {
			flex: 2;
		}

		nav {
			text-align: right;
		}
	}
</style>
