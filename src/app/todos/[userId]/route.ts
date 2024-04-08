// the next/server library is new, If you've worked with next.js before and this seems more complicated than before, it appears to be because these changes, which require a bit more boilerplate, are closer to the 'fetch' general standard, and give us more control over what's going on.

import addCarToFirestore from "@/app/lib/firebase/utils/addNewCarToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  // we can manually define what we expect to receive here, altough, due to the way we access this file, we will not be enjoying the benefits of typescript when we call this
  { params }: { params: { userId: string } }
) {
  // we destructure the userId, which is deduced by the framework based on the [userId] in the route
  const { userId } = params;
  // we get the raw body of the request, unfortunately, this is the simplest way to achieve this at this point, the raw access that we have is a rather new concept to the framework
  // In a real application, we might build utilities for some of this boilerplatey stuff so we repeat ourselves less often.
  const rawBody = await request.text();
  const data = rawBody ? JSON.parse(rawBody) : {};
  // we implement a superficial validation here, we could do a more sophisticated one, but this is a quick and dirty solution
  // if (
  //   !userId ||
  //   !data.description ||
  //   !data.title ||
  //   // we check if completed is undefined because the check from above would pass because it also captures false value
  //   data.completed === undefined
  // ) {
  //   return NextResponse.json(
  //     { error: "Missing required fields" },
  //     { status: 400 }
  //   );
  // }
  // we add the userId to the data object
  const newCarRegistration = {
    createdBy: userId,
    createdAt: new Date().toISOString(),
    carIdNumber: data.carIdNumber.toUpperCase(),
    phoneNumber: data.phoneNumber.toUpperCase(),
  };
  try {
    // finally trigger the send to the DB utility, and capture the errors, if any
    await addCarToFirestore(newCarRegistration);
    return NextResponse.json({ message: "Processed successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
