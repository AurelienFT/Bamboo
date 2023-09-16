<script>
	import { css } from 'styled-system/css';
    import {  hstack} from 'styled-system/patterns'
	import { afterUpdate } from 'svelte';
    import themeStore, { setTheme } from 'svelte-themes/themeStore';
    let logo = "/logo.png"
</script>
 
<div class={hstack({justify: 'space-between', bg: "bg.inverted", px: '4'})}>
    <div class={hstack({gap: 2})}>
        <div
            class={css({
                fontSize: '2xl',
                fontWeight: 'bold'
            })}
        >
            Bamboo
        </div>
        <img class={css({width: 8 })} src={logo} alt="Bamboo logo" />
    </div>
    <button>
        Connect with github
    </button>
    <button on:click={() => $themeStore.theme == 'light' ? setTheme('dark'): setTheme('light')}>
        {$themeStore.theme ? $themeStore.theme == 'light' ? 'Dark': 'Light': ''}
    </button>
</div>
<h1>Feed your Panda with these recipes</h1>
<input placeholder="Search your recipe"/>
