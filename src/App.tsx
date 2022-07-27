import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react'

function App () {
  // Create a GrowthBook instance
  const growthbook = new GrowthBook({
    // Callback when a user is put into an A/B experiment
    trackingCallback: (experiment, result) => {
      console.log('Experiment Viewed', {
        experimentId: experiment.key,
        variationId: result.variationId
      })
    }
  })

  useEffect(() => {
    growthbook.setAttributes({
      id: 'foo',
      deviceId: 'foo',
      company: 'foo',
      loggedIn: true,
      employee: true,
      country: 'foo',
      browser: 'foo',
      url: 'foo'
    })

    // Use a feature!

    const FEATURES_ENDPOINT =
      'http://localhost:3100/api/features/key_prod_e052f703237661ec'
    fetch(FEATURES_ENDPOINT)
      .then(res => res.json())
      .then(json => {
        console.log('json is', json)
        growthbook.setFeatures(json.features)
      })
      .catch(() => {
        console.log('Failed to fetch feature definitions from GrowthBook')
      })
  }, [])
  return (
    <GrowthBookProvider growthbook={growthbook}>
      <div className='App'>
        <p>Hi there!</p>
      </div>
    </GrowthBookProvider>
  )
}

// TODO: replace with real targeting attributes

export default App
