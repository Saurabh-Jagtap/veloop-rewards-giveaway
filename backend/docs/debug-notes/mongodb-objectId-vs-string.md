# MongoDB ObjectId vs String

## Mistake

While manually inserting AdWatchEvent documents through MongoDB Compass, I inserted `userId` and `referralId` as strings.

## Problem

The Mongoose schema defines both fields as `Schema.Types.ObjectId`.

MongoDB treats these as different values:

ObjectId("...")
"..."

Even when the visible IDs are identical.

## Result

The query:

AdWatchEventModel.countDocuments({
    referralId: referral._id,
    status: "VERIFIED",
})

returned `0` because the stored `referralId` was a String while `referral._id` was an ObjectId.

## Fix

Insert referenced IDs as BSON ObjectIds, not strings.

## General lesson

When manually creating MongoDB test data, always match the BSON type defined by the Mongoose schema.