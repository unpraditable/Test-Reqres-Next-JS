/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserList.module.scss";
import Link from "next/link";
import { User } from "@/interfaces/Users";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMoreUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://reqres.in/api/users?page=${currentPage}`
      );
      setUsers((prevUsers) => [...prevUsers, ...response.data.data]);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchMoreUsers();
  }, [currentPage]);

  const handleSeeMore = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.userListContainer}>
      <h2>User List</h2>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userItem}>
            <Link href={`users/${user.id}`}>
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                <p>{user.email}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!loading && currentPage < totalPages && (
        <button className={styles.seeMoreButton} onClick={handleSeeMore}>
          See More
        </button>
      )}
    </div>
  );
};

export default UserList;
