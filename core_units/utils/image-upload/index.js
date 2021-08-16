import React, { Component, useState, useEffect } from "react";
import { Image, View, Platform, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
	responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function ExperienceImageUpload() {
	const [image, setImage] = useState(null);
	const [updatedImage, setUpdatedImage] = useState('');

	useEffect(() => {
		getImage();
		(async () => {
			if (Platform.OS !== "web") {
				const {
					status,
				} = await ImagePicker.requestCameraRollPermissionsAsync();
				if (status !== "granted") {
					alert(
						"Sorry, we need camera roll permissions to make this work!"
					);
				}
			}
		})();
	}, []);
	const getImage = async () => {
		try {
			const yourStoryImage = await global.asyncStorage.hostOnboard.yourStory.getDetailsAsync().then(data => data);
			const images = yourStoryImage.image ? yourStoryImage.image : yourStoryImage.uri


			if (yourStoryImage) {
				setImage(images);
			}
		} catch (e) {
			// error reading value
		}
	}
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});


		if (!result.cancelled) {
			setImage(result.uri);
			const source = result.uri
			await global.asyncStorage.hostOnboard.yourStory.setDetailsAsync({ image: source });
		}
	};

	return (
		<View style={style.FormGroup}>
			<View style={style.ImageUploadContainer}>
				<Button
					buttonStyle={style.PlusIcon}
					onPress={pickImage}
					icon={
						<Icon
							name="plus"
							size={20}
							color="rgba(0, 0, 0, 0.5)"
						/>
					}
				/>
				{image && (
					<Image
						style={style.FormGuestImage}
						source={{ uri: image }}
					/>
				)}
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	FormControl: {
		height: responsiveHeight(6),
		borderColor: '#ededed',
		borderWidth: 1,
		paddingVertical: responsiveWidth(1),
		paddingHorizontal: responsiveHeight(1.5),
		backgroundColor: '#ededed',
		borderRadius: 5,
		fontSize: responsiveFontSize(2),
		color: "rgba(0, 0, 0, 0.8)",
		overflow: 'hidden',
	},
	PlusIcon: {
		width: responsiveHeight(6),
		height: responsiveHeight(6),
		backgroundColor: '#35e1d1',
		color: "rgba(0, 0, 0, 0.5)",
		textAlign: 'center',
		textAlignVertical: 'center',
		borderRadius: 100
	},
	FormGuestImage: {
		width: responsiveHeight(15),
		height: responsiveHeight(15),
		resizeMode: "contain",
		marginLeft: responsiveWidth(2),
	},
	ImageUploadContainer: {
		flexDirection: 'row'
	},
});