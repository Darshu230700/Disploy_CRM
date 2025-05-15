import React from 'react'
import toast from 'react-hot-toast';
import { MdOutlineContentCopy } from "react-icons/md";

const ShareAndEmbed = ({ preview, routeToken }) => {

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`https://disploy-crm.vercel.app/WebForms/${preview?.route ? preview?.route : routeToken}`);
    toast.success("Copied to clipboard!");
  }

  return (
    <>
      <div className='p-6 dark:text-gray-400'>
        <div>
          <h2 className='mb-2 text-2xl'>
            Share as link
          </h2>
          <p className='mb-1'>Share the link below with your potential clients</p>
        </div>
        <div className='border border-gray-200 dark:border-gray-700 rounded-md'>
          <div className='p-3 w-full overflow-auto'>
            {`https://disploy-crm.vercel.app/WebForms/${preview?.route ? preview?.route : routeToken}`}
          </div>
          <div className='pb-3 flex justify-end'>
            <button className='flex rounded-full mr-3 items-center px-3 py-2 lg:px-4 bg-blue-100 collapse:bg-green-100 text-blue-600 text-md font-semibold rounded hover:bg-blue-600 hover:text-white'

              onClick={() => copyToClipBoard()}>
              <MdOutlineContentCopy size={20} />
              Copy to clipboard
            </button>
          </div>
        </div>
        <div className='my-8'>
          <div className='border border-gray-200 dark:border-gray-700'>
          </div>
        </div>
        <div>
          <h2 className='mb-5'>
            Embed the form on your website
          </h2>
          <p className='mb-2'>
            Choose how to embed the form on your website or send the instructions to your colleague
          </p>
        </div>
        <div>
        </div>
      </div>

    </>
  )
}

export default ShareAndEmbed
