module.exports = {
  // createUser: { // This name should be model name defined in request model.
  //     201: {
  //         message: "User created successfully"
  //     },
  //     500: {
  //         internal: "Server Error"
  //     }
  // },
  getUsers: {
    200: [{
      email: 'string',
      password: 'string',
      // contact: 'number',
    }],
    500: {
      internal: "Server Error"
    }
  },
  // updateUser:{
  //     201: {
  //         message: "User Updated successfully"
  //     },
  //     500: {
  //         internal: "Server Error"
  //     }
  // },
  // getUserDetails: {
  //     200: {
  //         id: 'number',
  //         firstName: 'string',
  //         lastName: 'string',
  //         address: 'string',
  //         contact: 'number',
  //         createdAt: 'date',
  //         updatedAt: 'date'
  //     },
  //     500: {
  //         internal: "Server Error"
  //     }
  // },
};