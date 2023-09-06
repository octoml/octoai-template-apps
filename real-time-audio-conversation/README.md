# Demo of a real-time audio transcription application in React/Typescript/NextJS

This demo allows a user to speak into the microphone, and uses an AI model to transcribe audio into text in real-time. 
The transcription is done via the use-whisper React component, which is a wrapper around the OctoAI Whisper endpoint.
The use-whisper component shares the same UX as https://github.com/chengsokdara/use-whisper, the only difference being that (1) you should provide an OctoAI apiKey instead of an OpenAI apiKey and (2) you should provide an extra apiUrl parameter that indicates what OctoAI endpoint you are trying to use.

# Core steps

1. Sign up for an OctoAI account by navigating [here](https://identity.octoml.ai/oauth/account/sign-up?redirectUrl=https://octoai.cloud). After you've set a password you should be redirected to the main page of the product, which is https://octoai.cloud.
2. After you've authenticated, go to your OctoAI Account Settings [page](https://octoai.cloud/settings) to create an access token. Paste your token and Whisper URL into the /src/pages/index.tsx file where useWhisper is used. When prototyping, you can use the quickstart template endpoint for Whisper at `https://whisper-demo-kk0powt97tmb.octoai.cloud/v1/audio/`, but note that this endpoint has a rate limit of 15 inferences per hour, and you'd have to clone the endpoint to your own account in order to overcome the rate limit.

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
3. Now, install all the dependencies to enable this application (listed in package.json), including @rkimball/use-whisper, by running 
`yarn` in the root of this real-time-audio-conversation repo.
4. Then, run `yarn dev` to run this demo locally. Open http://localhost:3000/ in your browser to see the app.

<img width="1051" alt="Screenshot 2023-08-29 at 2 33 22 PM" src="https://github.com/octoml/octoai-template-apps/assets/31609083/fdc28b48-7545-4202-b852-e8c8ccd280f1">

5. Click on the Start button to start recording. Speak for a few seconds.
6. Click on the Stop button whenever you're done speaking.




