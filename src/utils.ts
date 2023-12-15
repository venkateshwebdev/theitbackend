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
