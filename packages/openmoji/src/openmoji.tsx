import { useState } from 'react'

type OpenmojiProps = {
  message: string
}

export const Openmoji = (props: OpenmojiProps) => {
  const [msg] = useState(props.message)
  return <div className="p-4 border rounded">{msg}</div>
}

Openmoji.defaultProps = {
  message: "Hello from Openmoji",
}
