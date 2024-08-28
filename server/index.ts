import express from "express";
import next from "next";
import { handleAspenAuth, fetchCourses, fetchCourseDetails } from "./aspen";
import { getAirtable, updateAirtableRecord } from "./airtable";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
// ASPEN ENDPOINTS
app.post('/api/aspen/auth', handleAspenAuth);
app.post('/api/aspen/courses', fetchCourses);
app.post('/api/aspen/courses/details', fetchCourseDetails);

// AIRTABLE ENDPOINTS
app.post('/api/airtable', getAirtable);
app.post('/api/airtable/update', updateAirtableRecord);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});