import React from 'react'
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react'
export default function PostPage() {
    const { data: session } = useSession();
    
  return (
    <div>
      
    </div>
  )
}
