import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type VisualSequenceEditorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VisualSequenceEditor'
>;

interface Props {
  navigation: VisualSequenceEditorScreenNavigationProp;
}

export default function VisualSequenceEditorScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'composition' | 'lighting' | 'color' | 'camera'>(
    'composition'
  );

  const tabs = [
    { id: 'composition', label: 'Composition', icon: 'grid' },
    { id: 'lighting', label: 'Lighting', icon: 'bulb' },
    { id: 'color', label: 'Color', icon: 'color-palette' },
    { id: 'camera', label: 'Camera', icon: 'videocam' },
  ] as const;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Visual Sequence Editor</Text>
        <Text style={styles.subtitle}>
          Fine-tune composition, lighting, color, and camera movement
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons
              name={tab.icon as any}
              size={20}
              color={activeTab === tab.id ? '#F59E0B' : '#9CA3AF'}
            />
            <Text
              style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Area */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 'composition' && (
          <View style={styles.editorSection}>
            <Text style={styles.sectionTitle}>Composition Grid</Text>
            <Text style={styles.sectionDescription}>
              Arrange characters and camera posture
            </Text>
            <View style={styles.placeholder}>
              <Ionicons name="grid" size={48} color="#374151" />
              <Text style={styles.placeholderText}>
                Composition editor coming soon
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'lighting' && (
          <View style={styles.editorSection}>
            <Text style={styles.sectionTitle}>Lighting Mixer</Text>
            <Text style={styles.sectionDescription}>
              Dial in key/fill/back ratios, temperature, and mood
            </Text>
            <View style={styles.placeholder}>
              <Ionicons name="bulb" size={48} color="#374151" />
              <Text style={styles.placeholderText}>
                Lighting editor coming soon
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'color' && (
          <View style={styles.editorSection}>
            <Text style={styles.sectionTitle}>Color Grading Deck</Text>
            <Text style={styles.sectionDescription}>
              Shape palette, contrast, saturation, and harmony
            </Text>
            <View style={styles.placeholder}>
              <Ionicons name="color-palette" size={48} color="#374151" />
              <Text style={styles.placeholderText}>
                Color grading editor coming soon
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'camera' && (
          <View style={styles.editorSection}>
            <Text style={styles.sectionTitle}>Camera Motion Lab</Text>
            <Text style={styles.sectionDescription}>
              Define movement, path, easing, and focal rhythm
            </Text>
            <View style={styles.placeholder}>
              <Ionicons name="videocam" size={48} color="#374151" />
              <Text style={styles.placeholderText}>
                Camera movement editor coming soon
              </Text>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#3B82F6" />
          <Text style={styles.infoText}>
            This is a simplified mobile version of Dreamer. The full visual editors with
            interactive controls are available in the web version.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Export', 'Export functionality coming soon')}
        >
          <Ionicons name="download" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Export</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Save', 'Save functionality coming soon')}
        >
          <Ionicons name="save" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Save</Text>
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
  header: {
    padding: 16,
    backgroundColor: '#111111',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#F59E0B',
  },
  tabText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  editorSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  placeholder: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  infoText: {
    flex: 1,
    color: '#BFDBFE',
    fontSize: 14,
    lineHeight: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#111111',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
