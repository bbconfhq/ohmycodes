<script lang="ts">
  import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
  import './app.css';
</script>

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
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  header {
    margin: 0 auto 2rem;
    #title {
      font-weight: 500;
      text-align: center;

      a {
        color: var(--blue1);
        text-decoration: none;
      }
    }
  }
</style>
