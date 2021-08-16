import React from 'react';
import {
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	Dimensions
} from 'react-native';

export default class ShowMore extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMoreBoxIsOpened: false,
			showMoreHeight: this.props.height != null ? this.props.height : 250,
			showMoreButtonText: this.props.showMoreText != null ? this.props.showMoreText : "Show More",
		};
	}

	onPressShowMore = () => {
		this.setState({
			showMoreBoxIsOpened: true,
			showMoreHeight: null,
			showMoreButtonText: this.props.showLessText != null ? this.props.showLessText : "Show Less",
		})
	}

	onPressShowLess = () => {
		this.setState({
			showMoreBoxIsOpened: false,
			showMoreHeight: this.props.height != null ? this.props.height : 250,
			showMoreButtonText: this.props.showMoreText != null ? this.props.showMoreText : "Show More",
		})
	}

	render() {
		return (

			<View>
				
				<ScrollView style={{ height: this.state.showMoreHeight }} scrollEnabled={false}>
					{this.props.children}
				</ScrollView>

				<View style={{
					borderWidth: 0.8,
					borderRadius: 0,
					borderColor: 'rgba(0, 0, 0, 0.0)',
					shadowColor: '#999',
					shadowOffset: { width: 0, height: 0 },
					shadowOpacity: 1.0,
					shadowRadius: 0,
					elevation: 0,
					top: -10,
					height: 0,
					width: Dimensions.get('window').width * 2,
					backgroundColor: 'rgba(0, 0, 0, 0.0)',
					flex: 1,
				}} />

				<TouchableOpacity style={{ height: 20, justifyContent: 'flex-end', width: '100%', top: 2, left: 0 }}
					onPress={() => { this.state.showMoreBoxIsOpened ? this.onPressShowLess() : this.onPressShowMore(); }}>
					<View style={{textAlign: 'right',justifyContent: 'flex-end'}}>
						<Text style={{ color: this.props.buttonColor != null ? this.props.buttonColor : "#AAAAFF" ,textAlign: 'right',}}>{this.state.showMoreButtonText}</Text>
					</View>
				</TouchableOpacity>

			</View>
		);
	}
}