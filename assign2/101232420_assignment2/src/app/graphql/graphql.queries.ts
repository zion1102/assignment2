import { gql } from "apollo-angular";

const users = gql `
query{
    getUsers{
      email
    }
    }`

const getListingByUser= gql`
query GetListingByUser($email: String!){
  getListingByUser(email: $email){
    listingId
    listingTitle
    description
    street
    city
    postalCode
    price
    email
    username
  }
  }`

const getListings= gql`
  query{
    getListings{
      listingId
      listingTitle
      description
      street
      city
      postalCode
      price
      email
      username
    }
  }`

export{users, getListingByUser, getListings}