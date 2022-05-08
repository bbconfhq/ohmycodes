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
    #container {
        margin-top: 2rem;
        padding: 1rem;
        border-radius: 0.75rem;

        color: #cacaca;
    }

    ul {
        margin-left: 2.5rem;
        margin-right: 2.5rem;

        li {
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
            .item {
                display: flex;
                justify-content: space-between;

                color: #cacaca;

                white-space: nowrap;

                a {
                  color: currentColor;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }

                time {
                    text-decoration: none;
                }
            }
        }
    }
</style>
