/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./UserDetail.module.scss";
import { NextApiResponse } from "next";
import errorHandler from "../../pages/api/middleware/errorHandling";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://reqres.in/api/users/${id}`);
          setUser(response.data.data);
        } catch (error) {
          errorHandler(error, router);
        }
      };
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className={styles.userDetailContainer}>
      {user && (
        <div className={styles.userDetail}>
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className={styles.avatar}
          />
          <h2>{`${user.first_name} ${user.last_name}`}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
