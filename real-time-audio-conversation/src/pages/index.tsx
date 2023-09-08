"use client";

import { useWhisper } from "@octoai/use-whisper";
import { useState } from "react";
import React from 'react';

let recordingActive = false;

function Output({ label, output }) {
  return (
      <div>
        <h1>{label}</h1>
        { output !== undefined && output !== '' ? output : "Processing" }
      </div>
  )
}

export default function Page() {

  function AppStartRecording() {
    console.log("AppStartRecording")
    transcript.text = ""
    startRecording()
  }

  function Status({ name, status }) {
    if(speaking && !recordingActive) {
      recordingActive = true;
    } else if (!speaking && recordingActive) {
      recordingActive = false;
      restartRecording()
    }

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

  const {
    recording,
    speaking,
    transcribing,
    transcript,
    startRecording,
    stopRecording,
    restartRecording,
  } = useWhisper({
    apiKey: process.env.NEXT_PUBLIC_WHISPER_API_TOKEN,
    apiUrl: process.env.NEXT_PUBLIC_WHISPER_API_URL,
    streaming: true,
    timeSlice: 1_000, // 1 second
    autoTranscribe: true,
  });

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
              onClick={() => AppStartRecording()}>
              Start
            </button>
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
