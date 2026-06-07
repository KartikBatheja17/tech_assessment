# Technical Assessment Submission

## Overview

This repository contains solutions for both assessment questions:

1. Employee Management API
2. Reversible Audit System

The project was built using Django, Django REST Framework, PostgreSQL, and React.


# Tech Stack

## Backend

* Django
* Django REST Framework
* PostgreSQL

## Frontend

* React
* Axios

# Project Structure

backend/
frontend/
README.md
ARCHITECTURE_NOTES.md


# Question 1 – Employee Management API

For Question 1, I created a separate Employee Management API inside the backend project.

### Features

* Create employees
* Update employees
* Delete employees
* Employee validation handling

### Requirement Analysis

While analyzing the requirements, I noticed a contradiction:

* Employee ID must be unique
* Multiple employees should be allowed to share the same Employee ID

These two requirements conflict with each other.

To handle this:

* Django’s default primary key `id` was treated as the unique internal identifier
* `employee_code` was treated as a business-level employee ID and was intentionally kept non-unique

The API was implemented according to this approach.

### Question 1 API Endpoint

/api/employees/

### Running Question 1

Start the Django backend server:

cd backend
python manage.py runserver

Then open:

http://127.0.0.1:8000/api/employees/

Question 1 can be tested independently using Django REST Framework’s browser API or Postman.

# Question 2 – Reversible Audit System

This system tracks every change made to leads and allows restoring previous versions.

### Features Implemented

#### Lead Management

* Create leads
* View leads
* Update leads
* Delete leads

#### Audit System

* Automatic audit logging
* Stores old and new data snapshots
* Tracks CREATE, UPDATE, DELETE, and RESTORE actions
* Timestamp tracking

#### Restore System

* Restore previous versions of leads

#### Frontend Features

* View all leads
* View audit history
* Compare old/new versions
* Restore previous versions

# Database Models

## Lead

Stores:

* Name
* Email
* Company
* Status
* Notes

## AuditLog

Stores:

* Action type
* Old data
* New data
* Timestamp
* Related lead


# Important API Endpoints

## Leads

/api/leads/

## Audit Logs

/api/audit-logs/

## Restore Version

/api/leads/{lead_id}/restore/{audit_id}/

# Backend Setup

Move to backend folder:

cd backend


Create virtual environment:

python -m venv venv


Activate virtual environment:

### Windows

venv\Scripts\activate

source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Run migrations:

python manage.py migrate


Start backend server:

python manage.py runserver

Backend runs on:

http://127.0.0.1:8000/

# Frontend Setup

Move to frontend folder:

cd frontend

Install dependencies:

npm install

Start frontend:

npm start

Frontend runs on:
http://localhost:3000/

# Architecture Notes

Architecture discussion is included in:

Architecture_Notes.md
# Notes

* PostgreSQL was used as the database
* No third-party audit/versioning packages were used
* Audit logs are automatically created whenever changes are made
* Restore functionality works using stored audit snapshots
