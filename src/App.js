import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const BodyContainer = styled.div`
  .title {
    background-color: #33beff;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }

  .title h1 {
    color: white;
    margin: 0;
    font-size: 32px;
    font-weight: bold;
  }

  h2 {
    margin-left: 150px;
    margin-top: 50px;
  }
`;

const UsersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 150px 150px 150px;
`;

const UserCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  background-color: #f9f9f9;

  .imageContainer {
    background-color: #ccc;
    border-radius: 8px;
    overflow: hidden;
    width: auto;
    height: auto;
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 50%;
  }

  .userName {
    font-size: 28px;
  }

  .userMail {
    font-size: 18px;
  }
`;

const UserInfoCard = styled.div`
  .header {
    background-color: #33beff;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }

  .backButton {
    background: none;
    border: none;
    font-size: 20px;
    color: white;
    cursor: pointer;
    padding-left: 100px;
  }

  .userInfoContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }

  .userInfoContainer img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-info-details {
    font-size:22px;
    text-align: left;
    background-color: #F1F1F1;
    padding: 30px;
    margin: 8px 0;
    border-radius: 15px;
    margin-left: 35px;
  }

  .user-info-details p {
    margin: 8px 0;
  }

  .detailLabel {
    font-weight: bold;
    margin-right: 18px;
  }

  .value{
    margin: 0;
  }

  table {
    width: 100%;
    border: none; 
    border-collapse: collapse;
    
  }
  
  td {
    padding: 8px;
    border: none
  }
  
  td:first-child {
    width: 150px;
  }

`;

const UsersView = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <BodyContainer>
      <div className="title">
        <h1> Home </h1>
      </div>
      <h2>Users</h2>
      <UsersContainer>
        {users.map((user) => (
          <UserCard key={user.id} onClick={() => onUserClick(user.id)}>
            <div className="imageContainer">
              <img src={user.avatar} alt={user.first_name} />
            </div>
            <p className="userName">
              {user.first_name} {user.last_name}
            </p>
            <p className="userMail">{user.email}</p>
          </UserCard>
        ))}
      </UsersContainer>
    </BodyContainer>
  );
};

const UserInfoView = ({ userId, onBack }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${userId}`)
      .then((response) => setUser(response.data.data))
      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <UserInfoCard>
      <div className="header">
        <button className="backButton" onClick={onBack}>
          Back
        </button>
      </div>
      {user && (
        <div className="userInfoContainer">
          <img src={user.avatar} alt={user.first_name} />
          <div className="user-info-details">
            <table>
              <tbody>
                <tr>
                  <td className="detailLabel">First Name</td>
                  <td className="value">{user.first_name}</td>
                </tr>
                <tr>
                  <td className="detailLabel">Last Name</td>
                  <td className="value">{user.last_name}</td>
                </tr>
                <tr>
                  <td className="detailLabel">Email</td>
                  <td className="value">{user.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </UserInfoCard>
  );
};

function App() {
  const [view, setView] = useState("users");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = (userId) => {
    setView("userInfo");
    setSelectedUserId(userId);
  };

  const handleBackClick = () => {
    setView("users");
    setSelectedUserId(null);
  };

  return (
    <div>
      {view === "users" && <UsersView onUserClick={handleUserClick} />}
      {view === "userInfo" && (
        <UserInfoView userId={selectedUserId} onBack={handleBackClick} />
      )}
    </div>
  );
}

export default App;
