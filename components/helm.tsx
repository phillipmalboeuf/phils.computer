import * as React from 'react'
import { SFC } from 'react'
import { Helmet } from 'react-helmet'
import { ContentContext } from '../contexts/content'


export const Helm: SFC<{
  title: string
  description?: string
}> = props => {
  return <ContentContext.Consumer>
    {({ content, locale }) => <Helmet
      defaultTitle={content.header.fields.title}
      titleTemplate={`${content.header.fields.title} – %s`}
    >
      <html lang={locale ? locale.split('-')[0] : 'en'} />
      {['en-US', 'fr-CA'].filter(locale => locale !== locale).map(locale => <link rel='alternate' href={`${process.env.REDIRECT_ROOT}/${locale}`} hrefLang={locale} key={locale}/>)}
      <title>{props.title}</title>
      {props.description && <meta name='description' content={props.description} />}
    </Helmet>}
  </ContentContext.Consumer>
}
