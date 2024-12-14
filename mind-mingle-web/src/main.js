// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Player } from "./player.js"
import { Recorder } from "./recorder.js"
import "./style.css"
import { LowLevelRTClient } from "rt-client"

let realtimeStreaming
let audioRecorder
let audioPlayer

async function start_realtime(endpoint, apiKey, deploymentOrModel) {
  if (isAzureOpenAI()) {
    console.log("aioi")
    realtimeStreaming = new LowLevelRTClient(
      new URL(endpoint),
      { key: apiKey },
      { deployment: deploymentOrModel }
    )
  } else {
    realtimeStreaming = new LowLevelRTClient(
      { key: apiKey },
      { model: deploymentOrModel }
    )
  }

  try {
    console.log("sending session config")
    await realtimeStreaming.send(createConfigMessage())
  } catch (error) {
    console.log(error)
    makeNewTextBlock(
      "[Connection error]: Unable to send initial config message. Please check your endpoint and authentication details."
    )
    setFormInputState(InputState.ReadyToStart)
    return
  }
  console.log("sent")
  await Promise.all([
    resetAudio(true), 
    handleRealtimeMessages()
  ])
}

function createConfigMessage() {
  let configMessage = {
    type: "session.update",
    session: {
      turn_detection: {
        type: "server_vad"
      },
      input_audio_transcription: {
        model: "whisper-1"
      }
    }
  }

  const systemMessage = getSystemMessage()
  const temperature = getTemperature()
  const voice = getVoice()

  if (systemMessage) {
    configMessage.session.instructions = systemMessage
  }
  if (!isNaN(temperature)) {
    configMessage.session.temperature = temperature
  }
  if (voice) {
    configMessage.session.voice = voice
  }
  console.log(configMessage)

  return configMessage
}

async function handleRealtimeMessages() {
  for await (const message of realtimeStreaming.messages()) {
    let consoleLog = "" + message.type

    switch (message.type) {
      case "session.created":
        // setFormInputState(InputState.ReadyToStop)
        // makeNewTextBlock("<< Session Started >>")
        // makeNewTextBlock()
        break
      case "response.audio_transcript.delta":
        // appendToTextBlock(message.delta)
        break
      case "response.audio.delta":
        const binary = atob(message.delta)
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
        const pcmData = new Int16Array(bytes.buffer)
        audioPlayer.play(pcmData)
        break

      case "input_audio_buffer.speech_started":
        // makeNewTextBlock("<< Speech Started >>")
        // let textElements = formReceivedTextContainer.children
        // latestInputSpeechBlock = textElements[textElements.length - 1]
        // makeNewTextBlock()
        audioPlayer.clear()
        break
      case "conversation.item.input_audio_transcription.completed":
        // latestInputSpeechBlock.textContent += " User: " + message.transcript
        break
      case "response.done":
        // formReceivedTextContainer.appendChild(document.createElement("hr"))
        break
      default:
        consoleLog = JSON.stringify(message, null, 2)
        break
    }
    if (consoleLog) {
      console.log(consoleLog)
    }
  }
  resetAudio(false)
}

/**
 * Basic audio handling
 */

let recordingActive = false
let buffer = new Uint8Array()

function combineArray(newData) {
  const newBuffer = new Uint8Array(buffer.length + newData.length)
  newBuffer.set(buffer)
  newBuffer.set(newData, buffer.length)
  buffer = newBuffer
}

function processAudioRecordingBuffer(data) {
  const uint8Array = new Uint8Array(data)
  combineArray(uint8Array)
  if (buffer.length >= 4800) {
    const toSend = new Uint8Array(buffer.slice(0, 4800))
    buffer = new Uint8Array(buffer.slice(4800))
    const regularArray = String.fromCharCode(...toSend)
    const base64 = btoa(regularArray)
    if (recordingActive) {
      realtimeStreaming.send({
        type: "input_audio_buffer.append",
        audio: base64
      })
    }
  }
}

async function resetAudio(startRecording) {
  recordingActive = false
  if (audioRecorder) {
    audioRecorder.stop()
  }
  if (audioPlayer) {
    audioPlayer.clear()
  }
  audioRecorder = new Recorder(processAudioRecordingBuffer)
  audioPlayer = new Player()
  audioPlayer.init(24000)
  if (startRecording) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    audioRecorder.start(stream)
    recordingActive = true
  }
}

/**
 * UI and controls
 */

const formReceivedTextContainer = document.querySelector(
  "#received-text-container"
)
const formStartButton = document.querySelector("#start-recording")
const formStopButton = document.querySelector("#stop-recording")
const formClearAllButton = document.querySelector("#clear-all")
const formEndpointField = document.querySelector("#endpoint")
const formAzureToggle = document.querySelector("#azure-toggle")
const formApiKeyField = document.querySelector("#api-key")
const formDeploymentOrModelField = document.querySelector(
  "#deployment-or-model"
)
const formSessionInstructionsField = document.querySelector(
  "#session-instructions"
)
const formTemperatureField = document.querySelector("#temperature")
const formVoiceSelection = document.querySelector("#voice")

let latestInputSpeechBlock

var InputState

;(function(InputState) {
  InputState[(InputState["Working"] = 0)] = "Working"
  InputState[(InputState["ReadyToStart"] = 1)] = "ReadyToStart"
  InputState[(InputState["ReadyToStop"] = 2)] = "ReadyToStop"
})(InputState || (InputState = {}))

function isAzureOpenAI() {
//   return formAzureToggle.checked
    return true
}

function guessIfIsAzureOpenAI() {
  const endpoint = (formEndpointField.value || "").trim()
  formAzureToggle.checked = endpoint.indexOf("azure") > -1
}

// function setFormInputState(state) {
//   formEndpointField.disabled = state != InputState.ReadyToStart
//   formApiKeyField.disabled = state != InputState.ReadyToStart
//   formDeploymentOrModelField.disabled = state != InputState.ReadyToStart
//   formStartButton.disabled = state != InputState.ReadyToStart
//   formStopButton.disabled = state != InputState.ReadyToStop
//   formSessionInstructionsField.disabled = state != InputState.ReadyToStart
//   formAzureToggle.disabled = state != InputState.ReadyToStart
// }

function getSystemMessage() {
//   return formSessionInstructionsField.value || ""
    return ""
}

function getTemperature() {
  return parseFloat("0.8")
}

function getVoice() {
  return "alloy"
}

function makeNewTextBlock(text = "") {
  let newElement = document.createElement("p")
  newElement.textContent = text
  formReceivedTextContainer.appendChild(newElement)
}

function appendToTextBlock(text) {
  let textElements = formReceivedTextContainer.children
  if (textElements.length == 0) {
    makeNewTextBlock()
  }
  textElements[textElements.length - 1].textContent += text
}

export const startRealtime = async () => {
//   setFormInputState(InputState.Working)

  const endpoint = import.meta.env.VITE_API_ENDPOINT
  const key = import.meta.env.VITE_API_KEY
  const deploymentOrModel = import.meta.env.VITE_API_DEPLOYMENT_MODEL

  if (isAzureOpenAI() && !endpoint && !deploymentOrModel) {
    alert("Endpoint and Deployment are required for Azure OpenAI")
    return
  }

  if (!isAzureOpenAI() && !deploymentOrModel) {
    alert("Model is required for OpenAI")
    return
  }

  if (!key) {
    alert("API Key is required")
    return
  }

  try {
    start_realtime(endpoint, key, deploymentOrModel)
  } catch (error) {
    console.log(error)
    setFormInputState(InputState.ReadyToStart)
  }
}

export const stopRealtime = async () => {
//   setFormInputState(InputState.Working)
  resetAudio(false)
  realtimeStreaming.close()
//   setFormInputState(InputState.ReadyToStart)
}

// formClearAllButton.addEventListener("click", async () => {
//   formReceivedTextContainer.innerHTML = ""
// })

// formEndpointField.addEventListener("change", async () => {
//   guessIfIsAzureOpenAI()
// })
// guessIfIsAzureOpenAI()
