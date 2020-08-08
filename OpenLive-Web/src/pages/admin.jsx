import React, { useEffect } from 'react'
import { useGlobalState, useGlobalMutation } from '../utils/container'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import MainView from './admin/main-view'
import SubView from './admin/sub-view'

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    minWidth: 800,
    minHeight: 600,
    boxSizing: 'content-box',
    display: 'flex',
    justifyContent: 'center'
  }
}))

const Admin = () => {
  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()
  const classes = useStyles()

  useEffect(() => {
    if (stateCtx.loading === true) {
      mutationCtx.stopLoading()
    }
  }, [stateCtx.loading, mutationCtx])

  return (
    <div className="admin">
      <div className="view-container">
        <MainView />
        <SubView />
      </div>
    </div>
  )
}

export default Admin
