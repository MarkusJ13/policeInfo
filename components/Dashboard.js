import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './Login.js';
import VerifyPhone from './VerifyPhone.js';
import QueryCriminal from './QueryCriminal.js';
import SearchResults from './SearchResult/SearchResult.js';
import PersonProfile from './SearchResult/PersonProfile.js';

const RootStack = createStackNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: {
				header: null,
			}
		},
		Verification: {
			screen: VerifyPhone,
			navigationOptions: {
				header: null,
			}
		},
		Query: {
			screen: QueryCriminal,
			navigationOptions: {
				header: null,
			}
		},
		Results: {
			screen: SearchResults,
			navigationOptions: {
				header: null,
			}
		},
		Profile: {
			screen: PersonProfile,
			navigationOptions: {
				header: null,
			}
		},
	},
	{
	initialRouteName: 'Login',
	},
	{ 
	headerMode: 'screen' 
	}
);

export default class Dashboard extends React.PureComponent {
	render() {
		return <RootStack />;
	}
}