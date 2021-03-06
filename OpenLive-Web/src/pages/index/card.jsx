import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import IndexCard from './index-card'
import SettingsCard from './settings-card'
const useStyles = makeStyles(theme => ({
  fontStyle: {
    color: '#9ee2ff'
  },
  midItem: {
    marginTop: '1rem',
    marginBottom: '6rem'
  },
  item: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  coverContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
    position: 'relative'
  },
  coverRight: {
    position: 'relative',
    flex: 1,
    display: 'flex'
  },
  container: {
    justifyContent: 'center'
  },
  card: {
    display: 'flex',
    minHeight: 420,
    maxHeight: 420,
    borderRadius: '10px',
    boxShadow: '0px 6px 18px 0px rgba(0,0,0,0.2)'
  },
  input: {
    maxWidth: '250px',
    minWidth: '250px',
    alignSelf: 'center'
  },
  grid: {
    margin: '0 !important'
  },
  button: {
    height: '44px',
    width: '260px',
    '&:hover': {
      backgroundColor: '#307AFF'
    },
    margin: theme.spacing(1),
    marginTop: '24px',
    backgroundColor: '#44a2fc',
    borderRadius: '30px'
  }
}))

export default function CardPage () {
  const classes = useStyles()

  return (
    <Box display="flex" justifyContent="center">
      <Card className={classes.card}>
        <Box display="flex" flex="1">
          <div className={classes.coverRight}>
            <Switch>
              <Route exact path="/" component={IndexCard}></Route>
              <Route path="/setting" component={SettingsCard}></Route>
            </Switch>
          </div>
        </Box>
      </Card>
    </Box>
  )
}
