'use client'

import dynamic from 'next/dynamic'

const Editor = dynamic(()=>import('@/app/_components/Editor'),{ssr:false})

type Props = {content:string}

const BlogEditor = ({content}: Props) => {
  return (
    <Editor editable={false} initialContent={content} />
  )
}

export default BlogEditor