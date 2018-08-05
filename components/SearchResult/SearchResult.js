import React from 'react';
import {connect} from 'react-redux';
import { Text, ScrollView, View, TextInput, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, FlatList, Modal} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import MenuOptions from '../MenuOptions/MenuOptions.js';
import Style from './SearchResultStyle.js';
import firebase from 'firebase';
import 'firebase/database';
import PersonProfile from './PersonProfile.js';

import {updateMenu, updateProfile} from '../AllAction.js';

const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width

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

class ShowMenu extends React.PureComponent {
	render() {
		return (
			<TouchableOpacity
				style={{top: 14, padding: 20}}
				onPress={() => this.props.navigation.goBack()}
			>
				<Icon
					name='arrow-left'
					type="material-community"
					color='#ffffff'
				/>
			</TouchableOpacity>
		);
	}
}

class HeaderView extends React.PureComponent {
	render() {
		return (
			<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
				<Text style={{ fontSize: 22, color: '#fff', width: '70%', textAlign: 'center'}}>Results</Text>
			</View>
		);
	}
}

class SearchResult extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			criminals: {}
		}
		let criminalsDb = firebase.database().ref().child('criminals')
		this.criminalsDb = criminalsDb
	}

	componentWillMount(){
		let self = this
		this.criminalsDb.on("value", function(snapshot) {
			self.setState({criminals: snapshot.val()})
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}

	showProfile = profile => {
		this.props.updateProfile(profile)
		this.props.navigation.navigate('Profile')
	} 

	renderList(item){
		return <TouchableNativeFeedback
				onPress={this.showProfile.bind(this, item)}
			>
				<View style={Style.resultItemContainer}>
				<View style={Style.iconContainerGreen}>
					<Icon
						name='user'
						type="entypo"
						color="#000000"
						size={screenWidth/6}
					/>
				</View>
				<View style={Style.infoContainer}>
					<Text style={Style.searchListText1}>{item.name?item.name:'Name not found'}</Text>
					<Text style={Style.searchListText2}>{item.phone?item.phone:'Phone number not found'}</Text>
					<Text style={Style.searchListText3}>{item.address?item.address:'Address not found'}</Text>
				</View>
				</View>
			</TouchableNativeFeedback>
	}

	_keyExtractor = item => item.key;

	toggleMenu = (state) => {//can be put in ShowOption
		this.props.updateMenu(state)
	}

	getCriminals = () => {
		let {criminals} = this.state
		let Criminals = []
		for(key in criminals){
			Criminals.push({key: key, ...criminals[key]})
		}
		
		return Criminals
	}

	render() {//show loader while data is being fetched!
		let Criminals = this.getCriminals()
		return (
			<View style={Style.rootContainer}>
				<Header
					leftComponent={<ShowMenu navigation={this.props.navigation}/>}
					centerComponent={<HeaderView />}
					rightComponent={<ShowOption toggleMenu={this.toggleMenu}/>}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				<FlatList
					data={Criminals}
					renderItem={({item}) => (this.renderList(item))}
					keyExtractor={this._keyExtractor}
				/>
				<MenuOptions
					toggleMenu={this.toggleMenu}
					updateLogout={this.props.updateLogout}
					navigation={this.props.navigation}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		thana: state.thana,
		chauki: state.chauki,
		halka: state.halka,
		beet: state.beet
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateMenu: (menu) => {
			dispatch(updateMenu(menu))
		},
		updateProfile: (profile) => {
			dispatch(updateProfile(profile))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);