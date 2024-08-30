import { People } from "@mui/icons-material";

export const   SelectTravelsList=[
    {
        id:1,
        title:"Just Me",
        desc:"A solo traveleres with exploration",
        icon:"✈️",
        people:"1"
    },
    {   id:2,
        title:"A Couple",
        desc:"Two Travelers in Tamboo",
        icon:"🥂",
        people:"2 People"

    }
    ,{
        id:3,
        title:"Family",
        desc:"A group of fun loving adv.",
        icon:"🏡",
        people:"3 to 5 People"
    }
,{
    id:3,
    title:"Friends",
    desc:"A bunch of thrill-seeks",
    icon:"👬",
    people:"5 to 10 People"
}
]
export const SelectBudgetOptions=[
    {
        id:1,
        title:"Cheap",
        desc:"Stay conscious of costs",
        icon:"💵"
    },
    {
        id:2,
        title:"Moderate",
        desc:"Keep Costs on the average side",
        icon:"💰"
    },
    {
        id:3,
        title:"Luxury",
        desc:"Don't worry about cost",
        icon:"💸"
    },
]
export const AI_PROMPT="Generate travel plan for location:{location} for {totalDays} Days for {traveler} with a{budget} budget,give me Hotels Option list with HotelName,Hotel Address,price ,hotel,imageurl,geo coordinates ,rating,descriptions and suggest itinerary with placeName ,PlaceDetails,Place Image Url,Geo Coordinates ,ticket Pricing,Time Travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format "