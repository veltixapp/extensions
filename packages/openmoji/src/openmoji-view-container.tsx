import { useState } from 'react'
import { Veltix } from '@veltix/types'

export const OpenmojiViewContainer = ({ context }: { context: Veltix.Context }) => {
  const [message, setMessage] = useState('Hello')

  const handleInsert = () => {
    context.editor.createNode({
      position: { width: 200, height: 80 },
      type: 'openmoji',
      props: { message }
    })
  }

  return (
    <div className="p-2">
      <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white">
        <span className="bg-gradient-to-r from-cyan-200 to-emerald-600 bg-clip-text text-transparent">Openmoji</span>
      </h1>
      <div className="mb-4">
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
      </div>
      <button
        onClick={handleInsert}
        className="mb-2 me-2 w-full rounded-lg bg-[#2557D6] px-5 py-2 text-center text-sm font-medium text-white hover:bg-[#2557D6]/90"
      >
        Insert
      </button>
    </div>
  )
}
