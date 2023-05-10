import React from 'react';
import twitter from 'twitter-text';
import { Entities } from '~/shared/models';

interface TextProps {
  text: string;
  entities: Entities;
}

export class TextComponent extends React.Component<TextProps> {
  public render() {
    const { text, entities } = this.props;

    if (text === undefined) {
      return null;
    }

    return (
      <div className="text">
        <div
          dangerouslySetInnerHTML={{
            __html: twitter
              .autoLink(text, {
                urlEntities: entities.urls,
              })
              .replace(/\n/g, '<br />'),
          }}
        />
      </div>
    );
  }
}
