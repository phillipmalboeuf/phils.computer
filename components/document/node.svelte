<script>
  import Mark from './mark'

  import A from '../a'
  import Flex from '../flex'
  import Document from './'
  import Code from '../code'
  import Products from '../products'

  export let node
</script>

{#if node.nodeType === 'heading-2'}
  <h2>{#each node.content as mark}<Mark mark={mark} />{/each}</h2>
{:else if node.nodeType === 'heading-3'}
  <h3>{#each node.content as mark}<Mark mark={mark} />{/each}</h3>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each node.content as mark}<Mark mark={mark} />{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  <p>{#each node.content as mark}<Mark mark={mark} />{/each}</p>

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each node.content as item}<li>{#each item.content as node}<svelte:self node={node} />{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'blockquote'}
  <Code>{#each node.content as code}<svelte:self node={code} />{/each}</Code>

{:else if node.nodeType === 'embedded-entry-block'}
  {#if node.data.target.sys.contentType.sys.id === 'collection'}
  <Products products={node.data.target.fields.products} />

  {:else if node.data.target.sys.contentType.sys.id === 'bookshelf'}
  <div>
    <A to={`/${node.data.target.sys.contentType.sys.id}s/${node.data.target.fields.identifier}`}><span class='huge'>{node.data.target.fields.title}</span></A>
  </div>

  {:else if node.data.target.sys.contentType.sys.id === 'playlist'}
  <article>
    <A to={node.data.target.fields.embedCode} external><span class='big'>{node.data.target.fields.title}</span></A>
    <p>{node.data.target.fields.excerpt}</p>
    <iframe src={node.data.target.fields.embedCode} title={node.data.target.fields.title} width='100%' height='366' frameBorder='0' allow='encrypted-media' />
  </article>

  {:else if node.data.target.sys.contentType.sys.id === 'columns'}
  <br />
  <h6>{node.data.target.fields.title}</h6>
  <Flex quarters>
    {#each node.data.target.fields.columns as column}
    <div><Document body={column.fields.body} /></div>
    {/each}
  </Flex>
  <br />

  {:else if node.data.target.sys.contentType.sys.id === 'embed'}
  <iframe title={node.data.target.fields.title} src={node.data.target.fields.source} frameBorder='0' allow='autoplay; fullscreen' allowFullScreen></iframe>

  {/if}
{/if}