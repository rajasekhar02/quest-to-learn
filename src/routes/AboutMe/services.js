import { authAxios } from "./axiosConfig";
import CONSTANTS from "./constants.json";
// authentication needed apis
const castToPayload = function (graphqlQuery, variables = {}) {
  return {
    query: graphqlQuery,
    variables
  };
};
const userQuery = `
query UserDetails($user_id:String!){
  user_details: user (id: $user_id){
    sys {
      id
    }
    firstName
    lastName
    profilePictureUrl {
      url
    },
    quotes {
        text,
        author
    }
    contactDetails {
        email,
        githubProfileLink,
        linkedInProfileLink,
        houseAddress,
        phoneNumber
    }
  }
}
`;

const contactQuery = `
query ContactDetails($user_id: String!){
    contact_details: contactCollection(where:{
    user:{
        sys:{
        id:$user_id
        }
    },
    }){
        items {
            email,
            githubProfileLink,
            linkedInProfileLink,
            houseAddress,
            phoneNumber
        }
    }
}
`;
const educationDetails = `
query EducationDetails($user_id: String!) {
  education_details: educationCollection(where: {user: {sys: {id: $user_id}}},order: [startDate_DESC]) {
    items {
      universityName
      universityLink
      isCurrent
      startDate
      endDate
      educationSlug
      coursesEnrolledCollection{
        items {
        	title,
          courseDescription{
            json
          }
      	}
      }
      specialization
    }
  }
}
`;
export const getUserDetails = async function () {
  const response = await authAxios.post(
    "",
    castToPayload(userQuery, { user_id: CONSTANTS.USER_ID })
  );
  return response.data.data.user_details;
};
export const getEducationDetails = async function () {
  const response = await authAxios.post(
    "",
    castToPayload(educationDetails, { user_id: CONSTANTS.USER_ID })
  );
  return response.data.data.education_details.items;
};
export default {
  getUserDetails,
  getEducationDetails
};
