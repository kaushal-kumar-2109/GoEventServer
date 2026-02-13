const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const DB = require('./Database/connect');
const getRouter = require('./routers/getRouter');
const postRouter = require('./routers/pushRouter');
const otherRouter = require('./routers/other');

// ✅ Apply middlewares before routers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('private'));

// ✅ Then mount routers
app.use('/', getRouter);
app.use('/', postRouter);
app.use('/',otherRouter);

app.get('/',(req,res)=>{
  console.log('heelo');
    res.send("Hello You are online");
});

app.get('/goevent/upload/events',async (req,res)=>{
    const response = await eventsSchema.insertMany(Evetns);
    console.log(response);
    res.send("This is upload events response => ",response);
});

app.listen(port,() => {
    console.log(`Server is online at port : ${port}`);
});






const Evetns =[
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Bollywood Music Night",
    "EventDate":"12 October, 2025",
    "EventAmount": '499',
    "EventLocation": "Mumbai International Club",
    "EventTime": "7:30 PM",
    "EventAbout": "A night full of Bollywood hits with live bands and DJ.",
    "EventHighlight":"Live DJ,Dance Floor,Bollywood Hits",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Startup Networking Meetup",
    "EventDate": '12 October, 2025',
    "EventAmount": '0',
    "EventLocation": "Bangalore Tech Park",
    "EventTime": "5:00 PM",
    "EventAbout": "Meet entrepreneurs, investors, and developers to share ideas.",
    "EventHighlight": "Networking,Pitch Sessions,Free Entry",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Wedding Reception",
    "EventDate":"12 October, 2025",
    "EventAmount": '0',
    "EventLocation": "Delhi Grand Palace",
    "EventTime": "6:00 PM",
    "EventAbout": "A private family gathering to celebrate marriage.",
    "EventHighlight": "Family Gathering,Buffet Dinner,Live Music",
    "EventType": "Private"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Stand-Up Comedy Show",
    "EventDate": "12 October, 2025",
    "EventAmount": '299',
    "EventLocation": "Hyderabad Laugh Club",
    "EventTime": "8:00 PM",
    "EventAbout": "Enjoy an evening of laughter with top comedians.",
    "EventHighlight":"Comedy Acts,Audience Interaction",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Corporate Annual Party",
    "EventDate": "12 October, 2025",
    "EventAmount": '0',
    "EventLocation": "Chennai IT Hub Convention Center",
    "EventTime": "7:00 PM",
    "EventAbout": "Annual gathering of company employees with awards and entertainment.",
    "EventHighlight": "Awards,Dinner,Music",
    "EventType": "Private"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Food Festival 2025",
    "EventDate": "12 October, 2025",
    "EventAmount": '150',
    "EventLocation": "Kolkata City Grounds",
    "EventTime": "12:00 PM",
    "EventAbout": "A day-long food festival with cuisines from across India.",
    "EventHighlight": "Street Food,Cooking Contest,Live Music",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Yoga & Wellness Retreat",
    "EventDate": "12 October, 2025",
    "EventAmount": '799',
    "EventLocation": "Goa Beach Resort",
    "EventTime": "6:00 AM",
    "EventAbout": "Rejuvenate with yoga sessions, meditation, and spa.",
    "EventHighlight":"Yoga,Meditation,Detox Meals",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "New Year Celebration",
    "EventDate": "12 October, 2025",
    "EventAmount": '999',
    "EventLocation": "Jaipur Royal Palace",
    "EventTime": "9:00 PM",
    "EventAbout": "Ring in the New Year with fireworks, music, and dance.",
    "EventHighlight":"Fireworks,Live Band,DJ Party",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Book Reading Session",
    "EventDate": "12 October, 2025",
    "EventAmount": '50',
    "EventLocation": "Pune Literature Café",
    "EventTime": "4:00 PM",
    "EventAbout": "Join authors and readers for an evening of storytelling.",
    "EventHighlight": "Book Signing,Q&A Session",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Photography Workshop",
    "EventDate": "12 October, 2025",
    "EventAmount": '250',
    "EventLocation": "Ahmedabad Art Studio",
    "EventTime": "10:00 AM",
    "EventAbout": "Learn professional photography techniques.",
    "EventHighlight":"Hands-on Training,Certificate",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Charity Fundraiser",
    "EventDate":"12 October, 2025",
    "EventAmount": '0',
    "EventLocation": "Lucknow Community Hall",
    "EventTime": "5:00 PM",
    "EventAbout": "Support a noble cause through performances and auctions.",
    "EventHighlight":"Live Performances,Fundraising Auction",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "College Fest 2025",
    "EventDate": "12 October, 2025",
    "EventAmount": '100',
    "EventLocation": "Delhi University Campus",
    "EventTime": "2:00 PM",
    "EventAbout": "An annual cultural festival with music, dance, and drama.",
    "EventHighlight": "Dance Battle,Skit Performances,DJ Night",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Private Birthday Bash",
    "EventDate": "12 October, 2025",
    "EventAmount": '0',
    "EventLocation": "Bangalore Marriott Hotel",
    "EventTime": "7:00 PM",
    "EventAbout": "Exclusive birthday party with family and friends.",
    "EventHighlight": "Cake Cutting,Dance Floor",
    "EventType": "Private"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Film Screening Night",
    "EventDate":"12 October, 2025",
    "EventAmount": '200',
    "EventLocation": "Chennai Film Club",
    "EventTime": "6:00 PM",
    "EventAbout": "Watch critically acclaimed movies with fellow cinephiles.",
    "EventHighlight": "Director’s Talk,Discussion Panel",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Art Exhibition",
    "EventDate":"12 October, 2025",
    "EventAmount": '80',
    "EventLocation": "Mumbai Art Gallery",
    "EventTime": "3:00 PM",
    "EventAbout": "Display of modern art pieces from emerging artists.",
    "EventHighlight": "Painting Showcase,Sculpture Display",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Marathon 2025",
    "EventDate": "12 October, 2025",
    "EventAmount": "300",
    "EventLocation": "Hyderabad City Center",
    "EventTime": "6:00 AM",
    "EventAbout": "Run for health and charity in this city-wide marathon.",
    "EventHighlight": "10K Run,Half Marathon,Medals",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "Cooking Masterclass",
    "EventDate":"12 October, 2025",
    "EventAmount": "400",
    "EventLocation": "Surat Culinary School",
    "EventTime": "11:00 AM",
    "EventAbout": "Learn gourmet cooking from expert chefs.",
    "EventHighlight":"Recipe Book,Live Demo",
    "EventType": "Public"
  },
  {
    "UserId": "68d2ac5ee4208a063c7c3d59",
    "EventName": "DJ Night Party",
    "EventDate": "12 October, 2025",
    "EventAmount": "600",
    "EventLocation": "Goa Beach Club",
    "EventTime": "9:00 PM",
    "EventAbout": "Dance all night with top DJs and unlimited energy.",
    "EventHighlight": "Non-stop Music,Fire Show,Dance Floor",
    "EventType": "Public"
  }
]
