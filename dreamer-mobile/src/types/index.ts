export interface PromptData {
  scriptText?: string;
  useScript?: boolean;
  sceneCore: string | string[];
  emotion: string | string[];
  numberOfShots: string | string[];
  cameraType: string | string[];
  shotTypes: string | string[];
  focalLength: string | string[];
  depthOfField: string | string[];
  framing: string | string[];
  mainCharacterBlocking: string | string[];
  secondaryCharacterBlocking: string | string[];
  antagonistBlocking: string | string[];
  lightingStyle: string | string[];
  lightingDetails: string | string[];
  atmosphere: string | string[];
  filmStock: string | string[];
  filmEmulation: string | string[];
  colorGrading: string | string[];
  colorPalette: string | string[];
  storyBeat: string | string[];
  visualToneKeywords: string | string[];
  continuityMode: string | string[];
  seedLinking: string | string[];
  resolution: string | string[];
  outputType: string | string[];
  visualCompositionGuide: string | string[];
  visualCameraSetup: string | string[];
  visualLightingSetup: string | string[];
  visualLightingMood: string | string[];
  visualColorPalette: string | string[];
  visualColorHarmony: string | string[];
  visualCameraMovement: string | string[];
  visualFocusMotion: string | string[];
}

export interface ShotPrompt {
  shotNumber: number;
  prompt: string;
  originalPrompt: string;
  description: string;
  role: string;
}

export interface SavedConfiguration {
  id: string;
  name: string;
  data: PromptData;
  savedAt: number;
}

export interface ExtractedKnowledge {
  themes: string[];
  visualStyles: string[];
  characters: string[];
  techniques: string[];
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  content: string;
  extractedKnowledge?: ExtractedKnowledge;
  uploadedAt: Date;
}

export interface PreloadedKnowledge {
  id: string;
  name: string;
  content: string;
  extractedKnowledge: ExtractedKnowledge;
}

export interface CompositionCharacter {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface CompositionData {
  characters: CompositionCharacter[];
  cameraAngle: string;
  cameraHeight: string;
}

export interface LightingData {
  keyLightIntensity: number;
  keyLightColor: string;
  fillLightIntensity: number;
  fillLightColor: string;
  backLightIntensity: number;
  backLightColor: string;
  ambientIntensity: number;
  colorTemperature: number;
  mood: string;
}

export interface ColorGradingData {
  colorGrade: string;
  saturation: number;
  contrast: number;
  highlights: number;
  shadows: number;
  colorPalette: string[];
  colorHarmony: string;
}

export interface CameraMovementData {
  movementType: string;
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  duration: number;
  easing: string;
  focalLength: number;
}

export interface VisualPreset {
  id: string;
  name: string;
  composition: Record<string, any>;
  lighting: Record<string, any>;
  color: Record<string, any>;
  camera: Record<string, any>;
  createdAt: number;
}

export type Stage = 'landing' | 'builder' | 'final' | 'storyboard';

export type CameraEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface StoryboardShot {
  screenplayLine: string;
  shotDetails: {
    shotType: string;
    cameraAngle: string;
    description: string;
    lightingMood: string;
    cameraMovement: string;
  };
}

export type TimelineItemType = 'shot' | 'b-roll' | 'transition' | 'text';

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
}

export interface ShotItem extends TimelineItem {
  type: 'shot';
  data: ShotPrompt;
}

export interface BrollItem extends TimelineItem {
  type: 'b-roll';
  prompt: string;
}

export interface TransitionItem extends TimelineItem {
  type: 'transition';
  note: string;
}

export interface TextItem extends TimelineItem {
  type: 'text';
  title: string;
}

export type AnyTimelineItem = ShotItem | BrollItem | TransitionItem | TextItem;

export interface SequenceStyle {
  visualDNA: string;
  colorPalette: string;
  mood: string;
}

// Navigation types
export type RootStackParamList = {
  Landing: undefined;
  Builder: { initialIdea?: string };
  Storyboard: { scriptText: string };
  VisualSequenceEditor: undefined;
};
