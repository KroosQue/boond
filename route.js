require('dotenv').config();
const { response } = require('express');
const express = require('express');
const app = express();
const lienDemo = process.env.lienDemo
const lienProd = process.env.lienProd
const Authorization = process.env.Authorization
const urlBoonddemo = lienDemo
const urlBoondProd = lienProd
const keysAuthorization = Authorization
var request = require("request");
app.use(express.json({ extended: true }));          // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));    // to support URL-encoded bodies


function companyBoond(type,attributes,data) {   
    this.type = type                              
    this.attributes = attributes
    this.data = data
}
function contactBoond (data,type,attributes,relationships,company){
    this.type = type
    this.attributes = attributes
    this.data = data
    this.relationships = relationships
    this.company = company
}
function Hubspot(subscriptionType,propertyValue,propertyName,id_boond){
    this.subscriptionType = subscriptionType
    this.propertyValue = propertyValue
    this.propertyName = propertyName
    this.id_boond = id_boond
}
function besoinBoond(data,type,attributes,relationships,company,contact){
    this.type = type
    this.attributes = attributes
    this.data = data
    this.relationships = relationships
}

var besoinB = new besoinBoond(
    
        data = {
                type : "opportunity",
                    attributes : {
                            "title": " ",
                            "description": " "
                    },
                    
         relationships: {
                    "contact" : {
                        "data":{
                            "id" : " ",
                            "type": " contact "
                        }
                    },
                      company : {
                        data : {
                            "id"  : " ",
                             "type" : "company"
                        }
                     }
                 }
             }
        
)
console.log(besoinB)

var ContactH = new Hubspot(
    subscriptionType = 
        {
          "eventId": " ",
          "subscriptionId": " ",
          "portalId": " ",
          "occurredAt": " ",
          subscriptionType  :  "contact.propertyChange",
          "attemptNumber": " ",
          "objectId": " ",
          "changeSource": "CRM",
          propertyName : " ",
          propertyValue :  " "
        },
    id_contactB = 0
      
)

//console.log(ContactH.subscriptionType.propertyValue)
//console.log(ContactH.subscriptionType.subscriptionType)
//console.log(ContactH.subscriptionType.propertyName)


var CompanyH = new Hubspot(
        {
          "eventId": " c le eventID",
          "subscriptionId": " ",
          "portalId": " ",
          "occurredAt": " ",
          subscriptionType  :  "company.propertyChange",
          "attemptNumber": " ",
          "objectId": " ",
          "changeSource": "CRM",
          propertyName : " ",
          propertyValue :  " "
        },
        id_companyB = 0
)

//console.log(CompanyH.subscriptionType.eventId)

var CompanyB = new companyBoond(
    type = "Company",
    attributes = {
        "name": " " ,
        "state":  "" ,
        "website":  "" ,
        "address":  " " ,
        "postcode": " " ,
        "town": " " ,
        "country": " "
},
    data = attributes);


var ContactB = new contactBoond(
    type = "contact",
    attributes = {
        "firstName": " ",
        "lastName ": " ",
        "state" : " " ,
        "email1" : "  ",
        "phone1" : " ",
        "address" : " ",
        "postcode " : " ",
        "town":" ",
        "country": " "
    },
    
    data = attributes,
    
    relationships  = "company",
        company = {
            id : 0 , //////// RECUPERATION DE L'iD DE LENTREPRISE AVEC UN NOM SPE EX: when name = CompanyB.attributes.name
            "type": "company"
        }
)
//console.log(ContactB.relationships.company)


function mapCompany(CompanyB,CompanyH){ ////// var body = req.body +------+ sur le chemin

    try{

    switch(CompanyH.subscriptionType.propertyName){
        case 'name' :
            CompanyB.attributes.name = CompanyH.subscriptionType.propertyValue 
            break;
    
        case 'country' :
            CompanyB.attributes.country = CompanyH.subscriptionType.propertyValue 
            break;
           
        case 'state' :
            CompanyB.attributes.state = CompanyH.subscriptionType.propertyValue  
            break;
   
        case 'website' :
            CompanyB.attributes.website = CompanyH.subscriptionType.propertyValue 
            break;
   
        case 'address' :
            CompanyB.attributes.address = CompanyH.subscriptionType.propertyValue 
            break;
    
        case 'zip' :
            CompanyB.attributes.postcode = CompanyH.subscriptionType.propertyValue 
            break;
    
        case 'town' :
            CompanyB.attributes.city = CompanyH.subscriptionType.propertyValue 
            break;

        default : 
            console.log("Tous les champs de ont été mapper --> Pret à l'envoie" )  
          }
        }
        catch(e){
            console.log("Les données de l'entreprise n'ont pas pu être mapper")
        }
}



function sendCompany(CompanyB){
    var optionsBcompany = { 
        method: 'POST',
        url: urlBoonddemo +'/api/companies/', 
        headers: 
        { 
            'Content-Type': 'application/json',    
            'Authorization' : keysAuthorization
            },
            body: {
                data:{
                attributes:{
                        name: 
                            CompanyB.attributes.name,

                        state: 
                            CompanyB.attributes.state,

                          website: 
                            CompanyB.attributes.website,

                        address: 
                            CompanyB.attributes.address,

                         postcode: 
                             CompanyB.attributes.postcode,

                        town: 
                            CompanyB.attributes.town,

                        country: 
                            CompanyB.attributes.country
                    },
                type:"company"
                }
            },
        json: true
        };

        request(optionsBcompany, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            
        });
};
//console.log(ContactB)

function getID(){
    
/*    
    var optionsB = { 
       method: 'GET',
       url: urlBoonddemo+'/api/companies/'+id,
       headers: 
       { 
           'Content-Type': 'application/json',
           'Authorization' : 'Basic Y2VkcmljLm1vdWduZUBxdWVyaWFkaXMuY29tOkJvb25kMjAyMTA0IQ=='
       
           },         
       json: true
       };
       request(optionsB, function (error, response, body) {
           if (error) throw new Error(error);
           console.log(body.data.id);
           
       });
    };

*/
//console.log(getID(4))


function mapContact(ContactB,ContactH){ ////// var body = req.body +------+ sur le chemin
    try{

    switch(ContactH.subscriptionType.PropertyName){
        case 'firstname' :
            ContactB.attributes.firstname = ContactH.subscriptionType.propertyValue
            break;
    
        case 'lastname' :
            ContactB.attributes.lastname = ContactH.subscriptionType.propertyValue 
            break;
    
        case 'phone' :
            ContactB.attributes.phone1 = ContactH.subscriptionType.propertyValue 
            break;
   
        case 'country' :
            ContactB.attributes.country = ContactH.subscriptionType.propertyValue
            break;
   
        case 'address' :
            ContactB.attributes.address = ContactH.subscriptionType.propertyValue 
            break;
    
        case 'zip' :
            ContactB.attributes.postcode = ContactH.subscriptionType.propertyValue 
            break;
    
        case 'town' :
            ContactB.attributes.city = ContactH.subscriptionType.propertyValue  
            break;

        case 'state' :
            ContactB.attributes.state = ContactH.subscriptionType.propertyValue  
            break;

        case 'email' :
            ContactB.attributes.email1 = ContactH.subscriptionType.propertyValue
            break;

        default : 
            console.log("Tous les champs de ont été mapper --> Pret à l'envoie" ) 
    }
}
    catch(e){
        console.log(" Les données du contact n'ont pas pu être mapper ")
    }
}


function sendContact(ContactB){
    var options = { 
        method: 'POST',
        url: urlBoonddemo +'/api/companies/', 
        headers: 
        { 
            'Content-Type': 'application/json',
            'Authorization' : keysAuthorization
        
            },
            body:
                {
                    data: {
                        type: "contact",
                        attributes : {
                                    firstName: 
                                        ContactB.attributes.firstname ,

                                    lastName:
                                        ContactB.attributes.lastname,

                                    state: 
                                        ContactB.attributes.state,

                                    email1: 
                                        ContactB.attributes.email1,

                                    phone1: 
                                        ContactB.attributes.phone1,

                                    address: 
                                        ContactB.attributes.address,

                                    postcode: 
                                        ContactB.attributes.postcode,

                                    town:
                                        ContactB.attributes.city,

                                    country: 
                                        ContactB.attributes.country
                        },
                        relationships : {
                            company : {
                                    id : 0, /////////////////////////////////////
                                    type: "company"
                            }
                        }
                    }
                },
        json: true
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            //console.log(body);
        });
    return response
};

function pointer(body){ /// body = la charge utile de hubspot 
    if (body.subscriptionType === 'company.propertyChange'){
        
        mapCompany(CompanyB,CompanyH)
        sendCompany(CompanyB)
    }
    else if (body.subscriptionType === 'contact.propertyChange'){
        mapContact(ContactB,ContactH)
        sendContact(ContactB)
    }
  }
}
