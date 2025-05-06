// 'use client'
// import { useTransition } from 'react'
// import { Button } from './ui/button'
// import { useRouter } from 'next/navigation';
// import { createNewDocument } from '@/actions/action';


// function NewDocumentButton() {
//   const [isePending, startTransition] = useTransition();
//   const router = useRouter();
//   const handleCreateNewDocument = () => {
//     startTransition(async () => {
//       console.log("")
//       const {docId} = await createNewDocument();
//       router.push(`/doc/${docId}`)
//     })
//   }

//   return (
//     <Button onClick={handleCreateNewDocument} disabled={isePending}>{ isePending ? "Creating..." : "New Document"}</Button>
//   )
// }

// export default NewDocumentButton


'use client';

import { useTransition } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { createNewDocument } from '@/actions/action';

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      try {
        const { docId } = await createNewDocument();
        router.push(`/doc/${docId}`);
      } catch (error) {
        // Handle the error if user is not logged in, e.g., redirect to login
        console.error("Error creating document:", error);
      }
    });
  };

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? 'Creating...' : 'New Document'}
    </Button>
  );
}

export default NewDocumentButton;
