<script lang="ts">
	import { afterUpdate } from 'svelte';
	import DarkMode from 'svelte-dark-mode';

	let theme;

	afterUpdate(() => {
	    document.body.className = theme;
	});

	import '../app.css';
</script>

<DarkMode bind:theme />

<main id="root">
	<header>
		<h1 id="title"><a href="/">ohmy.codes</a></h1>
	</header>
	<div id="content">
		<slot />
	</div>
</main>

<style lang="scss">
	#root {
		min-height: 100%;
		padding: 2rem;

		background: radial-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.15));

		header {
			h1 {
				text-align: center;
				margin-bottom: 2.5rem;

				a {
					color: rgba(255, 255, 255, 0.7);
					text-decoration: none;
					letter-spacing: 4px;
				}
			}
		}

		#content {
			max-width: 100%;
			margin: 0 auto;
		}
	}
</style>
