import express from "express";
const app = express()
const port = 3000

import cors from "cors";
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let data = [
  {
    id: 1,
    name: "Arsalan",
    Proffesion: "Full-Stack Web Developer"
  },
  {
    id: 2,
    name: "Arzen",
    Proffesion: "AI/ML Enthusiast"
  },
  {
    id: 3,
    name: "Adnan Sir",
    Proffesion: "Mentor / Full-Stack Developer"
  },
  {
    id: 4,
    name: "CodeWithHarry",
    Proffesion: "Full-Stack Web Developer & Educator"
  },
  {
    id: 5,
    name: "Apna College",
    Proffesion: "Web Development Educator"
  },
  {
    id: 6,
    name: "Chai aur Code",
    Proffesion: "Frontend Developer & Educator"
  },
  {
    id: 7,
    name: "Thapa Technical",
    Proffesion: "Full-Stack Web Developer & Educator"
  },
  {
    id: 8,
    name: "Neeraj Walia",
    Proffesion: "Web Development Educator"
  },
  {
    id: 9,
    name: "Learn with Sumit",
    Proffesion: "Web Development Educator"
  },
  {
    id: 10,
    name: "Yourself",
    Proffesion: "Future Millionare"
  }
];

app.post('/data', (req, res) => {
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
