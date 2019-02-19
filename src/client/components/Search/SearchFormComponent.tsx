import React from 'react';

import {
	invalidateSearchQuery,
	updateSearchQueryIfNeeded,
	fetchSearchResultIfNeeded,
} from '~/client/actions';

import {
	initialSearchQuery,
	SearchQuery,
} from '~/shared/models';

import {
	Form,
	Input,
	Button,
} from 'semantic-ui-react';

interface ComponentProps {
	invalidateSearchQuery: typeof invalidateSearchQuery;
	updateSearchQueryIfNeeded: typeof updateSearchQueryIfNeeded;
	fetchSearchResultIfNeeded: typeof fetchSearchResultIfNeeded;
}

interface ComponentState {
	searchQuery: SearchQuery;
}

export class SearchFormComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			'searchQuery': {
				...initialSearchQuery,
			},
		};
	}

	public componentDidMount() {
		this.props.invalidateSearchQuery();
	}

	private handleChange(event: React.FormEvent<HTMLInputElement>) {
		const {
			name,
			value,
		} = event.currentTarget;

		this.setState({
			'searchQuery': {
				...initialSearchQuery,
				[name]: value,
			},
		});
	}

	private handleSubmit(event: React.FormEvent) {
		const {
			searchQuery,
		} = this.state;

		this.props.updateSearchQueryIfNeeded(searchQuery);

		event.preventDefault();
	}

	public render() {
		const {
			searchQuery,
		} = this.state;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Field>
					<label>id</label>
					<Input
						name="id"
						value={searchQuery.id}
						onChange={this.handleChange}
					/>
				</Form.Field>
				<Form.Field>
					<label>screen name</label>
					<Input
						name="screenName"
						value={searchQuery.screenName}
						onChange={this.handleChange}
					/>
				</Form.Field>
				<Button type="submit">search</Button>
			</Form>
		);
	}
}
