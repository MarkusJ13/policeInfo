import React from 'react';
import {connect} from 'react-redux';
import { Text, ScrollView, View, TextInput, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import MenuOptions from './MenuOptions/MenuOptions.js';
import Style from './AddInformerStyle.js';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import firebase from 'firebase';
import 'firebase/database';

import SelectThana from './SelectThana.js';
import SelectChauki from './SelectChauki.js';
import SelectBeet from './SelectBeet.js';
import SelectCrime from './SelectCrime.js';
import SearchError from './SearchError.js';

import {updateSearchError, updateMenu, updateStations} from './AllAction.js';

class ShowOption extends React.PureComponent {
	render() {
		return (
			<TouchableOpacity
				style={{top: 14, padding: 20}}
				onPress={function(){this.props.toggleMenu(true)}.bind(this)}
			>
				<Icon
					name='dots-three-vertical'
					type="entypo"
					color='#ffffff'
					size={16}
				/>
			</TouchableOpacity>
		);
	}
}

class HeaderView extends React.PureComponent {
	render() {
		return (
			<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
				<Text style={{ fontSize: 22, color: '#fff', width: '70%', textAlign: 'center'}}>Query</Text>
			</View>
		);
	}
}

class QueryCriminal extends React.Component {
	constructor(props) {
		super(props);
		let stationsDb = firebase.database().ref().child('stations')
		this.stationsDb = stationsDb
	}

	componentWillMount(){
		let self = this
		this.stationsDb.on("value", function(snapshot) {
			let stations = snapshot.val() 
			self.props.updateStations(stations)
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !(nextState === this.state)
	}

	toggleMenu = (state) => {
		this.props.updateMenu(state)
	}

	searchResult = () => {
		let {crime, thana, chauki, beet} = this.props
		if(crime && (thana || chauki || beet)){
			this.props.navigation.navigate('Results')
		}
		else if(!crime){
			this.props.updateSearchError({msg: 'Please select crime', msgColor: '#cc2d8d'})
		}
		else{
			this.props.updateSearchError({msg: 'Please select atleast one region', msgColor: '#cc2d8d'})
		}
	}

	render() {
		return (
			<KeyboardAvoidingView style={{flex: 1, height: '100%'}}>
			<ScrollView style={Style.rootContainer} keyboardShouldPersistTaps="always">
				<Header
					centerComponent={<HeaderView />}
					rightComponent={<ShowOption toggleMenu={this.toggleMenu}/>}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				<ScrollView style={Style.formHeader} keyboardShouldPersistTaps="always">
					<Text style={Style.formHeaderText}>Select Crime</Text>
					<SelectCrime />

					<Text style={Style.formHeaderText}>Select Region</Text>
					<SelectThana />
					<SelectChauki />
					<SelectBeet />

					<View style={{}}>
						<Button
							title='Search'
							backgroundColor='#ff0f0f'
							onPress={this.searchResult}
						/>
						<SearchError />
					</View>
				</ScrollView>
			</ScrollView>
			<MenuOptions
				toggleMenu={this.toggleMenu}
				updateLogout={this.props.updateLogout}
				navigation={this.props.navigation}
			/>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		crime: state.crime,
		thana: state.thana,
		chauki: state.chauki,
		beet: state.beet,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateMenu: (menu) => {
			dispatch(updateMenu(menu))
		},
		updateStations: (stations) => {
			dispatch(updateStations(stations))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryCriminal);