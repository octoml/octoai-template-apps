# Demo of a real-time audio transcription application in React/Typescript/NextJS

This demo allows a user to speak into the microphone, and uses an AI model to transcribe audio into text in real-time. 
The transcription is done via the use-whisper React component, which is a wrapper around the OctoAI Whisper endpoint.
The use-whisper component shares the same UX as https://github.com/chengsokdara/use-whisper, the only difference being that (1) you should provide an OctoAI apiKey instead of an OpenAI apiKey and (2) you should provide a few extra parameters (an apiUrl string, the streaming boolean, and the timeSlice number).

# Core steps

1. Sign up for an OctoAI account by navigating [here](https://identity.octoml.ai/oauth/account/sign-up?redirectUrl=https://octoai.cloud). After you've set a password you should be redirected to the main page of the product, which is https://octoai.cloud.
2. After you've authenticated, go to your OctoAI Account Settings [page](https://octoai.cloud/settings) to create an access token. Paste your token into the /src/pages/index.tsx file where useWhisper is used, primarily:

```
import { useWhisper } from "@rkimball/use-whisper";
const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiUrl: "https://whisper-demo-kk0powt97tmb.octoai.cloud/v1/audio/",
    apiKey: "YOUR_OCTOAI_TOKEN",
    streaming: true,
    timeSlice: 1_000, // 1 second
  });
```
3. Now, download all the dependencies to enable this application (listed in package.json), including @rkimball/use-whisper, by running 
`yarn` in the root of this real-time-audio-conversation repo.
4. Then, run `yarn dev` to run this demo locally.
5. Click on the Start button to start recording. Speak for a few seconds.
6. Click on the Stop button whenever you're done speaking.
7. Inspect the /src/pages/index.tsx to see how useWhisper is used, primarily:



