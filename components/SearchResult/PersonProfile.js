import React from 'react';
import {connect} from 'react-redux';
import { Text, ScrollView, View, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, FlatList, Modal} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import MenuOptions from '../MenuOptions/MenuOptions.js';
import Style from './SearchResultStyle.js';

const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const minScreen = Math.min(screenHeight, screenWidth)

class ShowMenu extends React.Component {
	render() {
		return (
			<TouchableOpacity
				style={{top: 36, padding: 20}}
				onPress={() => {this.props.navigation.goBack()}}
			>
				<Icon
					name='arrow-left'
					type="material-community"
					color='#ffffff'
				/>
				<Text> </Text>
			</TouchableOpacity>
		);
	}
}

class HeaderView extends React.Component {
	render() {
		return (
			<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
				<Text style={{ fontSize: 22, color: '#fff', width: '70%', textAlign: 'center'}}>{this.props.name}</Text>
			</View>
		);
	}
}

class PersonProfile extends React.Component {
	constructor(){
		super();
		this.state = {
			Height_Layout : '',
			Width_Layout : '',
			infoStyle: {},
			subInfoStyle: {},
			landscape: false
		}
	}

	componentDidMount(){
		this.DetectOrientation()
	}

	DetectOrientation = () => {
		if(this.state.Width_Layout > this.state.Height_Layout){
			this.setState({
				infoStyle : {flexDirection: 'row'},
				subInfoStyle: {height: '100%', marginTop: 0},
				landscape: true
			});
		}
		else{
			this.setState({
				infoStyle : {flexDirection: 'column'},
				subInfoStyle: {},
				landscape: false
			});
		}
	}

	render() {
		let {profile} = this.props
		return (
			<View style={Style.rootContainer} onLayout={(event) => this.setState({Width_Layout : event.nativeEvent.layout.width, Height_Layout : event.nativeEvent.layout.height}, ()=> this.DetectOrientation())}>
				<Header
					leftComponent={<ShowMenu navigation={this.props.navigation}/>}
					centerComponent={<HeaderView name={profile.name}/>}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				<View style={this.state.infoStyle}>
					<View style={[this.state.subInfoStyle, {justifyContent: 'center', alignItems: 'center'}]}>
						<Icon
							name='user'
							type="entypo"
							color="#000000"
							size={minScreen/2}
						/>
					</View>
					<View style={[{margin: 10, padding: 10, justifyContent: 'center', alignItems: 'center'}, this.state.subInfoStyle]}>
						<View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Name: 
								</Text>
								<Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
									{!profile.alias?profile.name:(profile.name + " (" + profile.alias + ")")}
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Crime: 
								</Text><Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
								 	{profile.crime?profile.crime:'NA'}
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Phone: 
								</Text><Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
								 	{profile.phone?profile.phone:'NA'}
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Address: 
								</Text><Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
								 	{profile.address?profile.address:'NA'}
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Beet: 
								</Text>
								<Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
									{profile.beet_id + " (" + profile.chauki + ")"}
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Height: 
								</Text><Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
								 	{profile.height?profile.height:'NA'}
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Hair Color: 
								</Text><Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
								 	{profile.hair_color?profile.hair_color:'NA'}
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Identity Mark: 
								</Text><Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
								 	{profile.identity_mark?profile.identity_mark:'NA'}
								</Text>
							</View>
							<View style={{flexDirection: 'row'}}>
								<Text style={{padding: 5, fontSize: 18, fontWeight: 'bold', lineHeight: 18, width: 110}}>
									Father: 
								</Text><Text style={{padding: 5, fontSize: 14, lineHeight: 18}}>
								 	{profile.father_name?profile.father_name:'NA'}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonProfile);