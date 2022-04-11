const User = require('./models/Employee');
const Listing = require('./models/Listing');
const Booking  = require("./models/Bookings")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const pick = require("lodash").pick;

const SECRET = "createaverystrongsec34!retthatalsoincludes2423412wdsa324e34e";
exports.resolvers = {
    Query: {
        getUsers: async (parent, args) => {
            return User.find({})
        },
        getUserByEmail: async (parent, args) => {
            return User.find({"email" : args.email})
        },
        getUserByType: async (parent, args) => {
            return User.find({"type" : args.type})
        },
        getListings: async (parent, args) => {
            return Listing.find({})
        },
        getListing: async (parent, args) => {
            return Listing.find({"listingId": args.listingId})
        },
        getListingByUser: async (parent, args) => {
            return Listing.find({"email": args.email})
        },
        getListingByName: async (parent, args) => {
            return Listing.find({"listingTitle" : args.listingTitle})
        },
        getListingByCity: async (parent, args) => {
            return Listing.find({"city" : args.city})
        },
        getListingByPostalCode: async (parent, args) => {
            return Listing.find({"postalCode" : args.postalCode})
        },
        getUserBookings: async (parent, args) => {
            return Booking.find({"username" : args.username})
        },
      
       
    },

    Mutation: {
        register: async (parent, args) => {
            console.log(args)

            let newUser = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                type: args.type,
                password:args.password
                
            })

            return newUser.save()
        },
        login: async (root, args, context) => {
            // check if the user exists
            const user = await User.findOne({ email: args.email });

            var isValid= false;
            if (!user) {
              throw new Error("No user found ");
            }
            // check if the password matches the hashed one we already have
            if(user.password == args.password){
                isValid = true;
            }
            if (!isValid) {
              throw new Error("Incorrect password ");
            }
            //   sign in the user
            // if the user exist then create a token for them
            const token = await jwt.sign(
              {
                user: pick(user, ["_id", "email"])
              },
              SECRET,
              // this token will last for a day, but you can change it
              // check the jsonwebtoken for more on this
              { expiresIn: "1d" }
            );
            return token;
          },
        
    
        
        updateUser: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }

            return await User.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                type: args.type,
                password: args.password
                }
            }, {new: true}, (err, user) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the user');
                } else 
                {
                    return user
                }
            }
        );
      },
      deleteUser: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await User.findByIdAndDelete(args.id)
      },

      addListing: async (parent, args) => {
        console.log(args)

        let newListing = new Listing({

            listingId: args.listingId,
            listingTitle: args.listingTitle,
            description: args.description, 
            street: args.street,
            city: args.city,
            postalCode: args.postalCode,
            price: args.price,
            email: args.email,
            username: args.username
           
            
        })

        return newListing.save()
    },
    updateListing: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return;
        }

        return await Listing.findOneAndUpdate(
        {
            _id: args.id
        },
        {
            $set: {
                listingId: args.listingId,
                listingTitle: args.listingTitle,
                description: args.description, 
                street: args.street,
                city: args.city,
                postalCode: args.postalCode,
                price: args.price,
                email: args.email,
                username: args.username
            }
        }, {new: true}, (err, listing) => {
            if (err) 
            {
                console.log('Something went wrong when updating the listing');
            } else 
            {
                return listing
            }
        }
    );
  },
  deleteListing: async (parent, args) => {
    console.log(args)
    if (!args.id){
        return JSON.stringify({status: false, "message" : "No ID found"});
    }
    return await Listing.findByIdAndDelete(args.id)
  },
  addBooking: async (parent, args) => {
    console.log(args)

    let newBooking = new Booking({

        listingId: args.listingId,
        bookingId: args.bookingId,
        bookingStart: args.bookingStart, 
        bookingEnd: args.bookingEnd,
        
        username: args.username
       
        
    })

    return newBooking.save()
},
/*
login: async(_,{username, password},{req} )=>{
    const user = await User.findOne({where: {username}})
    if(!user){
        return null
    }

    const accessToken = sign({userID: user.id},)

    return user;
}
    */
    }
}