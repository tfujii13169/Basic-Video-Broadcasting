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

  const screen3Client = useMemo(() => {
    const client = new RTCClient()
    if (!client._created) {
      client.createClient({ codec: stateCtx.codec, mode: stateCtx.mode })
      client._created = true
    }
    return client
  }, [stateCtx.codec, stateCtx.mode])
  useStream(screen3Client)

  const screen4Client = useMemo(() => {
    const client = new RTCClient()
    if (!client._created) {
      client.createClient({ codec: stateCtx.codec, mode: stateCtx.mode })
      client._created = true
    }
    return client
  }, [stateCtx.codec, stateCtx.mode])
  useStream(screen4Client)

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
    return () => {
      screen3Client && screen3Client.leave(() => mutationCtx.clearAllStream())
    }
  }, [screen3Client])

  useEffect(() => {
    return () => {
      screen4Client && screen4Client.leave(() => mutationCtx.clearAllStream())
    }
  }, [screen4Client])

  useEffect(() => {
    const config = {
      token: '00639eae28e3dc94434aaee175f6af88c18IAA9yECYsepfZzwm18S6OIk1aMOXhYgGR2gmAQmEya7VeeZxJwQAAAAAEABZjXLbss00XwEAAQCyzTRf',
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
      token: '00639eae28e3dc94434aaee175f6af88c18IADrXkjPdO9Lw///4t0UkmA7fp9s4GwYqCAzcNhqnPo5aVwgLp0AAAAAEABZjXLbv800XwEAAQC/zTRf',
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

  useEffect(() => {
    const config = {
      token: '00639eae28e3dc94434aaee175f6af88c18IAB8qJhy5woLzVf2Ezupt8H2ZjLa1JQ7Fu1p9Ere51kopsoQKeoAAAAAEABZjXLb0800XwEAAQDTzTRf',
      channel: 'Live3',
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
      'Live3' &&
      screen3Client._created &&
      screen3Client._joined === false
    ) {
      screen3Client
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
      token: '00639eae28e3dc94434aaee175f6af88c18IADxwQJSyXXkTkjW+A990FyMrqcWNALNShrJ97adsRZEHGmFTXQAAAAAEABZjXLb4c00XwEAAQDhzTRf',
      channel: 'Live4',
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
      'Live4' &&
      screen4Client._created &&
      screen4Client._joined === false
    ) {
      screen4Client
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
          stateCtx.live1Streams.map((stream, index) => (
            <StreamPlayer
              className={'stream-profile'}
              showProfile={stateCtx.profile}
              local={false}
              key={`${index}${stream.getId()}`}
              stream={stream}
              isPlaying={stream.isPlaying()}
              uid={stream.getId()}
              domId={`stream-player-${stream.getId()}`}
              countProfile={stateCtx.streams.length}
              showUid={true}
            ></StreamPlayer>
          ))
        }
        {
          stateCtx.live2Streams.map((stream, index) => (
            <StreamPlayer
              className={'stream-profile'}
              showProfile={stateCtx.profile}
              local={false}
              key={`${index}${stream.getId()}`}
              stream={stream}
              isPlaying={stream.isPlaying()}
              uid={stream.getId()}
              domId={`stream-player-${stream.getId()}`}
              countProfile={stateCtx.streams.length}
              showUid={true}
            ></StreamPlayer>
          ))
        }
        {
          stateCtx.live3Streams.map((stream, index) => (
            <StreamPlayer
              className={'stream-profile'}
              showProfile={stateCtx.profile}
              local={false}
              key={`${index}${stream.getId()}`}
              stream={stream}
              isPlaying={stream.isPlaying()}
              uid={stream.getId()}
              domId={`stream-player-${stream.getId()}`}
              countProfile={stateCtx.streams.length}
              showUid={true}
            ></StreamPlayer>
          ))
        }
        {
          stateCtx.live4Streams.map((stream, index) => (
            <StreamPlayer
              className={'stream-profile'}
              showProfile={stateCtx.profile}
              local={false}
              key={`${index}${stream.getId()}`}
              stream={stream}
              isPlaying={stream.isPlaying()}
              uid={stream.getId()}
              domId={`stream-player-${stream.getId()}`}
              countProfile={stateCtx.streams.length}
              showUid={true}
            ></StreamPlayer>
          ))
        }
      </div>
    </div>
  )
}

export default React.memo(ScreenPage)
