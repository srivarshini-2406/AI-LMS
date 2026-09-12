\# Development Notes



\## Project Principles



\- Keep frontend and backend separated.

\- Keep backend responsibilities modular.

\- Avoid committing secrets.

\- Use clear Git commit messages.

\- Keep documentation updated when major features change.



\## File Responsibilities



\### backend/main.py



Defines the FastAPI application, CORS configuration and API endpoints.



\### backend/pdf\_processor.py



Responsible for extracting text from PDF files.



\### backend/ai\_engine.py



Responsible for transforming extracted learning material into structured course information.



\### frontend/src/App.jsx



Contains the main React learning interface and user interactions.



\### frontend/src/App.css



Contains application-specific styling.



\### frontend/src/index.css



Contains global styling.



\## Change Guidelines



When changing course-generation logic, update:



backend/ai\_engine.py



When changing API behavior, update:



backend/main.py



When changing PDF extraction, update:



backend/pdf\_processor.py



When changing the user interface, update:



frontend/src/App.jsx

frontend/src/App.css



\## Security



Never commit:



.env

API keys

credentials

venv/

node\_modules/

dist/



These are excluded using `.gitignore`.

