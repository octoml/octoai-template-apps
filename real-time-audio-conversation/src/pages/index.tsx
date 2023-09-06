"use client";

import { useWhisper } from "@rkimball/use-whisper";
import { useState } from "react";
import React from 'react'

const activeTranscript : string[] = [];

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

  var recordingActive = false;

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
      // stopRecording()
      // startRecording()
      // console.log("restart recording")
      // if (transcript.text) {
      //   activeTranscript.push(transcript.text)
      //   console.log("Appending string ${transcript.text}")
      //   console.log(activeTranscript)
      // }
      transcript.text = "******************* ";
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
    chunks,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiUrl: "http://localhost:8000/v1/audio/",
    // apiUrl: "https://whisper-demo-cwrd1117bygh.customer-endpoints.nimbus.octoml.ai/v1/audio/",
    // apiKey: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImIzOTQ0ZDkwIn0.eyJzdWIiOiJhMDk1MmJjMy1kYTE1LTRkZmMtODZiOC05YjE3NTBhZTkzYTkiLCJ0eXBlIjoidXNlckFjY2Vzc1Rva2VuIiwidGVuYW50SWQiOiI0M2Q1NjI4Mi04NzEwLTRjODItYjViMS03MzNmZTAzYzcxZDciLCJ1c2VySWQiOiJkMzBlYjZiZC1kM2NkLTQ4NTQtODNjZi04OWUwZjU0MDU2YzIiLCJyb2xlcyI6WyJGRVRDSC1ST0xFUy1CWS1BUEkiXSwicGVybWlzc2lvbnMiOlsiRkVUQ0gtUEVSTUlTU0lPTlMtQlktQVBJIl0sImF1ZCI6ImIzOTQ0ZDkwLWYwY2YtNGYxNS04YjMzLWE1MGQ5YTFiYzQzOSIsImlzcyI6Imh0dHBzOi8vaWRlbnRpdHktZGV2Lm9jdG9tbC5haSIsImlhdCI6MTY5MzMzNTgyOH0.YxKRkNL1zfycll1WPRene_-57wsETRlB8CT7GK1C_BSYcDRMlTRlf73WBjVn5UE5HTqQcfWs2ncS3fUvp__oVw13webyMClCOl1CmSXKuADOUXNtTTJub0YsCye6TvaDB5qo7gfbujI6CWtbUkGSf-QXx3FczKGJwuzeUclR-JOMHbzd2m_ZekT53_ef1obsdvAsEm4K6KQhLOtPgNjeHRefp-MD236J_v45K7mWwUufAjbOrSUBGY47jkKntwnSaen6-i8Z0N-NcGAMHsCHaPDPEABppNY_DIly9MCDAvBhcDZqt9Q-m8TknablVnGM-cjuPNs4aYj3Q_KQZpTHLg",
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
            <span>{chunks.current}</span>
          </div>
        </form>
    </div>
  );
}
