import React from 'react';

import {
	Tweet,
} from '../../../shared/models';

interface ComponentProps {
	searchResult: Tweet[];
}

export class SearchResultComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			searchResult,
		} = this.props;

		return (
			<div>
				{searchResult.map((tweet, i) => {
					return (
						<div key={i}>{JSON.stringify(tweet)}</div>
					);
				})}
			</div>
		);
	}
}
