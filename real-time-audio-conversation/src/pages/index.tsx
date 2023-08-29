"use client";

import { useWhisper } from "@rkimball/use-whisper";
import { useState } from "react";

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
    apiUrl: "https://whisper-demo-kk0powt97tmb.octoai.cloud/v1/audio/",
    apiKey: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkMjMzOTQ5In0.eyJzdWIiOiJkNTg3ODYyOS05MmRiLTQxY2MtYjA3Ni04YjBlZmI5OTRkMmYiLCJ0eXBlIjoidXNlckFjY2Vzc1Rva2VuIiwidGVuYW50SWQiOiJlODllOTNkYi0yMzE1LTQxNWMtOWQ5Yi0zZDM0YmUwNGVkNDIiLCJ1c2VySWQiOiJmMGE2YzQ0MS1iNWE5LTQ0ODgtOGFmOC0wYTViOWIyZDI2ODAiLCJyb2xlcyI6WyJGRVRDSC1ST0xFUy1CWS1BUEkiXSwicGVybWlzc2lvbnMiOlsiRkVUQ0gtUEVSTUlTU0lPTlMtQlktQVBJIl0sImF1ZCI6IjNkMjMzOTQ5LWEyZmItNGFiMC1iN2VjLTQ2ZjYyNTVjNTEwZSIsImlzcyI6Imh0dHBzOi8vaWRlbnRpdHkub2N0b21sLmFpIiwiaWF0IjoxNjkzMzI4NzYzfQ.sLPkJSxAyPSVbqze4UmBO0tPmtGK7Bk5XAP9hbo26PSsfb9mbJzCZWqK89PAzaBb1KfAIXFf-sB0NdW7jB4ycaVQba5mAD6SvrMQD1GK8NAzSMW74BfyDN8K8O8_3v-NLFZqo3ZeCgLEV-mMobYBMmuW-CdjO6Z6Gooe1QmpqXOe6QhOMFTfQlrTJKi797VWUK-lOWu8TJ_B22yeEsiMoQCEa7v0qiFoVtJQrLlCYxOOf07YwyIoFt96InrPtRt5_5qSFr0NoHnwr0IsSvXIrD4HomoHgrVaBkAWt2RDT3bDOm-ELjdQDGnWYwvh276Etqvbw_N9hQrdOxFPVbAIHg",
    streaming: true,
    timeSlice: 1_000, // 1 second
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
              onClick={() => startRecording()}>
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
