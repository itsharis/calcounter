/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {
    Platform,
    StyleSheet,
    Text,
    Dimensions,
    View, TouchableHighlight, Image
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Camera
                    captureTarget={Camera.constants.CaptureTarget.temp}
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>

                    <TouchableHighlight style={styles.captureButton} onPress={this.takePicture.bind(this)}>
                        <Image
                            style={{width: 100, height: 100}}
                            source={{uri: 'https://s22.postimg.org/yyv1p3lzl/jbnbtn.png'}}
                        />
                    </TouchableHighlight>

                </Camera>
            </View>

        );
    }

    takePicture() {
        this.camera.capture()
            .then((data) => {
                console.log(data);
                this.setState({ path: data.path })
            })
            .catch(err => console.error(err));
    }

    renderImage() {
        return (
            <View>
                <Image
                    source={{uri: this.state.path}}
                    style={styles.preview}
                />
                <Text
                    style={styles.cancel}
                    onPress={() => this.setState({path: null})}
                >Cancel
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },

    captureButton: {
        flex: 0,
        borderRadius: 5,
        padding: 10,
        margin: 40
    },

});
