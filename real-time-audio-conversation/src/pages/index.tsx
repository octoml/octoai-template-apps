"use client";

import { useWhisper } from "@rkimball/use-whisper";
import { useState } from "react";

// unclicked "text-sm font-semibold leading-6 text-gray-900"

function Status({ name, status }) {
    return (
        <div className="sm:col-span-4">
                <label
                  htmlFor={name}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {name} {status ? "✅" : "❌"}
                </label>
                <div className="mt-2">
                </div>
        </div>
    )
}

function Output({ label, output }) {
  console.log(output)
  return (
      <div>
        <h1>{label}</h1>
        { output !== undefined && output !== '' ? output : "Processing" }
      </div>
  )
}
export default function Page() {
  const config = {
    language: "en",
    task: "transcription",
  };

  let [hasRecorded, setRecorded] = useState(false);

  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiUrl: "http://localhost:8000/v1/audio/",
    // apiUrl: "https://whisperx-3s0r2oe0snpi.nimbus.octoml.ai/v1/audio/",
    streaming: true,
    timeSlice: 1_000, // 1 second
  });

  // if (recording) {
  //   setRecorded(true)
  // }

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            OctoAI Whisper with useWhisper
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This is a demo of using the OctoAI Whisper API with the `useWhisper`
            React Hook.
          </p>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
              <Status name="Recording" status={recording}/>
              <Status name="Speaking" status={speaking}/>
              <Status name="Transcribing" status={transcribing}/>
              <Output label="Transcript" output={transcript.text}/>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => startRecording()}>
              Start
            </button>
            {/* <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => pauseRecording()}>
              Pause
            </button> */}
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => stopRecording()}>
              Stop
            </button>
          </div>
        </form>
    </div>
  );
}
