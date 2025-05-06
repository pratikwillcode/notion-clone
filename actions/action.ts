// 'use server';

// import { adminDb } from '@/firebase-admin';
// import { auth } from '@clerk/nextjs/server';
// import { console } from 'inspector';
// import { redirect } from 'next/navigation';

// export async function createNewDocument() {
//   const { sessionClaims } = await auth();
//   console.log(sessionClaims)
//   if(!sessionClaims){
//     console.warn("Please login")
//   }

//   const docCollectionRef = adminDb.collection("documents");
//   const docRef = await docCollectionRef.add({
//     title: "New Doc"
//   })

//   await adminDb.collection("users").doc(sessionClaims?.email!).collection("rooms").doc(docRef.id).set({
//     userId: sessionClaims?.email!,
//     role: "owner",
//     createdAt: new Date(),
//     roomId: docRef.id
//   })

//   return {docId: docRef.id}
// }


'use server';

import { adminDb } from '@/firebase-admin';
import liveblocks from '@/lib/liveblocks';
import { auth } from '@clerk/nextjs/server';
import { error } from 'console';
import { redirect } from 'next/navigation';

export async function createNewDocument() {
  const { sessionClaims } = await auth();

  // If the user is not logged in, redirect to Clerk login page
  if (!sessionClaims) {
    redirect('/sign-in'); // Adjust this path as necessary for your Clerk login
  }

  const docCollectionRef = adminDb.collection('documents');
  const docRef = await docCollectionRef.add({
    title: 'New Doc',
  });

  await adminDb.collection('users').doc(sessionClaims.email!).collection('rooms').doc(docRef.id).set({
    userId: sessionClaims.email!,
    role: 'owner',
    createdAt: new Date(),
    roomId: docRef.id,
  });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId:string) {
  const {sessionClaims} = await auth()
  if(!sessionClaims){
    throw new Error("You are not authorized to Delete Document")
  }
  console.log("deleteDocument", roomId)
  try{
    //delete document refernece itself
    await adminDb.collection("documents").doc(roomId).delete();
    const query = await adminDb
    .collectionGroup("rooms").where("roomId", "==", roomId).get()

    const batch = adminDb.batch();

    //delete room reference in the user's collection for every user in the room
    query.docs.forEach((doc) =>{
      batch.delete(doc.ref)
    })

    await batch.commit()

    //delete room in liveblocks
    await liveblocks.deleteRoom(roomId);
    return {success:true}
  }
  catch(error){
    console.error(error)
    return {success: false}
  }
}

export async function inviteUserToDocument(roomId:string, email:string) {
  const {sessionClaims} = await auth()
  if(!sessionClaims){
    throw new Error("You are not authorized to Invite a user")
  }
  console.log("InviteUserToDocument", roomId, email);
  try{
    await adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .set({
      userId:email,
      role:"editor",
      createdAt: new Date(),
      roomId
    })
    return {success: true}
  }
  catch(error){
    console.error(error)
    return {success: false}
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  const {sessionClaims} = await auth()
  if(!sessionClaims){
    throw new Error("You are not authorized to Remove a user")
  }
  console.log("removeUserFromDocument", roomId, email);
  try{
    await adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .delete();

    return {success: true}
  }

  catch(error){
    console.error(error)
    return {success: false}
  }
}
