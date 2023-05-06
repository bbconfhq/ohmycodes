<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
  import {formatDate} from '../utils/formatDate';

  export let items = [];
</script>

<div id="container" class="shadow glass">
  <ul>
    {#each items as item}
      <li>
        <div class="item">
          <a href={`/${item.id}`}>{item.title}</a>
          <time datetime={item.created_at}>{formatDate(item.created_at)}</time>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">

  ul {
    display: block;
    max-width: 600px;
    margin: 3rem auto;
    list-style: none;
    border: 1px solid var(--gray2);
    border-radius: 6px;
  }

  li {
    padding: 0 1rem;
    &:not(:last-child) {
      border-bottom: 1px solid var(--gray2);
    }
  }

  .item {
    display: flex;
    height: 3rem;
    line-height: 3rem;
    justify-content: space-between;
    align-content: center;

    a {
      color: var(--blue1);
    }

    time {
      font-size: 14px;
      color: var(--gray2);
    }
  }
</style>

