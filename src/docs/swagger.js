import swaggerJsdoc from "swagger-jsdoc";

const options={
  definition:{
    openapi:"3.0.0",
    info:{title:"Russell Port API",version:"1.0.0",description:"Documentation de l'API Russell Port"},
    servers:[{url:"http://localhost:3000",description:"Local"}],
    components:{
      schemas:{
        Catway:{type:"object",properties:{
          catwayNumber:{type:"integer",example:1},
          catwayType:{type:"string",enum:["long","short"],example:"long"},
          catwayState:{type:"string",example:"occupied"}
        },required:["catwayNumber","catwayType","catwayState"]},
        Reservation:{type:"object",properties:{
          _id:{type:"string",example:"66f1a9f3a9..."},
          catwayNumber:{type:"integer",example:1},
          clientName:{type:"string",example:"Jean Dupont"},
          boatName:{type:"string",example:"Le Dauphin Bleu"},
          startDate:{type:"string",format:"date-time",example:"2025-10-01T00:00:00.000Z"},
          endDate:{type:"string",format:"date-time",example:"2025-10-10T00:00:00.000Z"}
        },required:["catwayNumber","clientName","boatName","startDate","endDate"]},
        User:{type:"object",properties:{
          id:{type:"string",example:"66f1a9f3a9..."},
          username:{type:"string",example:"admin"},
          email:{type:"string",format:"email",example:"admin@russell.local"}
        }},
        UserCreate:{type:"object",properties:{
          username:{type:"string",example:"francois"},
          email:{type:"string",example:"francois@example.com"},
          password:{type:"string",example:"Passw0rd!"}
        },required:["username","email","password"]},
        LoginBody:{type:"object",properties:{
          email:{type:"string",example:"admin@russell.local"},
          password:{type:"string",example:"Admin!123"}
        },required:["email","password"]}
      }
    }
  },
  apis:["./src/controllers/*.js"] // on documente dans les contrôleurs
};

export const swaggerSpec=swaggerJsdoc(options);
