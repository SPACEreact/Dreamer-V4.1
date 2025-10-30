import { PreloadedKnowledge } from '../types';

export const STAGE_WIDTH = 800;
export const STAGE_HEIGHT = 450;

export const cameraHeightOptions = ['ground-level soul gaze', 'eye-level witness', 'elevated guardian', 'angelic drift'];
export const cameraAngleOptions = ['true-eye, honest', 'steep reverence', 'whispered low', 'Dutch slip'];
export const lightingMoodOptions = [
  'chiaroscuro confession',
  'soft volumetric prayer',
  'neon fever dream',
  'moonlit echo',
  'burnt tungsten reminiscence'
];
export const colorHarmonyOptions = ['complementary pulse', 'analogous drift', 'triadic bloom', 'monochrome trance', 'split-complementary tension'];
export const easingOptions = ['linear', 'ease-in', 'ease-out', 'ease-in-out'];
export const movementTypes = ['static contemplation', 'slow dolly-in', 'crane ascent', 'handheld tremor', 'steadicam drift', 'orbital pan'];

export const questions = [
    { id: 'scriptText', step: 0, category: 'Prelude (Optional)', question: 'Optional: share your script fragment or scene description', placeholder: 'Drop in a fragment if you want Dreamer to adapt pacing and continuity from the page.', type: 'script', randomOptions: ['He edits reels of his past while rain combs the window.','She waits in a station bathed in crimson departures.','They argue in whispers beneath the crashing surf.'] },
    { id: 'sceneCore', step: 1, category: 'Scene Core & Emotion', question: 'Describe your scene core — who is there, what is happening, what emotion drives it.', placeholder: 'e.g., A man edits reels of his past in a dark room while rain falls outside.', type: 'text', randomOptions: ['A woman reading farewell letters in a candlelit attic as thunder stirs the glass.','Two siblings share a cigarette on a motel balcony overlooking neon emptiness.'] },
    { id: 'emotion', step: 1, category: 'Scene Core & Emotion', question: 'What mood defines this scene?', placeholder: 'melancholic, nostalgic, ethereal...', type: 'select', options: ['melancholic','nostalgic','ethereal','tragic beauty','mythic surrealism','serene chaos','hopeful decay','electric longing'] },
    { id: 'numberOfShots', step: 2, category: 'Shot System', question: 'How many shots should the sequence contain?', placeholder: 'e.g., 5 — establishing, emotional reaction, revelation, contrast, payoff', type: 'text', randomOptions: ['3', '5', '7'] },
    { id: 'cameraType', step: 2, category: 'Shot System', question: 'Select your camera system:', type: 'select', options: ['Arri Alexa 65', 'Red Monstro 8K', 'Sony Venice 2', 'Phantom Flex 4K', 'IMAX', 'analog Bolex H16'] },
    { id: 'shotTypes', step: 2, category: 'Shot System', question: 'Which shot types shape your sequence?', placeholder: 'wide, close-up, POV, dolly-in...', type: 'text', randomOptions: ['wide atmospheric, dolly-in confession, close-up tremor','aerial drift, tracking pursuit, over-the-shoulder reveal'] },
    { id: 'focalLength', step: 2, category: 'Shot System', question: 'Choose focal length:', type: 'select', options: ['10mm ultra-wide','24mm immersive','35mm cinematic','50mm human-eye','85mm intimate','135mm compressed'] },
    { id: 'depthOfField', step: 2, category: 'Shot System', question: 'Set the depth of field:', type: 'select', options: ['f/1.4 dreamy shallow', 'f/2.8 cinematic shallow', 'f/5.6 balanced', 'f/11 deep focus'] },
    { id: 'framing', step: 3, category: 'Framing & Visual Psychology', question: 'What composition defines the scene?', type: 'select', options: ['rule of thirds','symmetrical','negative space','frame-in-frame','golden ratio','off-center','leading lines','Dutch angle'] },
    { id: 'lightingStyle', step: 5, category: 'Lighting & Atmosphere', question: 'Choose lighting mood:', type: 'select', options: ['chiaroscuro contrast','golden hour glow','moonlit reflection','tungsten haze','silhouette rim','fluorescent spill'] },
    { id: 'filmStock', step: 6, category: 'Film Stock & Color', question: 'Select film stock:', type: 'select', options: ['Kodak Vision3 500T 5219','Fuji Eterna','Ilford HP5 B&W','Technicolor 3-strip','Polaroid pastel dream'] },
    { id: 'colorGrading', step: 6, category: 'Film Stock & Color', question: 'Color grade vibe:', type: 'select', options: ['mutated pastel','teal-orange tension','noir desaturation','golden warmth','painterly tone','infrared surreal'] },
];

export const preloadedKnowledgeBase: PreloadedKnowledge[] = [
    {
      id: 'preloaded-1',
      name: 'Story Structure & Narrative Frameworks',
      content: `A story structure... Generally story follow some structure, there are various way to do it and one of them is Harmon story circle 1. You A character in their zone of comfort 2. Need wants something 3. Go! so they enter an unfamiliar situation 4. Struggle to which they have to adapt 5. Find in order to get what they want 6. Suffer yet they have to make a sacrifice 7. Return before they return to their familiar situation 8. Change having changed fundamentally. The Hero's journey- story structure: THE ORDINARY WORLD. THE CALL TO ADVENTURE. REFUSAL OF THE QUEST. ACCEPTING THE CALL: ENTERING THE UNKNOWN. SUPERNATURAL AID. TALISMAN: ALLIES/HELPERS. TESTS & THE SUPREME ORDEAL. REWARD AND THE JOURNEY HOME. MASTER OF TWO WORLDS/ RESTORING THE WORLD.`,
      extractedKnowledge: { themes: ['redemption', 'transformation', 'return'], visualStyles: ['epic journey', 'cyclical narrative', 'three-act structure'], characters: ['mentor', 'herald', 'trickster'], techniques: ['inciting incident', 'dark night of the soul', 'climax', 'The Hero\'s Journey'] }
    },
    {
      id: 'preloaded-2',
      name: 'Cinematography & Camera Techniques',
      content: 'Notes. Write or draw the use of lightning, sound, camera movement, aspects ratio, character movment. Framing, composition. Angle. Transition between two frame Depth of field, by crossing out ,0ut of focus stuff. 180° rule, an imaginary line between two characters drawn… we are not supposed to cross the line… makes it look like both characters are in same place. Cut on action, switch between full to medium shot in a single scene. Show weather, time of the day. Movement of character should give sense of what they would do... Audience should be able to anticipate.',
      extractedKnowledge: { themes: ['power dynamics', 'isolation', 'freedom', 'anticipation'], visualStyles: ['dolly zoom', 'long take', 'dutch angle', 'weather effects'], characters: [], techniques: ['180-degree rule', 'rule of thirds', 'lead room', 'motivated character movement', 'cut on action', 'depth of field'] }
    },
];
