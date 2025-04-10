import { useEffect, useRef } from 'react'
import { useNavigation } from 'react-router'
import LoadingBar from 'react-top-loading-bar'
import type { LoadingBarRef } from 'react-top-loading-bar'

export function NavigationLoadingBar() {
  const navigation = useNavigation()
  const ref = useRef<LoadingBarRef>(null)

  useEffect(() => {
    if (navigation.state === 'loading' || navigation.state === 'submitting') {
      ref.current?.continuousStart()
    }

    if (navigation.state === 'idle') {
      ref.current?.complete()
    }
  }, [navigation.state])

  return (
    <LoadingBar
      ref={ref}
      color="#18181B"
      shadow={false}
      height={2}
      transitionTime={100}
      waitingTime={300}
    />
  )
}
