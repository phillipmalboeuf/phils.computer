<script>
  import { links } from 'svelte-routing'

  import { content } from '../stores/content'

  import A from '../components/a'
  import Document from '../components/document'

  export let id
  $: page = $content.pages.items.find(page => page.fields.identifier === id)
  
</script>

<Document body={page.fields.body} />