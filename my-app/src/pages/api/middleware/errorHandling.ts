import { NextApiResponse } from "next";

export default function errorHandler(err: any, res: NextApiResponse) {
  if (err.response && err.response.status === 404) {
    return { redirect: { destination: "/404", permanent: false } };
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
