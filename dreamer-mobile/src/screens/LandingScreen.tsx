import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { generateStoryFromIdea } from '../services/geminiService';

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

export default function LandingScreen({ navigation }: Props) {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartBuilder = () => {
    navigation.navigate('Builder', { initialIdea: idea });
  };

  const handleStartStoryboard = () => {
    navigation.navigate('Storyboard', { scriptText: idea });
  };

  const handleGenerateStory = async () => {
    if (!idea.trim()) return;
    
    setIsGenerating(true);
    try {
      const scenes = await generateStoryFromIdea(idea);
      if (scenes.length > 0) {
        navigation.navigate('Builder', { initialIdea: scenes.join('\n\n') });
      }
    } catch (error) {
      console.error('Story generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={['#F59E0B', '#EA580C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleGradient}
            >
              <Text style={styles.title}>Dreamer</Text>
            </LinearGradient>
            <Text style={styles.subtitle}>
              Cinematic prompt builder for visionary creators
            </Text>
          </View>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Describe your cinematic vision or paste a script..."
              placeholderTextColor="#6B7280"
              multiline
              numberOfLines={6}
              value={idea}
              onChangeText={setIdea}
              textAlignVertical="top"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStartBuilder}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#F59E0B', '#EA580C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Prompt Builder</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleStartStoryboard}
              activeOpacity={0.8}
            >
              <Ionicons name="film" size={20} color="#FFFFFF" />
              <Text style={styles.secondaryButtonText}>Script to Storyboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.aiButton, (!idea.trim() || isGenerating) && styles.disabledButton]}
              onPress={handleGenerateStory}
              disabled={!idea.trim() || isGenerating}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#7C3AED', '#4F46E5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                {isGenerating ? (
                  <>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.primaryButtonText}>Dreaming up ideas...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="bulb" size={20} color="#FFFFFF" />
                    <Text style={styles.primaryButtonText}>Let AI Dream</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 120,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  secondaryButton: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  aiButton: {
    borderRadius: 12,
    overflow: 'hidden',
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
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
