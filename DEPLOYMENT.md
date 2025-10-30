## Production Build Configuration

This Dreamer app requires a Gemini API key to function. For production deployments:

### Environment Variable Setup

Set the `GEMINI_API_KEY` environment variable in your deployment platform:

**For Netlify:**
```bash
netlify env:set GEMINI_API_KEY "your_actual_api_key_here"
```

Or through the Netlify UI:
1. Go to Site settings > Build & deploy > Environment
2. Add variable: `GEMINI_API_KEY` with your API key value

**Important:** The app uses the API key in the browser, so ensure your API key has appropriate restrictions configured in Google AI Studio to prevent unauthorized use.

### Local Development

Create a `.env.local` file:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

This file is gitignored and won't be committed to version control.
