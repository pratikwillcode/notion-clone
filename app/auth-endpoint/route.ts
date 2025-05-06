import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { sessionClaims } = await auth();

    if (!sessionClaims) {
        redirect('/sign-in');
    }
    //updated for deployment issues
    // Safe destructuring after null check
    const { email, fullName, image } = sessionClaims;

    const { room } = await req.json();

    const session = liveblocks.prepareSession(email, {
        userInfo: {
            name: fullName,
            email: email,
            avatar: image
        }
    });

    const usersInRoom = await adminDb
        .collectionGroup("rooms")
        .where("userId", "==", email)
        .get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    if (userInRoom?.exists) {
        session.allow(room, session.FULL_ACCESS);
        const { body, status } = await session.authorize();
        console.log("authorized");
        return new Response(body, { status });
    } else {
        return NextResponse.json(
            { message: "You are not in this room" },
            { status: 403 }
        );
    }
}
