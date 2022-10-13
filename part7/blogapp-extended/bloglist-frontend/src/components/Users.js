import React from 'react';

const Users = (user) => {
  return (
    <div>
      <h4>{user.name}</h4>
      <p>blog created {user.blogs.length}</p>
    </div>
  );
};

export default Users;
