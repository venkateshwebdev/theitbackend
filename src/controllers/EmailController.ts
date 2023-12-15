import { Request, Response } from "express";
import User from "../models/UserModel";
import nodemailer from "nodemailer";

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
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    h2 {
      color: #333;
      text-align: center;
    }

    table {
      font-family: Arial, sans-serif;
      border-collapse: collapse;
      width: 80%;
      margin: 20px auto;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #f5f5f5;
    }

    p {
      text-align: center;
      margin-top: 20px;
      color: #555;
    }

    h3 {
      text-align: center;
      color: #3498db;
    }

    .hobby-list {
        max-height: 80px;
      max-width: 300px;
        overflow: scroll;
    }
  </style>
</head>

<body>
  <h2>Here is the requested data</h2>
  <table>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Hobbies</th>
    </tr>
    ${users
      .map(
        (user) =>
          `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
            <div  class="hobby-list">${
              user.hobbies ? user.hobbies.join(", ") : ""
            }
            </div></td>
          </tr>`
      )
      .join("")}
  </table>
 
  <h3>Venkatesh Sirigineedi</h3>
</body>

</html>

  `;

    // Send email using nodemailer (update the transporter details)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL, // Replace with your email
        pass: process.env.EMAIL_PASSWORD, // Replace with your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // Replace with your email
      to: email,
      subject: "Requested User Data:: [Venkatesh Sirigineedi]",
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
