# Dreamer Mobile

A mobile version of the Dreamer cinematic prompt builder, built with React Native and Expo.

## Features

- **Landing Page**: Choose between Prompt Builder, Script to Storyboard, or AI Dream modes
- **Prompt Builder**: Multi-step questionnaire with AI-powered suggestions
- **Storyboard Generator**: Convert scripts into detailed shot-by-shot storyboards
- **Visual Sequence Editor**: Fine-tune composition, lighting, color, and camera movement
- **AI Integration**: Powered by Google Gemini AI for intelligent suggestions and generation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator
- Gemini API Key

## Installation

1. Navigate to the project directory:
```bash
cd dreamer-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Configure your Gemini API Key:

Edit `app.json` and add your API key:
```json
{
  "expo": {
    "extra": {
      "GEMINI_API_KEY": "your-api-key-here"
    }
  }
}
```

## Running the App

### iOS (Mac only)
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web (for testing)
```bash
npm run web
```

### Using Expo Go
```bash
npm start
```
Then scan the QR code with the Expo Go app on your mobile device.

## Project Structure

```
dreamer-mobile/
├── src/
│   ├── screens/           # Screen components
│   │   ├── LandingScreen.tsx
│   │   ├── BuilderScreen.tsx
│   │   ├── StoryboardScreen.tsx
│   │   └── VisualSequenceEditorScreen.tsx
│   ├── services/          # API services
│   │   └── geminiService.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── constants/         # App constants
│   │   └── index.ts
│   └── utils/             # Utility functions
│       └── storage.ts
├── App.tsx                # Main app component with navigation
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## Key Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tooling
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **AsyncStorage**: Local data persistence
- **Google Gemini AI**: AI-powered content generation
- **Expo Linear Gradient**: Gradient backgrounds
- **React Native Gesture Handler**: Touch interactions

## Features by Screen

### Landing Screen
- Text input for cinematic vision or script
- Three action buttons:
  - Prompt Builder: Start the questionnaire
  - Script to Storyboard: Generate storyboard from script
  - Let AI Dream: Expand idea with AI

### Builder Screen
- Multi-step questionnaire (12 questions)
- Progress indicator
- AI-powered suggestions
- Random inspiration generator
- Support for text input and select options

### Storyboard Screen
- Script input area
- Generate storyboard button
- Progress indicator during generation
- Display generated shots with details:
  - Shot type and camera angle
  - Camera movement
  - Description
  - Lighting mood

### Visual Sequence Editor Screen
- Tab navigation for different editors:
  - Composition
  - Lighting
  - Color
  - Camera
- Export and save functionality (coming soon)

## Differences from Web Version

The mobile version is a streamlined adaptation of the web app with the following changes:

1. **Simplified UI**: Optimized for mobile screens and touch interactions
2. **Reduced Questions**: Focused on core 12 questions instead of full 30+
3. **Placeholder Editors**: Visual editors show placeholders (full implementation coming soon)
4. **AsyncStorage**: Uses AsyncStorage instead of localStorage
5. **Native Components**: Uses React Native components instead of HTML/CSS
6. **Touch Optimized**: All interactions designed for touch screens

## API Configuration

The app uses Google Gemini AI API. Make sure to:

1. Get an API key from [Google AI Studio](https://ai.google.dev/)
2. Add it to `app.json` under `expo.extra.GEMINI_API_KEY`
3. Never commit your API key to version control

## Development

### Adding New Screens

1. Create a new screen component in `src/screens/`
2. Add the screen type to `RootStackParamList` in `src/types/index.ts`
3. Add the screen to the Stack Navigator in `App.tsx`

### Modifying Questions

Edit the `questions` array in `src/constants/index.ts`

### Styling

All styles use React Native's StyleSheet API. Common colors:
- Background: `#000000` (black)
- Primary: `#F59E0B` (amber)
- Secondary: `#1F2937` (dark gray)
- Text: `#FFFFFF` (white)
- Muted: `#9CA3AF` (gray)

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in `app.json`
- Check that you have the correct permissions for the Gemini API

### Build Errors
- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Navigation Issues
- Make sure all screen components are properly imported
- Check that navigation types match in `RootStackParamList`

## Future Enhancements

- [ ] Full visual editor implementations
- [ ] Drag-and-drop timeline
- [ ] Image generation and display
- [ ] Video prompt generation
- [ ] Configuration save/load
- [ ] Knowledge base management
- [ ] Offline mode
- [ ] Share functionality

## License

This project is part of the Dreamer cinematic prompt builder suite.

## Support

For issues and questions, please refer to the main Dreamer project documentation.
