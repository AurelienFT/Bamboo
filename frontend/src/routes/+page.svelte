<script>
	import { css } from 'styled-system/css';
    import {  hstack} from 'styled-system/patterns'
    let logo = "/logo.png"
</script>
 
<div class={hstack({justify: 'space-between', px: '4'})}>
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
</div>
<h1>Feed your Panda with these recipes</h1>
<input placeholder="Search your recipe"/>
