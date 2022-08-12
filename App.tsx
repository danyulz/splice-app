import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { handleUploadMedia } from './api';
import { WIDTH } from './constants';
import React from 'react'
import { ProgressBar } from './components';

export default function App() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const VideoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState<number>(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result)
    if (result.cancelled) return
    if (result.type === "image") { setImage(result); setVideo(null) }
    if (result.type === "video") {
      setVideo(result);
      setImage(null)
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick media from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      {video &&
        <View>
          <Video
            ref={VideoRef}
            style={{ height: (video.height / video.width) * WIDTH * 0.8, width: WIDTH * 0.8 }}
            source={{
              uri: video.uri,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? 'Pause' : 'Play'}
              onPress={() =>
                status.isPlaying ? VideoRef.current.pauseAsync() : VideoRef.current.playAsync()
              }
            />
          </View>
        </View>}
      <TouchableOpacity onPress={() => handleUploadMedia((image || video), setProgress)} >
        <Text>Upload to Splice</Text>
      </TouchableOpacity>
      <ProgressBar progress={progress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '80%',
    height: '40%'
  }
});
