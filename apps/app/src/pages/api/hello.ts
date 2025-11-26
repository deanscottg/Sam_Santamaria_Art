// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import sendMail from "../../../emails";
import Welcome from "../../../emails/Welcome";
import { render } from "mailing-core";
import {
  SESClient,
  SendRawEmailCommand,
  SendEmailCommand,
  SendRawEmailCommandInput,
  SendEmailCommandInput,
} from "@aws-sdk/client-ses";
import { z } from "zod";

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "me@deanscottg.net";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "me@email.deanscottg.net";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  const data = z
    .object({
      name: z.string(),
      email: z.string().email(),
      message: z.string(),
      artwork: z.string().optional(),
    })
    .parse(req.body);

  const client = new SESClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      sessionToken: process.env.AWS_SESSION_TOKEN || "",
    },
    region: "us-east-2",
  });

  const rawEmail = render(Welcome({ ...data }));
  const paramsForEmail: SendEmailCommandInput = {
    Destination: { ToAddresses: [RECIPIENT_EMAIL] },
    Message: {
      Body: { Html: { Data: rawEmail.html } },
      Subject: { 
        Data: data.artwork
          ? `Inquiry about "${data.artwork}" from ${data.name}`
          : `General Inquiry from ${data.name}` 
      },
    },
    Source: SENDER_EMAIL,
    ReplyToAddresses: [data.email],
  };

  const emailResponse = await client.send(new SendEmailCommand(paramsForEmail));
  res.status(200).json(emailResponse);
}
