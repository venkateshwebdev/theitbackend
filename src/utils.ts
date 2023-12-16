import User from "./models/UserModel";

// Based on NODE_ENV send options ( recommonded for postgres hosting, docs )
export const getDialectOptions = () => {
  const obj: { [key: string]: any } = {};
  if (process.env.NODE_ENV === "production")
    obj["dialectOptions"] = {
      ssl: {
        require: "true",
      },
    };
  return obj;
};

// populate rows with user info for email.
export const populateTableRows = (users: User[]) => {
  return `<table>
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
            <div class="hobby-list">${
              user.hobbies ? user.hobbies.join(", ") : ""
            }
            </div></td>
        </tr>`
      )
      .join("")}
</table>`;
};

// required styles for the email template
export const EMAIL_STYLE_BLOCK = `<style>
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
</style>`;
