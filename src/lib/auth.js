import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.DB_URI);
const db = client.db();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4, // ফর্মের সাথে মিলিয়ে ৪
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "tenant",
        input: true, // সাইনআপের সময় এই ফিল্ড পাঠানো যাবে
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [jwt()],
});
