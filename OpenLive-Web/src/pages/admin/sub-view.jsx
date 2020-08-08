import React, { useEffect, useState, useMemo } from 'react'
import clsx from 'clsx'
import { useGlobalState, useGlobalMutation } from '../../utils/container'
import useStream from '../../utils/use-stream'
import RTCClient from '../../rtc-client'
import Button from '@material-ui/core/Button'
import StreamPlayer from '../meeting/stream-player'

export default function SubView () {
  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()

  const subClient = useMemo(() => {
    const client = new RTCClient()
    if (!client._created) {
      client.createClient({ codec: stateCtx.codec, mode: stateCtx.mode })
      client._created = true
    }
    return client
  }, [stateCtx.codec, stateCtx.mode])
  const [localStream, currentStream] = useStream(subClient)

  useEffect(() => {
    return () => {
      subClient && subClient.leave(() => mutationCtx.clearAllStream())
    }
  }, [subClient])

  const handleClick = (props) => {
    console.log(props)

    const config = {
      token: props.token,
      channel: props.channel,
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
      props.channel &&
      subClient._created &&
      subClient._joined === false
    ) {
      subClient
        .join(config)
        .then((uid) => {
          mutationCtx.updateConfig({ uid })
        })
        .catch((err) => {
          mutationCtx.toastError(`Media ${err.info}`)
        })
    }
  }

  return (
    <div className="sub-view">
      SubView
      <div className="stream-container small">
        {stateCtx.subStreams.map((stream, index) => (
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
        ))}
      </div>
      <Button
        onClick={() => {
          handleClick({ channel: 'Live1', token: '00639eae28e3dc94434aaee175f6af88c18IACj1d0gHdIIN767wBnO/8IbCJjm+TSSbwCHbES+1K0hPuZxJwQAAAAAEAA5dvKzjkcuXwEAAQCORy5f' })
        }}
        variant="contained"
        color="primary"
      >
        Get Live1
      </Button>
      <Button
        onClick={() => {
          handleClick({ channel: 'Live2', token: '00639eae28e3dc94434aaee175f6af88c18IACc72TW0wmyIvwqzrIxgQgFDcGA8cuOV3OZMtRxXaaqcVwgLp0AAAAAEAA5dvKzqFouXwEAAQCnWi5f' })
        }}
        variant="contained"
        color="primary"
      >
        Get Live2
      </Button>
    </div>
  )
}
