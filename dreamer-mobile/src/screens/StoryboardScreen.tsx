import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, StoryboardShot } from '../types';
import { generateStoryboard } from '../services/geminiService';

type StoryboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Storyboard'>;
type StoryboardScreenRouteProp = RouteProp<RootStackParamList, 'Storyboard'>;

interface Props {
  navigation: StoryboardScreenNavigationProp;
  route: StoryboardScreenRouteProp;
}

export default function StoryboardScreen({ navigation, route }: Props) {
  const [script, setScript] = useState(route.params?.scriptText || '');
  const [storyboard, setStoryboard] = useState<StoryboardShot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateStoryboard = async () => {
    if (!script.trim()) {
      Alert.alert('Error', 'Please enter a script first');
      return;
    }

    setIsLoading(true);
    setStoryboard([]);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 95));
    }, 250);

    try {
      const result = await generateStoryboard(script);
      clearInterval(progressInterval);
      setProgress(100);
      setStoryboard(result);
    } catch (error) {
      clearInterval(progressInterval);
      Alert.alert('Error', 'Failed to generate storyboard');
      console.error('Storyboard generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    navigation.navigate('VisualSequenceEditor');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Script to Storyboard</Text>
          <Text style={styles.subtitle}>
            Paste your script and let Dreamer break it down into a visual sequence.
          </Text>
        </View>

        {/* Script Input */}
        <TextInput
          style={styles.scriptInput}
          placeholder="Paste your script here..."
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={10}
          value={script}
          onChangeText={setScript}
          textAlignVertical="top"
          editable={!isLoading}
        />

        {/* Generate Button */}
        <TouchableOpacity
          style={[styles.generateButton, isLoading && styles.disabledButton]}
          onPress={handleGenerateStoryboard}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#7C3AED', '#4F46E5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            {isLoading ? (
              <>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.buttonText}>Generating...</Text>
              </>
            ) : (
              <>
                <Ionicons name="film" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Generate Storyboard</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Progress */}
        {isLoading && (
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Processing your script...</Text>
              <Text style={styles.progressPercent}>{progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>
        )}

        {/* Storyboard Results */}
        {storyboard.length > 0 && !isLoading && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Generated Storyboard</Text>
            {storyboard.map((shot, index) => (
              <View key={index} style={styles.shotCard}>
                <Text style={styles.shotLine}>{shot.screenplayLine}</Text>
                <View style={styles.shotDetails}>
                  <Text style={styles.shotDetailLabel}>Shot:</Text>
                  <Text style={styles.shotDetailValue}>
                    {shot.shotDetails.shotType} ({shot.shotDetails.cameraAngle})
                  </Text>
                </View>
                <View style={styles.shotDetails}>
                  <Text style={styles.shotDetailLabel}>Movement:</Text>
                  <Text style={styles.shotDetailValue}>
                    {shot.shotDetails.cameraMovement}
                  </Text>
                </View>
                <View style={styles.shotDetails}>
                  <Text style={styles.shotDetailLabel}>Description:</Text>
                  <Text style={styles.shotDetailValue}>
                    {shot.shotDetails.description}
                  </Text>
                </View>
                <View style={styles.shotDetails}>
                  <Text style={styles.shotDetailLabel}>Lighting:</Text>
                  <Text style={styles.shotDetailValue}>
                    {shot.shotDetails.lightingMood}
                  </Text>
                </View>
              </View>
            ))}

            {/* Continue Button */}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#F59E0B', '#EA580C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Continue to Visual Editor</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  scriptInput: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 200,
    marginBottom: 16,
  },
  generateButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  progressPercent: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
  },
  resultsContainer: {
    marginTop: 8,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  shotCard: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  shotLine: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  shotDetails: {
    marginBottom: 8,
  },
  shotDetailLabel: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  shotDetailValue: {
    color: '#E5E7EB',
    fontSize: 14,
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
});
