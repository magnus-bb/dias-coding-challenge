# DIAS coding challenge

## Usage
### Prerequisites
To run this demo, you must have `docker` & `docker-compose` installed on your system

### Guide
Clone this repository anywhere on your computer. `cd` into the root of the project and run:

```bash
docker-compose up
```

This will build and run two docker containers, one with the Node.js API server, and one with a boilerplate MongoDB document database.

For simplicity, the API container mounts the API source code as a volume for development purposes, but the MongoDB container does not mount a volume for persisting the data, to not necessitate deleting the created demo-data after use.

## Changes to make
* Change logic to be a `Department` with `Doctors` and `Admissions` (patients) and use a relational db instead of copying data (could also use ID's instead)
  * The problem with the design given in the assignment (no two way relations) combined with a document DB is that when you want to assign a doctor to a patient, you will have to find an `Admission` with the given patient's `cpr` in their journal, and then check if the departments match
  * To check a doctor's access to a patient is also a bit cumbersome, since we need to find the admission with the patient's `cpr` in the journal, and then check whether the doctor's `id` is in the admission's `doctors` array
* Use TypeScript
  * E.g., for controlling inputs to `Admissions` when adding a doctor which should be of type `Doctor`
* Setup docker for something other than quick development
  * Mount mongo volume
  * Unmount API source-code volume
  * Use `PM2` for API
  * Not use `nodemon`
  * etc..
* Work on error handling
  * E.g., what if a doctor already exists on creation, what if the required args are not passed to constructors?
  * Returning err.message sometimes shows some backend logic, we probably want to define our own errors more carefully
  * Distinguish between error codes
    * Client errors should return 400, but it would be a good idea to also correctly send a 5xx if e.g., there was a problem connecting to DB