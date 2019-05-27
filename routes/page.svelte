<script>
  import { links } from 'svelte-routing'
  import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'

  import { rich } from '../helpers/formatters'
  import { content } from '../stores/content'

  import A from '../components/a'

  export let id
  $: page = $content.pages.items.find(page => page.fields.identifier === id)
  
  // function body(node, {body, components}) {
  //   const html = rich(page.fields.body, {
  //     [INLINES.ENTRY_HYPERLINK]: (node, next)=> {
  //       console.log(next(node.content))
  //       setTimeout(function() { new A({ target: document.getElementById(node.data.target.sys.id), props: {
  //         to: `/${node.data.target.sys.contentType.sys.id}s/${node.data.target.fields.identifier}`,
  //         underline: true,
  //         child: next(node.content)
  //       } }) }, 1000)
  //       return `<span id='${node.data.target.sys.id}'></span>`
  //     }
  //   })
  // }
</script>

<!-- {@html rich(page.fields.body, {
  [INLINES.ENTRY_HYPERLINK]: (node, next)=> {
    console.log(next(node.content))
    setTimeout(function() { new A({ target: document.getElementById(node.data.target.sys.id), props: {
      to: `/${node.data.target.sys.contentType.sys.id}s/${node.data.target.fields.identifier}`,
      underline: true
    } }) }, 1000)
    return `<span id='${node.data.target.sys.id}'></span>`
  }
})} -->

<!-- <section use:body={page.fields.body} /> -->

{@html rich(page.fields.body)}