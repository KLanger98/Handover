const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const {User} = require('../model'); 
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';




async function getUserDetailsById(userId) {
  try {
    const userDetails = await User.findById(userId); // Use Mongoose's findById method
    return userDetails;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details');
  }
}


module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    }
  }),
  authMiddleware: async function  (req) {

    let token = req.body.token || req.query.token || req.headers.authorization;
    
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return {};
    }
    let user;
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      const profile = await getUserDetailsById(data._id);
      user = { ...data, ...profile._doc }
      //  if(user) {
      //   console.log("User found");
      //   req.user = { ...data, ...user._doc};
      // } else {
      //   console.log("No user found but token exists?");
      // }

     
      return {user};
    } catch (error){
      console.error(error);
      return {}
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
