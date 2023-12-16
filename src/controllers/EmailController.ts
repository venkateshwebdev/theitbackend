import { Request, Response } from "express";
import User from "../models/UserModel";
import nodemailer from "nodemailer";
import { EMAIL_STYLE_BLOCK, populateTableRows } from "../utils";

/** Endpoint to send selected rows to the requested emal */
export const sendEmailToUsers = async (req: Request, res: Response) => {
  try {
    const { selectedIds, toEmail } = req.body;
    const userIds = selectedIds;
    const email = toEmail;

    // Validate request data
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !email) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Get user data for the provided user IDs
    const users = await User.getUsersByIds(userIds);

    // Check if users were found
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with the provided IDs" });
    }

    // Construct the email body using user data
    const emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${EMAIL_STYLE_BLOCK}
    </head>
    <body>
    <h2>Here is the requested data</h2>
    ${populateTableRows(users)}
    <h3>Venkatesh Sirigineedi</h3>
    </body>
    </html>
  `;

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Requested User Data:: [Venkatesh Sirigineedi]",
      html: emailBody,
    };

    // send email.
    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
