\# Testing Guide



\## Backend Tests



\### 1. Check Backend



Open:



http://127.0.0.1:8000



Expected result:



AI LMS Backend is running!



\### 2. Check API Documentation



Open:



http://127.0.0.1:8000/docs



Verify these endpoints:



\- GET `/`

\- POST `/upload-pdf`

\- POST `/generate-course`



\### 3. PDF Upload Test



Upload a valid PDF.



Expected:



\- PDF is accepted

\- Text is extracted

\- JSON response is returned



\### 4. Invalid File Test



Try uploading a non-PDF file.



Expected:



Only PDF files are allowed.



\## Frontend Tests



\### Course Generation



1\. Open the React application.

2\. Select a PDF.

3\. Click Generate Course.

4\. Verify course content appears.



\### Quiz



1\. Open Quiz.

2\. Select answers.

3\. Submit the quiz.

4\. Verify the score is displayed.

5\. Verify weak topics and recommendations appear.



\### Flashcards



Verify:



\- Card navigation

\- Show answer

\- Next/previous controls



\### Dashboard



Verify:



\- Progress

\- Score

\- Course completion state



\### Revision



Verify that weak-topic revision content is displayed.



\### Study Assistant



Ask a question related to a detected topic and verify that relevant document-based information is returned.



\## Final Verification



The application should work without exposing:



\- API keys

\- `.env`

\- Virtual environments

\- `node\_modules`

\- Build files

