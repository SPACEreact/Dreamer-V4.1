import React, { useState, useEffect } from 'react';
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
import { RootStackParamList, PromptData } from '../types';
import { questions } from '../constants';
import { getAISuggestions, getRandomInspiration } from '../services/geminiService';

type BuilderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Builder'>;
type BuilderScreenRouteProp = RouteProp<RootStackParamList, 'Builder'>;

interface Props {
  navigation: BuilderScreenNavigationProp;
  route: BuilderScreenRouteProp;
}

export default function BuilderScreen({ navigation, route }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [promptData, setPromptData] = useState<PromptData>({
    scriptText: route.params?.initialIdea || '',
    sceneCore: '',
    emotion: '',
    numberOfShots: '3',
    cameraType: 'Arri Alexa 65',
    shotTypes: '',
    focalLength: '35mm cinematic',
    depthOfField: 'f/2.8 cinematic shallow',
    framing: 'rule of thirds',
    mainCharacterBlocking: '',
    secondaryCharacterBlocking: '',
    antagonistBlocking: '',
    lightingStyle: 'chiaroscuro contrast',
    lightingDetails: '',
    atmosphere: '',
    filmStock: 'Kodak Vision3 500T 5219',
    filmEmulation: '',
    colorGrading: 'teal-orange tension',
    colorPalette: '',
    storyBeat: '',
    visualToneKeywords: '',
    continuityMode: 'tight continuity',
    seedLinking: 'use previous seeds',
    resolution: '4K render',
    outputType: 'cinematic frame',
    visualCompositionGuide: '',
    visualCameraSetup: '',
    visualLightingSetup: '',
    visualLightingMood: '',
    visualColorPalette: '',
    visualColorHarmony: '',
    visualCameraMovement: '',
    visualFocusMotion: '',
  });
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setPromptData(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAiSuggestions([]);
    } else {
      // Navigate to Visual Sequence Editor
      navigation.navigate('VisualSequenceEditor');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAiSuggestions([]);
    }
  };

  const handleRandomInspiration = async () => {
    setIsLoadingAI(true);
    try {
      const inspiration = await getRandomInspiration(
        String(promptData.sceneCore || ''),
        currentQuestion.question
      );
      handleAnswer(inspiration);
    } catch (error) {
      Alert.alert('Error', 'Failed to get inspiration');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleAISuggestions = async () => {
    setIsLoadingAI(true);
    setAiSuggestions([]);
    try {
      const context = `Scene: ${promptData.sceneCore || 'Not specified'}`;
      const suggestions = await getAISuggestions(context, currentQuestion.question);
      setAiSuggestions(suggestions);
    } catch (error) {
      Alert.alert('Error', 'Failed to get AI suggestions');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const currentValue = promptData[currentQuestion.id as keyof PromptData];

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            Step {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.category}>{currentQuestion.category}</Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>
        </View>

        {/* Input */}
        {currentQuestion.type === 'select' && currentQuestion.options ? (
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  currentValue === option && styles.optionButtonSelected,
                ]}
                onPress={() => handleAnswer(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    currentValue === option && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <TextInput
            style={[
              styles.textInput,
              currentQuestion.type === 'script' && styles.scriptInput,
            ]}
            placeholder={currentQuestion.placeholder}
            placeholderTextColor="#6B7280"
            multiline={currentQuestion.type === 'script' || currentQuestion.type === 'text'}
            numberOfLines={currentQuestion.type === 'script' ? 6 : 3}
            value={String(currentValue || '')}
            onChangeText={handleAnswer}
            textAlignVertical="top"
          />
        )}

        {/* AI Buttons */}
        <View style={styles.aiButtonsContainer}>
          <TouchableOpacity
            style={styles.aiButton}
            onPress={handleRandomInspiration}
            disabled={isLoadingAI}
          >
            <Ionicons name="sparkles" size={16} color="#F59E0B" />
            <Text style={styles.aiButtonText}>Inspire Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.aiButton}
            onPress={handleAISuggestions}
            disabled={isLoadingAI}
          >
            {isLoadingAI ? (
              <ActivityIndicator size="small" color="#7C3AED" />
            ) : (
              <Ionicons name="bulb" size={16} color="#7C3AED" />
            )}
            <Text style={styles.aiButtonText}>Dreamer Insight</Text>
          </TouchableOpacity>
        </View>

        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {aiSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => handleAnswer(suggestion)}
              >
                <Text style={styles.suggestionText}>✨ {suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestionIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNext}
        >
          <Text style={styles.navButtonText}>
            {currentQuestionIndex === questions.length - 1 ? 'Generate' : 'Next'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#111111',
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
    backgroundColor: '#1F2937',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  questionContainer: {
    marginBottom: 24,
  },
  category: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  question: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  scriptInput: {
    minHeight: 120,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  optionButtonSelected: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#000000',
    fontWeight: '600',
  },
  aiButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  aiButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  aiButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  suggestionsContainer: {
    gap: 12,
  },
  suggestionButton: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  suggestionText: {
    color: '#F59E0B',
    fontSize: 14,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#111111',
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
