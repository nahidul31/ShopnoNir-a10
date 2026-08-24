import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DB_URI);
const db = client.db();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4, // 1. ফর্মের সাথে মিলিয়ে ৪ করা হলো
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "tenant",
        input: true, // 2. সাইনআপের সময় এই ফিল্ড পাঠানো যাবে
      },
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
