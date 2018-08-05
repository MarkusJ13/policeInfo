import React from 'react';
import {connect} from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateCrime} from './AllAction.js';

class SelectCrime extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectCrime: false
		}
	}

	handleCrime = (crime) => {
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
		this.props.updateCrime(crime)
		this.setState({ selectCrime: false })
	}

	selectCrime = () => {
		this.setState({selectCrime: !this.state.selectCrime})
	}

	render() {
		let Crime = [{key: 'Chainsmoker', label: 'Chainsmoker'}]
		return (
		<View>
			<TouchableOpacity onPress={this.selectCrime}>
			<TextField
				label='Crime'
				value={this.props.crime}
				editable={false}
				/>
			</TouchableOpacity>
			<ModalFilterPicker
				visible={this.state.selectCrime}
				onSelect={this.handleCrime}
				onCancel={this.selectCrime}
				options={Crime}
				optionTextStyle={{fontSize: 14}}
			/>
		</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		crime: state.crime
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateCrime: (crime) => {
			dispatch(updateCrime(crime))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCrime);