import { NextApiRequest, NextApiResponse } from "next";

export default function errorHandler(err: any, router: any) {
  if (err.response && err.response.status === 404) {
    router.replace("/404");
  }
}
