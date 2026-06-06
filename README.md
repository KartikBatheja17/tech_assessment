# Technical Assessment Submission

## Overview

This repository contains solutions for:

1. Employee Management API
2. Reversible Audit System

## Tech Stack

* Django
* Django REST Framework
* PostgreSQL
* React

## Project Structure

backend/
frontend/

## Questions Covered

### Question 1

Employee Management API

### Question 2

Reversible Audit System



## Question 1 – Requirement Analysis

While analyzing the requirements, I noticed a contradiction in the problem statement:

* Employee ID must be unique
* Multiple employees should be allowed to share the same Employee ID

These two requirements conflict with each other because a unique field cannot allow duplicate values at the same time.

To handle this, I treated Django’s default primary key `id` as the unique internal identifier for each employee record.

The `employee_code` field was treated as a business-level employee ID and was intentionally kept non-unique so that multiple employees can share the same code if required.

The API implementation was built according to this approach.
