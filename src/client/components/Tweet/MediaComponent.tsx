import React from 'react';
import { Image } from 'semantic-ui-react';
import { ModalType, openModal } from '~/client/actions';
import { Entities, MediaEntity } from '~/shared/models';

interface ComponentProps {
  entities: Entities;

  openModal: typeof openModal;
}

export class MediaComponent extends React.Component<ComponentProps> {
  constructor(props: ComponentProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(medium: MediaEntity) {
    return () => {
      this.props.openModal(ModalType.MODAL_IMAGE, {
        url: medium.media_url_https,
      });
    };
  }

  public render() {
    const { entities } = this.props;

    return (
      <Image.Group
        size="small"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {entities.media.map((medium) => {
          switch (medium.type) {
            case 'video':
              const video = medium.video_info.variants
                .filter((e: any) => {
                  return e.bitrate !== undefined;
                })
                .sort((a: any, b: any) => {
                  return a.bitrate - b.bitrate;
                })
                .pop();

              return (
                <video
                  className="tweet-video"
                  key={medium.id_str}
                  style={{
                    margin: '0 auto',
                  }}
                  src={video.url}
                  controls={true}
                />
              );
            case 'animated_gif':
              const id = medium.media_url_https.split('/').pop()!.split('.').shift();

              return (
                <video
                  className="tweet-video"
                  key={medium.id_str}
                  style={{
                    margin: '0 auto',
                  }}
                  src={`https://video.twimg.com/tweet_video/${id}.mp4`}
                  controls={true}
                />
              );
            case 'photo':
            default:
              return (
                <Image
                  key={medium.id_str}
                  style={{
                    margin: '0 auto',
                  }}
                  src={medium.media_url_https}
                  rounded={true}
                  onClick={this.handleClick(medium)}
                />
              );
          }
        })}
      </Image.Group>
    );
  }
}
