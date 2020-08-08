import React, { useEffect, useState, useMemo } from 'react'
import clsx from 'clsx'
import { useGlobalState, useGlobalMutation } from '../utils/container'
import useStream from '../utils/use-stream'
import RTCClient from '../rtc-client'
import StreamPlayer from './meeting/stream-player'

const ScreenPage = () => {
  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()

  window.addEventListener('storage', function (e) {
    mutationCtx.updateConfig({ screen: e.newValue })
  })

  const screenClient = useMemo(() => {
    const client = new RTCClient()
    if (!client._created) {
      client.createClient({ codec: stateCtx.codec, mode: stateCtx.mode })
      client._created = true
    }
    return client
  }, [stateCtx.codec, stateCtx.mode])
  useStream(screenClient)

  const screen2Client = useMemo(() => {
    const client = new RTCClient()
    if (!client._created) {
      client.createClient({ codec: stateCtx.codec, mode: stateCtx.mode })
      client._created = true
    }
    return client
  }, [stateCtx.codec, stateCtx.mode])
  useStream(screen2Client)

  useEffect(() => {
    return () => {
      screenClient && screenClient.leave(() => mutationCtx.clearAllStream())
    }
  }, [screenClient])

  useEffect(() => {
    return () => {
      screen2Client && screen2Client.leave(() => mutationCtx.clearAllStream())
    }
  }, [screen2Client])

  useEffect(() => {
    const config = {
      token: '00639eae28e3dc94434aaee175f6af88c18IACj1d0gHdIIN767wBnO/8IbCJjm+TSSbwCHbES+1K0hPuZxJwQAAAAAEAA5dvKzjkcuXwEAAQCORy5f',
      channel: 'Live1',
      microphoneId: -1,
      cameraId: -1,
      resolution: stateCtx.config.resolution,
      muteVideo: true,
      muteAudio: true,
      uid: stateCtx.uid,
      host: false
      // beauty: stateCtx.beauty
    }
    if (
      'Live1' &&
      screenClient._created &&
      screenClient._joined === false
    ) {
      screenClient
        .join(config)
        .then((uid) => {
          mutationCtx.updateConfig({ uid })
          console.log(stateCtx.streams)
        })
        .catch((err) => {
          mutationCtx.toastError(`Media ${err.info}`)
        })
    }
  })

  useEffect(() => {
    const config = {
      token: '00639eae28e3dc94434aaee175f6af88c18IABimf9/KYIWF1fy49nYDpr5MKTVgG6aR+hzNZQbnOvAuFwgLp0AAAAAEAA5dvKz3GAuXwEAAQDcYC5f',
      channel: 'Live2',
      microphoneId: -1,
      cameraId: -1,
      resolution: stateCtx.config.resolution,
      muteVideo: true,
      muteAudio: true,
      uid: stateCtx.uid,
      host: false
      // beauty: stateCtx.beauty
    }
    if (
      'Live2' &&
      screen2Client._created &&
      screen2Client._joined === false
    ) {
      screen2Client
        .join(config)
        .then((uid) => {
          mutationCtx.updateConfig({ uid })
          console.log(stateCtx.streams)
        })
        .catch((err) => {
          mutationCtx.toastError(`Media ${err.info}`)
        })
    }
  })

  return (
    <div className="meeting">
      <div className="stream-container">
        {
          stateCtx.config.screen === '1'
            ? stateCtx.mainStreams.map((stream, index) => (
              <StreamPlayer
                className={'stream-profile'}
                showProfile={stateCtx.profile}
                local={false}
                key={`${index}${stream.getId()}`}
                stream={stream}
                isPlaying={stream.isPlaying()}
                uid={stream.getId()}
                domId={`stream-player-${stream.getId()}`}
                countProfile={stateCtx.mainStreams.length}
                showUid={true}
              ></StreamPlayer>
            ))
            : stateCtx.subStreams.map((stream, index) => (
              <StreamPlayer
                className={'stream-profile'}
                showProfile={stateCtx.profile}
                local={false}
                key={`${index}${stream.getId()}`}
                stream={stream}
                isPlaying={stream.isPlaying()}
                uid={stream.getId()}
                domId={`stream-player-${stream.getId()}`}
                countProfile={stateCtx.subStreams.length}
                showUid={true}
              ></StreamPlayer>
            ))
        }
      </div>
    </div>
  )
}

export default React.memo(ScreenPage)
