import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import AudioRecorder from './src/services/AudioRecorder';

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [counter, setCounter] = useState(0);
  const [currentData, setCurrentData] = useState({
    amplitude: 0,
    frequency: 0,
    loudness: 0,
  });

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          grants[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('Permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Audio recording logic will be implemented here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sound Detector</Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterLabel}>Detected Sounds:</Text>
          <Text style={styles.counterValue}>{counter}</Text>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Amplitude: {currentData.amplitude}</Text>
          <Text style={styles.dataText}>Frequency: {currentData.frequency} Hz</Text>
          <Text style={styles.dataText}>Loudness: {currentData.loudness} dB</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, isRecording && styles.buttonRecording]}
          onPress={toggleRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop Detection' : 'Start Detection'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  counterLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  dataContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonRecording: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;